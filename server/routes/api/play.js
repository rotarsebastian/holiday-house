const router = require('express').Router();

router.use('/first', (req, res, next) => {
    console.log('First route!');
    next();
    // res.redirect('/playground/second');
    // return res.send({response: 'first'});
})

router.get('/second', (req, res, next) => {
    console.log('Second route 11111!');
    next();
})

router.get('/second', (req, res) => {
    console.log('Second route!');
    return res.send({response: 'second'});
})

router.get('/setsession', (req, res) => {
    req.session.session = req.query.session
    return res.send({response: 'Set Ok'});
})

router.get('/getsession', (req, res) => {
    // console.log('Get Ok');
    return res.send({response: 'Get Ok'});
})

module.exports = router;
