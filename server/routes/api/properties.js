// ====================== IMPORTS ======================
const router = require('express').Router();
const { isAuthenticated, handleInitialFormCheck } = require(__dirname + '/../../helpers/auth');
const User = require(__dirname + '/../../models/User');
const Property = require(__dirname + '/../../models/Property');

// ====================== GET USER PROPERTIES ======================
router.get('/', isAuthenticated, async(req, res) => {

    try {
        // const data = 
        // await User.query().select('first_name').where({ id: req.session.user.id }).withGraphFetched('properties');
        // await Property.query().where({ id: 1 }).withGraphFetched('facilities');

        // ====================== GET USER PROPERTIES CUSTOMIZES ======================
        const user = User.query().where({ id: req.session.user.id });
        const properties = await User.relatedQuery('properties')
        .for(user)
        .select('*')
        // .where('rooms', '3')
        .orderBy('price');

        if(!properties) res.json({ status: 0, msg: 'Error getting user properties from the db!'});
        return res.json(properties);
    } catch(e) {
        return res.json({ status: 0, msg: 'Error returning user properties!'});
    }

});


module.exports = router;
