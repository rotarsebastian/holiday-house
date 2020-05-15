// ====================== IMPORTS ======================
const router = require('express').Router();
const { isAuthenticated } = require(__dirname + '/../../helpers/auth');
const { handleInitialFormCheck } = require(__dirname + '/../../helpers/requestCheck');
const User = require(__dirname + '/../../models/User');
const Property = require(__dirname + '/../../models/Property');
const PropertyFacilities = require(__dirname + '/../../models/PropertyFacilities');
const { editProperty } = require(__dirname + '/../../helpers/dbqueries');
const { raw } = require('objection');
const { fn } = require('objection');
const upload = require(__dirname + '/../../helpers/imageUpload');

const multipleUpload = upload.array('image', 10);

// ====================== GET PROPERTIES ======================
router.get('/', isAuthenticated, async(req, res) => {
    try {
        // ====================== GET USER PROPERTIES ======================
        const user = User.query().where({ id: req.session.user.id });
        const properties = await User.relatedQuery('properties')
            .for(user)
            .select('*')
            // .select('title', 'description', 'address')
            .where('available_start', '<' , fn.now())
            .where('available_end', '>' , fn.now())
            // .where(raw(`date_part('year', "createDate") = date_part('year', ?)`, new Date))
            .orderBy('price');

        if(!properties) res.json({ status: 0, message: 'Error getting properties from the db!'});
        return res.json(properties);
    } catch(e) {
        return res.json({ status: 0, message: 'Error returning properties!'});
    }
});

// ====================== DELETE A PROPERTY ======================
router.delete('/:id', isAuthenticated, async(req, res) => {
    
    try {
        // ====================== GET THE PROPERTY ID ======================
        const { id } = req.params;
        if(!id) return res.json({ status: 0, message: 'Missing id!', code: 404 });

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
            if(err) return res.status(422).send({ errors: [{ title: 'Image Upload Error', detail: err.message }]});

            //  ====================== HANDLE INITIAL CHECK FOR STRING DATA ======================
            const initialCheckRes = handleInitialFormCheck(JSON.parse(req.body.data), 'addProperty', 12);
            if(initialCheckRes.status !== 1) return res.json(initialCheckRes);

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
                if(e.type !== 'facilities') newProperty[e.type] = e.val; // REGULAR COLUMN

                // ADD TO THE FACILITIES ARRAY (THIS IS ONLY FOR MAKING THE RIGHT FORMAT REQUEST)
                else newProperty.facilities.push({ facilities_list: e.val }); 
            });
            
            // ====================== CREATE A NEW ARRAY FOR IMAGES PATHS ======================
            if(req.files.length < 1) return res.json({ status: 0, message: 'Missing images!', code: 404 });
            const photos = [];
            req.files.map(img => photos.push(img.location));
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
router.patch('/:id/', isAuthenticated, async(req, res) => {
    
    try {
        // ====================== GET THE PROPERTY ID ======================
        multipleUpload(req, res, async(err) => {
            // // ====================== HANDLE INITIAL CHECK FOR STRING DATA ======================
            const initialCheckRes = handleInitialFormCheck(JSON.parse(req.body.data), 'edit', 1);
            if(initialCheckRes.status !== 1) return res.json(initialCheckRes);

            // ====================== GET PROPERTY ID ======================
            const { id } = req.params;
            if(!id) return res.json({ status: 0, message: 'Missing id!', code: 404 });

            // ====================== PROPERTY DOES NOT EXIST ======================
            const property = await Property.query().select('id').findById(id);
            if(!property) return res.json({ status: 0, message: 'Property does not exists!', code: 404 });

            // ====================== GET EDITED DATA ======================
            const editData = JSON.parse(req.body.data);

            // ====================== CHECK IF FACILITIES WERE UPDATED ======================
            let updateResult;
            const withFacilities = editData.findIndex(e => e.type === 'facilities');
            if(withFacilities !== -1) {
                const [ { id: facilitiesID } ] = await PropertyFacilities.query().select('id').where({ property_id: property.id }).limit(1);
                updateResult = await editProperty(editData, id, req.files, facilitiesID);
            } else updateResult = await editProperty(editData, id, req.files);

            return res.json(updateResult);
        })

    } catch (err) {
        return res.json({ status: 0, message: 'Error editing property!'});
    }

});

module.exports = router;
