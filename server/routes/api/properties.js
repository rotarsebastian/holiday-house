// ====================== IMPORTS ======================
const router = require('express').Router();
const { isAuthenticated } = require(__dirname + '/../../helpers/auth');
const { handleInitialFormCheck } = require(__dirname + '/../../helpers/requestCheck');
const User = require(__dirname + '/../../models/User');
const Property = require(__dirname + '/../../models/Property');
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

        if(!properties) res.json({ status: 0, msg: 'Error getting properties from the db!'});
        return res.json(properties);
    } catch(e) {
        return res.json({ status: 0, msg: 'Error returning properties!'});
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
        return res.json({ status: 0, msg: 'Error creating new property!'});
    }
});

module.exports = router;
