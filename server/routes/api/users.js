// ====================== IMPORTS ======================
const router = require('express').Router();
const User = require(__dirname + '/../../models/User');
const { isAuthenticated } = require(__dirname + '/../../helpers/auth');
const { handleInitialFormCheck } = require(__dirname + '/../../helpers/requestCheck');
const { constructActivationEmail, constructForgotCredentialsEmail } = require(__dirname + '/../../helpers/mails');
const { editUser } = require(__dirname + '/../../helpers/dbqueries');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { uuid, isUuid } = require('uuidv4');
const nodemailer = require('nodemailer');
const moment = require('moment');
const xoauth2 = require('xoauth2');
const emailExistence = require('email-existence');
const { gmail } = require(__dirname + '/../../config/gmailConfig');
const { clientEndpoint } = require(__dirname + '/../../config/otherConfigs');

// ====================== SETUP MAILER ======================
const transportObject = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        type: 'OAuth2',
        user: process.env.MAIL_SENDER || gmail.senderEmail,
        clientId: process.env.MAIL_CLIENT || gmail.client_id,
        clientSecret: process.env.MAIL_SECRET || gmail.client_secret,
        refreshToken: process.env.MAIL_REFRESH || gmail.refresh_token,
    }
}
let transporter = nodemailer.createTransport(transportObject);

// ====================== GET A SPECIFIC USER ======================
router.get('/user/:id', isAuthenticated, async(req, res) => {
    try {
        // ====================== GET THE USER ID ======================
        const { id } = req.params;
        if(!id) return res.json({ status: 0, message: 'Missing id!', code: 404 });

        // ====================== GET THE USER ======================
        const user = await User.query().select('first_name', 'last_name').where({ id });
        if(user.length === 0) return res.json({ status: 0, message: 'User does not exists!', code: 404 });
        
        // ====================== EVERYTHING OK ======================s
        return res.json({ status: 1, message: 'User retrieved successfully!', data: user[0] });

    } catch (err) {
        return res.json({ status: 0, message: 'Error getting user!'});
    }
});

// ====================== DELETE A USER ======================
router.delete('/', isAuthenticated, async(req, res) => {
    try {
        const user = await User.query().deleteById(req.session.user.id);
        if (!user) return res.json({ status: 0, message: 'Error deleting the user!'});

        req.session.destroy(err => {
            if(err) return res.json({ status: 0, message: 'Error while trying to logout user!', code: 404 });
    
            // ====================== CLEAR USER COOKIE ======================
            res.clearCookie('user_sid');
    
            // ====================== EVERYTHING OK ======================
            return res.json({ status: 1, message: 'User deleted successfully!'});
        });

    } catch (err) {
        return res.json({ status: 0, message: 'Error deleting the user!'});
    }
});

// ====================== EDIT USER PROFILE ======================
router.patch('/', isAuthenticated, async(req, res) => {
    try {
        // ====================== HANDLE INITIAL CHECK ======================
        const initialCheckRes = handleInitialFormCheck(req.body, 'edit', 3);
        if(initialCheckRes.status !== 1) return res.json(initialCheckRes);

        // ====================== MAKE REQUEST TO EDIT USER PROFILE ======================
        const updateResult = await editUser([ ...req.body ], req.session.user.id);
        res.json(updateResult);
    } catch(err) {
        return res.json({ status: 0, msg: 'Error updating user profile!'});
    }
});

// ====================== LOGOUT ======================
router.post('/logout', isAuthenticated, (req,res) => {

    // ====================== DESTROY THE USER SESSION ======================
    req.session.destroy(err => {
        if(err) return res.json({ status: 0, message: 'Error while trying to logout user!', code: 404 });

        // ====================== CLEAR USER COOKIE ======================
        res.clearCookie('user_sid');

        // ====================== SEND RESPONSE TO CLIENT ======================
        res.status(200).json({ status: 1, msg: 'User is logged out!'});
    });
});

// ====================== CHECK IF USER HAS A SESSION ======================
router.get('/checkauth', isAuthenticated, async(req, res) => {
    try {
        // ====================== FIND LOGGED USER ======================
        const loggedUser = await User.query().select('id', 'email', 'first_name', 'last_name', 'birthdate', 'created_at').findById(req.session.user.id);
        if(!loggedUser) return res.json({ status: 0, msg: 'User not authorized!'});

        // ====================== SEND BACK LOGGED USER ======================
        return res.status(200).json({ status: 1, msg: 'User authorized!', user: loggedUser });
    
    // ====================== HANDLE ERROR ======================
    } catch(err) {
        return res.json({ status: 0, msg: 'User not authorized!'});
    }
});

