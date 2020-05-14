// ====================== IMPORTS ======================
const router = require('express').Router();
const { isAuthenticated } = require(__dirname + '/../../helpers/auth');
const { handleInitialFormCheck } = require(__dirname + '/../../helpers/requestCheck');
const User = require(__dirname + '/../../models/User');
const Property = require(__dirname + '/../../models/Property');
const { raw } = require('objection');
const { fn } = require('objection');

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
        // ====================== HANNDLE INITIAL CHECK ======================
        const initialCheckRes = handleInitialFormCheck(req.body, 'addProperty', 12);
        if(initialCheckRes.status !== 1) return res.json(initialCheckRes);

        // ====================== EXTRACT FORM ELEMENTS ======================
        const [ 
            { val: title }, { val: description }, { val: available_start }, { val: available_end }, 
            { val: price }, { val: capacity }, { val: type }, { val: rooms }, { val: beds },
            { val: bathrooms }, { val: address }, { val: photos }     
        ] = [ ...req.body ];

        res.json({msg: 'ok'});
        
    } catch(e) {
        return res.json({ status: 0, msg: 'Error creating new property!'});
    }
});

module.exports = router;
