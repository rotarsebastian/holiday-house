// ====================== IMPORTS ======================
const router = require('express').Router();
const { isAuthenticated } = require(__dirname + '/../../helpers/auth');
const { handleInitialFormCheck } = require(__dirname + '/../../helpers/requestCheck');
const { isJSON } = require(__dirname + '/../../helpers/validation');
const User = require(__dirname + '/../../models/User');
const Property = require(__dirname + '/../../models/Property');
const PropertyFacilities = require(__dirname + '/../../models/PropertyFacilities');
const { editProperty, getPropertiesWithFilters } = require(__dirname + '/../../helpers/dbqueries');
const { fn } = require('objection');
const { upload, removeImages } = require(__dirname + '/../../helpers/handleImages');
const moment = require('moment');

const multipleUpload = upload.array('image', 10); // MAXIMUM 10 IMAGES AT ONCE

// ====================== GET A SPECIFIC PROPERTY ======================
router.get('/:id', async(req, res) => {
    try {
        // ====================== GET THE PROPERTY ID ======================
        const { id } = req.params;
        if(!id) return res.json({ status: 0, message: 'Missing id!', code: 404 });

        // ====================== GET THE PROPERTY ======================
        const property = await Property.query().select().where({ id }).withGraphFetched('facilities');
        if(property.length === 0) return res.json({ status: 0, message: 'Property does not exists!', code: 404 });

        // ====================== GET USER ======================
        const user = await User.query().select('first_name', 'last_name').where({ id: property[0].user_id });

        const responseObj = { ...property[0], ...user[0] };
        
        // ====================== EVERYTHING OK ======================s
        return res.json({ status: 1, message: 'Property retrieved successfully!', data: responseObj });

    } catch (err) {
        return res.json({ status: 0, message: 'Error getting property!'});
    }
});

// ====================== GET USER PROPERTIES ======================
router.get('/user/:id', isAuthenticated, async(req, res) => {
    try {
        // ====================== GET THE PROPERTY ID ======================
        const { id } = req.params;
        if(!id) return res.json({ status: 0, message: 'Missing id!', code: 404 });

        // ====================== GET THE OFFSET ======================
        const { offset } = req.query;
        if(!offset) return res.json({ status: 0, message: 'Invalid request'});

        if(!Number.isInteger(Number(offset))) return res.json({ status: 0, message: 'Offset should be a number', code: 404 });

        // ====================== CHECK FOR FILTERS ======================
        const { active } = req.query;

        // ====================== GET PROPERTIES ======================
        const user = User.query().where({ id });
        const properties = active && Number(active) === 1 ? await User.relatedQuery('properties').for(user).select()
            .where('available_start', '<' , fn.now())
            .andWhere('available_end', '>' , fn.now())
            .limit(10)
            .offset(offset)
            :
            await User.relatedQuery('properties').for(user).select().limit(10).offset(offset)

        // ====================== EVERYTHING OK ======================s
        return res.json({ status: 1, message: 'Properties retrieved successfully!', data: properties });

    } catch (err) {
        return res.json({ status: 0, message: 'Error getting properties!'});
    }
});