// ====================== RESET USER PASSWORD ======================
router.post('/resetpass', async(req, res) => {

    // ====================== HANDLE INITIAL CHECK ======================
    const initialCheckRes = handleInitialFormCheck(req.body, 'resetpass', 3, 'resetpass');
    if(initialCheckRes.status !== 1) return res.json(initialCheckRes);

    // ====================== EXTRACT FORM ELEMENTS ======================
    const [ { val: password }, { val: repeatPassword }, { key: oldKey } ] = [ ...req.body ];

    // ====================== CHECK IF KEY IS THE RIGHT FORMAT ======================
    if(!isUuid(oldKey)) return res.json({ status: 0, message: 'Your key is expired!', code: 155 });

    // ====================== CHECK IF PASSWORDS MATCH ======================
    if(password !== repeatPassword) return res.json({ status: 0, message: 'Passwords do not match!', code: 10 });
    
    // ====================== CHECK IF USER EXISTS ======================
    const [ foundUser ] = await User.query().where({ activate_or_reset_pass_key: oldKey }).limit(1);
    if(!foundUser) return res.json({ status: 0, message: 'Your link has expired!', code: 155 });
    if(foundUser.reset_pass_time === null) return res.json({ status: 0, message: 'Your link has expired!', code: 155 });

    // ====================== CHECK IF THE KEY IS STILL VALID ======================
    const timeNow = moment().unix(); // NOW
    const userLimitTime = moment(foundUser.reset_pass_time).unix(); // USER TIME TO EXPIRE
    const difference = Number(userLimitTime) - Number(timeNow); // DIFFERENCE FROM NOW TO USER TIME

    // ====================== IF DIFFERENCE IS NOT POSITIVE - TIME HAS EXPIRED ======================
    if(difference <= 0 ) return res.json({ status: 0, message: 'Your link has expired!', code: 155 });

    // ====================== ENCRYPT THE NEW PASSWORD ======================
    bcrypt.hash(password, saltRounds, async(err, hashedPassword) => {
        if(err) return res.json({ status: 0, message: 'Error while trying to encrypt user password!', code: 404 });
        try {
            // ====================== UPDATE USER PASSWORD IN THE DB ======================
            const dbResponse = await User.query().findById(foundUser.id).patch({ password: hashedPassword, activate_or_reset_pass_key: uuid(), reset_pass_time: null });
            if(dbResponse !== undefined) return res.status(200).json({ status: 1, message: 'Your password has been changed successfully!', code: 200 });
                else return res.json({ status: 0, message: 'Error while trying to update user password!', code: 404 });

        // ====================== HANDLE ERROR ======================
        } catch(err) {
            return res.json({ status: 0, message: 'Error while trying to update user password!', code: 404 });
        }
    });
});

// ====================== RECOVER CREDENTIALS OR RESEND ACTIVATION EMAIL ======================
router.post('/recover', async(req, res) => {

    // ====================== HANDLE INITIAL CHECK ======================
    const initialCheckRes = handleInitialFormCheck(req.body, 'recover', 1);
    if(initialCheckRes.status !== 1) return res.json(initialCheckRes);

    // ====================== EXTRACT EMAIL ======================
    const [ { val: email } ] = [ ...req.body ];
    
    try {
        // ====================== CHECK IF USER EXISTS ======================
        const [ user ] = await User.query().where({ email }).limit(1);
        if(!user) return res.json({ status: 0, message: 'Incorrect email!', code: 15 });

        // ====================== RESEND CONFIRMATION EMAIL ======================
        if(user.verified === 0) {
            const activateEmail = constructActivationEmail({ ...user });
            transporter.sendMail(activateEmail, err => {
                if(err) return res.json({ status: 0, message: 'Error while trying to send email!', code: 404 });
                    else return res.status(200).json({ status: 1, message: 'Reactivation email was sent successfully!', user: user.email, code: 200 });
            });
        }

        // ====================== SEND CHANGE PASSWORD EMAIL ======================
        else { 
            // ====================== CREATE A NEW KEY TO RESET THE PASSWORD ======================
            const activate_or_reset_pass_key = uuid(); 
            const reset_pass_time = moment().add(1, 'hours').format('YYYY-MM-DD HH:mm:ss'); // GIVE IT 1 HOUR VALIDITY

            // ====================== PUT THE NEW KEY INTO THE DB ======================
            const profileUpdated = await User.query().findById(user.id).patch({ activate_or_reset_pass_key, reset_pass_time });
            if(profileUpdated !== 1) return res.json({ status: 0, message: 'Error updating profile!', code: 404 });

            // ====================== SEND THE RESET PASSWORD EMAIL ======================
            const resetPassEmail = constructForgotCredentialsEmail({ ...user }, activate_or_reset_pass_key);
            transporter.sendMail(resetPassEmail, err => {
                if(err) return res.json({ status: 0, message: 'Error while trying to send email!', code: 404 });
                    else return res.status(200).json({ status: 1, message: 'An email to reset your password was sent to you!', code: 200 });    
            });
        }
    // ====================== HANDLE ERROR ======================
    } catch (err) {
        return res.json({ status: 0, message: 'Error while trying to recover user!', code: 404 });
    }
});