// ====================== GET PROPERTIES ======================
router.get('/', async(req, res) => {
    try {
        const { offset, city, from, to, guests, type, minprice, maxprice } = req.query;
        if(!offset || !city || !from || !to || !guests) return res.json({ status: 0, message: 'Invalid request'});

        if(!Number.isInteger(Number(guests))) return res.json({ status: 0, message: 'Guests should be a number', code: 404 });
        if(!Number.isInteger(Number(offset))) return res.json({ status: 0, message: 'Offset should be a number', code: 404 });

        if(minprice && !maxprice) return res.json({ status: 0, message: 'Max price missing!'});
        if(!minprice && maxprice) return res.json({ status: 0, message: 'Min price missing!'});

        if(city.length > 85 || !/^[\p{L} .'-]+$/u.test(city)) return res.json({ status: 0, message: 'City name invalid'});
        if(type && (type.length > 60 || !/^[\p{L} .'-]+$/u.test(type))) return res.json({ status: 0, message: 'House type is invalid'});

        // ====================== CHECK IF IS DATES ARE VALID ======================
        const today_date = moment().format('YYYY-MM-DD');
        const tomorrow_date = moment().add(1, 'days').format('YYYY-MM-DD');
        const isFromDateValid = moment(from).isSameOrAfter(today_date, 'day'); // CAN START MINIMUM TODAY
        const isToDateValid = moment(to).isAfter(today_date, 'day'); // CAN END MINIMUM TOMORROW
        const isSameDate = moment(to).isSame(from, 'day'); // CANNOT BE SAME DATE - 1 NIGHT MINIMUM

        if(!isFromDateValid || !isToDateValid) return res.json({ status: 0, message: `Your start date should be at least from ${today_date} and your end date should be at least until ${tomorrow_date}!`, code: 404 });
        if(isSameDate) return res.json({ status: 0, message: 'Your start date cannot be the same with your end date!', code: 404 });

        if(minprice && (!Number.isInteger(Number(minprice)) || Number(minprice) < 0)) return res.json({ status: 0, message: 'Min price should be a number', code: 404 });
        if(maxprice && (!Number.isInteger(Number(maxprice)) || Number(maxprice) > 999999)) return res.json({ status: 0, message: 'Max price should be a number', code: 404 });

        const properties = await getPropertiesWithFilters(offset, city, from, to, guests, type, minprice, maxprice);

        if(!properties) res.json({ status: 0, message: 'Error getting properties from the db!'});
        return res.json({properties});
    } catch(e) {
        console.log(e);
        return res.json({ status: 0, message: 'Error returning properties!'});
    }
});

// ====================== DELETE A PROPERTY ======================
router.delete('/:id', isAuthenticated, async(req, res) => {
    
    try {
        // ====================== GET THE PROPERTY ID ======================
        const { id } = req.params;
        if(!id) return res.json({ status: 0, message: 'Missing id!', code: 404 });

        // ====================== GET THE PROPERTY PHOTOS ======================
        const property = await Property.query().select('photos', 'user_id').findById(id);
        if(!property) return res.json({ status: 0, message: 'Property does not exists!', code: 404 });

        // ====================== CHECK IF IT IS THE RIGHT USER ======================
        if(property.user_id !== req.session.user.id) return res.json({ status: 0, message: 'Unauthorized!', code: 404 });

        // ====================== DELETE IMAGES FROM AWS ======================
        const awsRes = await removeImages(property.photos);
        if(awsRes.status === 0) return awsRes;

        // ====================== DELETE PROPERTY ======================
        const dbRes = await Property.query().deleteById(id);

        // ====================== RETURN PROPERTY DOES NOT EXIST ======================
        if(!dbRes) return res.json({ status: 0, message: 'Property does not exist!'});

        // ====================== RETURN PROPERTY DOES NOT EXIST ======================
        return res.json({ status: 1, message: 'Property deleted successfully!'});

    } catch (err) {
        return res.json({ status: 0, message: 'Error deleting property!'});
    }

});

// ====================== CREATE A PROPERTY ======================
router.post('/', isAuthenticated, (req, res) => {
    try {
        // ====================== UPLOAD IMGS TO S3 ======================
        multipleUpload(req, res, async(err) => {
            if(err) return res.status(422).json({ errors: [{ title: 'Image Upload Error', detail: err.message }]});

            // ====================== IMAGES REMOVE IN CASE OF ERROR ======================
            const errorRemoveImgs = [];
            if(req.files.length > 0) req.files.forEach(img => errorRemoveImgs.push(img.location.slice(-41)));

            if(typeof req.body.data !== 'string' || !isJSON(req.body.data)) {
                if(errorRemoveImgs.length > 0) removeImages(errorRemoveImgs);
                return res.json({ status: 0, message: 'Invalid request!', code: 404 });
            }

            //  ====================== HANDLE INITIAL CHECK FOR STRING DATA ======================
            const initialCheckRes = handleInitialFormCheck(JSON.parse(req.body.data), 'addProperty', 12);
            if(initialCheckRes.status !== 1) {
                if(errorRemoveImgs.length > 0) removeImages(errorRemoveImgs);
                return res.json(initialCheckRes);
            }

            // ====================== CREATE NEW PROPERTY ======================
            let newProperty = {};
            const data = JSON.parse(req.body.data);

            // ====================== ADD PROPERTY DETAILS AND CHECK IF IT HAS FACILITIES ======================
            // THE REASON WHY WE CREATE AN ARRAY AND THEN AN OBJECT IS BECAUSE THIS IS HOW INSERTGRAPH WORKS
            // WE ARE INSERTING INTO 2 DIFFERENT TABLES (PROPERTY, FACILITIES) 
            // PROPERTY HAS A 'HasOneRelation' FOR FACILITIES TABLE
            // FACILITIES HAS ONLY ONE COLUMN CALLED 'facilities_list' IN WHICH WE STORE ALL THE FACILITIES FOR ONE PROPERY AS JSON
            if(data.findIndex(e => e.type === 'facilities') > -1) newProperty.facilities = [];

            data.map(e => {
                if(e.type !== 'facilities' && e.type !== 'address') newProperty[e.type] = e.val; // REGULAR COLUMN
                else if (e.type === 'address') newProperty[e.type] = e.val.toLowerCase();
                // ADD TO THE FACILITIES ARRAY (THIS IS ONLY FOR MAKING THE RIGHT FORMAT REQUEST)
                else if (e.type === 'facilities') newProperty.facilities.push({ facilities_list: e.val }); 
            });
            
            // ====================== CREATE A NEW ARRAY FOR IMAGES PATHS ======================
            if(req.files.length < 1) return res.json({ status: 0, message: 'Missing images!', code: 404 });
            const photos = [];
            req.files.map(img => photos.push(img.location.slice(-41)));
            newProperty.photos = JSON.stringify(photos); // ADD IT AS JSON INSIDE THE DB

            // ====================== ADD THE USER WHICH CREATED THE PROPERTY ======================
            newProperty.user_id = req.session.user.id;

            // ====================== INSERT THE NEW PROPERTY TO THE DB ======================
            const createdProperty = await Property.query().insertGraph(newProperty);
            if(!createdProperty) return res.json({ status: 0, message: 'Error while inserting user!', code: 404 });
            
            return res.json({ status: 1, property: newProperty });
        });
    } catch(e) {
        return res.json({ status: 0, message: 'Error creating new property!'});
    }
});

// ====================== EDIT A PROPERTY ======================
router.patch('/:id', isAuthenticated, async(req, res) => {
    try {
        multipleUpload(req, res, async(err) => {
            if(err) return res.status(422).json({ errors: [{ title: 'Image Upload Error', detail: err.message }]});

            // ====================== IMAGES REMOVE IN CASE OF ERROR ======================
            const errorRemoveImgs = [];
            if(req.files.length > 0) req.files.forEach(img => errorRemoveImgs.push(img.location.slice(-41)));
            
            // ====================== GET PROPERTY ID ======================
            const { id } = req.params;
            if(!id) {
                if(errorRemoveImgs.length > 0) removeImages(errorRemoveImgs);
                return res.json({ status: 0, message: 'Missing id!', code: 404 });
            }

            if(typeof req.body.data !== 'string' || !isJSON(req.body.data)) {
                if(errorRemoveImgs.length > 0) removeImages(errorRemoveImgs);
                return res.json({ status: 0, message: 'Invalid request!', code: 404 });
            }
            
            // ====================== HANDLE INITIAL CHECK FOR STRING DATA ======================
            const initialCheckRes = handleInitialFormCheck(JSON.parse(req.body.data), 'edit', 1);
            if(initialCheckRes.status !== 1) {
                if(errorRemoveImgs.length > 0) removeImages(errorRemoveImgs);
                return res.json(initialCheckRes);
            }
            
            // ====================== PROPERTY DOES NOT EXIST ======================
            const property = await Property.query().select('id', 'photos', 'user_id').findById(id);
            if(!property) {
                if(errorRemoveImgs.length > 0) removeImages(errorRemoveImgs);
                return res.json({ status: 0, message: 'Property does not exists!', code: 404 });
            }

            // ====================== CHECK IF IT IS THE RIGHT USER ======================
            if(property.user_id !== req.session.user.id) {
                if(errorRemoveImgs.length > 0) removeImages(errorRemoveImgs);
                return res.json({ status: 0, message: 'Unauthorized!', code: 404 });
            }

            // ====================== GET EDITED DATA ======================
            const editData = JSON.parse(req.body.data);

            // ====================== CHECK IF FACILITIES WERE UPDATED ======================
            let updateResult;
            const withFacilities = editData.findIndex(e => e.type === 'facilities');
            if(withFacilities !== -1) {
                const facility = await PropertyFacilities.query().select('id').where({ property_id: id }).limit(1);
                if(facility && facility.length > 0) {
                    const [ { id: facilitiesID } ] = facility;
                    updateResult = await editProperty(editData, id, property.photos, req.files, facilitiesID);
                } else updateResult = await editProperty(editData, id, property.photos, req.files);
            } else updateResult = await editProperty(editData, id, property.photos, req.files);

            return res.json(updateResult);
        })
    } catch (err) {
        return res.json({ status: 0, message: 'Error editing property!'});
    }

});

module.exports = router;