// ====================== CHECK IF RESET PASSWORD LINK IT IS NOT EXPIRED ======================
router.get('/reset', async(req, res) => {

    // ====================== GET THE KEY FROM THE QUERY STRING AND CHECK IT ======================
    const { key } = req.query;
    if(!key) return res.redirect(`${clientEndpoint}?expired=true`);
    if(!isUuid(key)) return res.redirect(`${clientEndpoint}?expired=true`);

    // ====================== FIND THE USER WITH THE SAME KEY ======================
    const [ foundUser ] = await User.query().where({ activate_or_reset_pass_key: key }).limit(1);
    if(!foundUser) return res.redirect(`${clientEndpoint}?expired=true`);
    if(foundUser.reset_pass_time === null) return res.redirect(`${clientEndpoint}?expired=true`);

    // ====================== CHECK IF THE KEY IS STILL VALID ======================
    const timeNow = moment().unix(); // NOW
    const userLimitTime = moment(foundUser.reset_pass_time).unix(); // USER TIME TO EXPIRE
    const difference = Number(userLimitTime) - Number(timeNow); // DIFFERENCE FROM NOW TO USER TIME

    // ====================== IF DIFFERENCE IS NOT POSITIVE - TIME HAS EXPIRED ======================
    if(difference <= 0 ) return res.redirect(`${clientEndpoint}?expired=true`);

    // ====================== DIFFERENCE IS POSITIVE - REDIRECT USER TO CHANGE PASSWORD ======================
    else return res.redirect(`${clientEndpoint}?key=${key}`);
});

// ====================== ACTIVATE ACCOUNT ======================
router.get('/activate', async(req, res) => {

    // ====================== GET THE KEY FROM THE QUERY STRING AND CHECK IT ======================
    const { key } = req.query;
    console.log(key)
    if(!key) return res.redirect(`${clientEndpoint}?expired=true`);
    if(!isUuid(key)) return res.redirect(`${clientEndpoint}?expired=true`);

    try {
        // ====================== FIND THE USER WITH THE SAME KEY ======================
        const [ user ] = await User.query().where({ activate_or_reset_pass_key: key }).limit(1);
        if(!user) return res.redirect(`${clientEndpoint}?expired=true`); // WRONG KEY OR ALREADY ACTIVATED

        // ====================== CHECK IF USER ALREADY ACTIVATED HIS ACCOUNT ======================
        if(user.verified === 1) return res.redirect(`${clientEndpoint}?expired=true`); // ALREADY ACTIVATED

        // ====================== USER IS CORRECT - RESET KEY AND CHANGE IT TO VERIFIED ======================
        const activatedAccount = await User.query().findById(user.id).patch({ activate_or_reset_pass_key: uuid(), verified: 1 });
        if(activatedAccount !== undefined) return res.redirect(`${clientEndpoint}?activated=${key}`);
            else return res.redirect(`${clientEndpoint}?expired=true`);

    } catch (err) {
        return res.redirect(`${clientEndpoint}?expired=true`);
    }
});

// ====================== LOGIN USER ======================
router.post('/login', async(req, res) => {

    // ====================== HANDLE INITIAL CHECK ======================
    const initialCheckRes = handleInitialFormCheck(req.body, 'login', 2);
    if(initialCheckRes.status !== 1) return res.json(initialCheckRes);

    // ====================== EXTRACT FORM ELEMENTS ======================
    const [ { val: email }, { val: password } ] = [ ...req.body ];
    
    try {
        // ====================== CHECK IF USER EXISTS ======================
        const [ user ] = await User.query().where({ email }).limit(1);
        if(!user) return res.json({ status: 0, message: 'Incorrent email!', code: 15 });
        if(user.verified === 0) return res.json({ status: 0, message: 'Please activate your account first!', code: 17 });

        // ====================== CHECK IF USER PASSWORD IS CORRECT ======================
        bcrypt.compare(password, user.password, (err, isSame) => {
            if (err) return res.json({ status: 0, message: 'Error while trying to compare passwords!', code: 404 });

            // ====================== PASSWORDS DO NOT MATCH ======================
            if(!isSame) return res.json({ status: 0, message: 'Incorrent password', code: 16 });

            // ====================== ALL OK - CREATING A SESSION FOR USER ======================
            else {
                const loggedUser = { 
                    id: user.id, email: user.email, birthdate: user.birthdate, 
                    first_name: user.first_name, last_name: user.last_name, created_at: user.created_at 
                };
                req.session.user = loggedUser;
                return res.status(200).json({ status: 1, message: 'User logged in', user: loggedUser, code: 200 });
            }
        });
    // ====================== HANDLE ERROR ======================
    } catch (err) {
        return res.json({ status: 0, message: 'Error while trying to login user!', code: 404 });
    }
});

// ====================== REGISTER USER ======================
router.post('/register', (req, res) => {

    // ====================== HANDLE INITIAL CHECK ======================
    const initialCheckRes = handleInitialFormCheck(req.body, 'register', 6);
    if(initialCheckRes.status !== 1) return res.json(initialCheckRes);

    // ====================== EXTRACT FORM ELEMENTS ======================
    const [ { val: first_name }, { val: last_name }, { val: birthdate }, { val: email }, { val: password }, { val: repeatPassword } ] = [ ...req.body ];

    // ====================== CHECK IF PASSWORDS MATCH ======================
    if(password !== repeatPassword) return res.json({ status: 0, message: 'Passwords do not match!', code: 1 });

    // ====================== ENCRYPT THE PASSWORD ======================
    bcrypt.hash(password, saltRounds, async(err, hashedPassword) => {
        if(err) return res.json({ status: 0, message: 'Error while trying to register user!', code: 404 });
        try {
            // ====================== HANDLE EXISTING EMAIL ======================
            const [ existingUser ] = await User.query().select().where({ email }).limit(1);
            if(existingUser && existingUser.email.toLowerCase() === email.toLowerCase()) return res.json({ status: 0, message: 'Email is already taken!', code: 2 }); 

            // ====================== CREATE A NEW USER ======================
            // emailExistence.check(email, async(isExistingErr, isExistent) => {

                // ====================== CHECK IF EMAIL EXISTS ======================
                // if(isExistingErr) return res.json({ status: 0, message: 'Error trying to check if email exists', code: 404 });
                // if(!isExistent) return res.json({ status: 0, message: 'Your email address is not valid!', code: 3 });

                // ====================== INSERT THE NEW USER ======================
                const newUser = { 
                    first_name, 
                    last_name, 
                    birthdate, 
                    email, 
                    password: hashedPassword, 
                    activate_or_reset_pass_key: uuid() 
                };
                const createdUser = await User.query().insert(newUser);
                if(!createdUser) return res.json({ status: 0, message: 'Error while inserting user!', code: 404 });

                // ====================== SEND ACTIVATION EMAIL ======================
                const activateEmail = constructActivationEmail({ ...createdUser });
                transporter.sendMail(activateEmail, err => {
                    if(err) return res.json({ status: 0, message: 'Error while trying to send email!', code: 404 });
                        else return res.status(200).json({ status: 1, message: `SUCCESS: User ${createdUser.email} is now created!`, code: 200 });
                });
            // });
        // ====================== HANDLE ERROR ======================
        } catch(err) {
            return res.json({ status: 0, message: 'Error while trying to register user!', code: 404 });
        }
    });
        
    
});

module.exports = router;