// ====================== IMPORTS ======================
const router = require('express').Router();
const User = require(__dirname + '/../../models/User');
const validate = require(__dirname + '/../../helpers/validation');
const { isAuthenticated } = require(__dirname + '/../../helpers/auth');
const { constructActivationEmail, constructForgotCredentialsEmail } = require(__dirname + '/../../helpers/mails');
const { makeRequest, getProFileData } = require(__dirname + '/../../helpers/dbqueries');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { uuid, isUuid } = require('uuidv4');
const nodemailer = require('nodemailer');
const moment = require('moment');
const xoauth2 = require('xoauth2');
const emailExistence = require('email-existence');
const { gmailRequestData } = require(__dirname + '/../../config/gmailConfig');

// ====================== CLIENT ENDPOINT ======================
const clientEndpoint = 'https://rotarsebastian.github.io';

// ====================== SETUP MAILER ======================
const createTransportObject = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        type: 'OAuth2',
        user: process.env.MAIL_SENDER || gmailRequestData.senderEmail,
        clientId: process.env.MAIL_CLIENT || gmailRequestData.client_id,
        clientSecret: process.env.MAIL_SECRET || gmailRequestData.client_secret,
        refreshToken: process.env.MAIL_REFRESH || gmailRequestData.refresh_token,
    }
}
let transporter = nodemailer.createTransport(createTransportObject);

// ====================== FUNCTIONS ======================
const checkFormStructure = (form, option) => {
    if(form === undefined) return { status: 0, message: 'Invalid request!', code: 404 };
    if(!Array.isArray(form)) return { status: 0, message: 'Invalid format!', code: 404 };
    if(Array.isArray(form) && form.length === 0) return { status: 0, message: 'Array cannot be empty!', code: 404 };
    const rightElemNo = form.filter(e => e.hasOwnProperty('type') && e.hasOwnProperty('val') && Object.keys(e).length === 2).length;
    if(option && option === 'resetpass') {
        if(form.length !== 3 || rightElemNo !== 2 || !form[2].hasOwnProperty('key')) return { status: 0, message: 'Invalid array elements!', code: 404 };
    } else if(option && option === 'edit') {
        const rightElemNoEdit = form.filter(e => e.hasOwnProperty('type') && e.hasOwnProperty('val') && (Object.keys(e).length === 2 || Object.keys(e).length === 3)).length;
        if(form.length !== rightElemNoEdit) return { status: 0, message: 'Invalid array elements!', code: 404 };
    }
     else {
        if(form.length !== rightElemNo) return { status: 0, message: 'Invalid array elements!', code: 404 };
    }
    return { status: 1 };
}

// ====================== LOGOUT ======================
router.post('/logout', isAuthenticated, (req,res) => {
    req.session.destroy(err => {
        if(err) return res.send({ status: 0, message: 'Error while trying to logout user!', code: 404 });
        res.clearCookie('user_sid');
        res.status(200).send({ status: 1, msg: 'User is logged out!'});
    });
});

// ====================== CHECK IF USER HAS A SESSION ======================
router.post('/checkauth', isAuthenticated, async(req, res) => {
    const { withOptions } = req.body;
    try {
        const [fullUser] = await User.query().where({ id: req.session.user.id }).limit(1);
        if(withOptions && withOptions === 'profile') return res.status(200).send({ status: 1, msg: 'User authorized!', data: await getProFileData(fullUser.id) });
            else return res.status(200).send({ status: 1, msg: 'User authorized!', username: fullUser.username, userID: fullUser.id });
    } catch(err) {
        return res.send({ status: 0, msg: 'User not authorized!'});
    }
});

// ====================== CHECK IF RESET PASSWORD LINK IT IS NOT EXPIRED AND REDIRECT TO THE CORRECT PATH ======================
router.get('/reset', async(req, res) => {
    const { key } = req.query;

    const timeNow = moment().unix();

    const [foundUser] = await User.query().where({ activate_or_reset_pass_key: key }).limit(1);
    if(!foundUser) return res.redirect(`${clientEndpoint}/login?expired=true`);
    if(foundUser.reset_pass_time === null) return res.redirect(`${clientEndpoint}/login?expired=true`);

    const userLimitTime = moment(foundUser.reset_pass_time).unix(); 
    const difference = parseInt(userLimitTime) - parseInt(timeNow); 

    if(difference <= 0 ) return res.redirect(`${clientEndpoint}/login?expired=true`);
        else return res.redirect(`${clientEndpoint}/changepass?key=${key}`);
});

// RESET USER PASSWORD
router.post('/resetpass', async(req, res) => {
    if(!Array.isArray(req.body)) return { status: 0, message: 'Invalid format!', code: 404 };

    const form = [ ...req.body ];

    const checkResponse = checkFormStructure(form, 'resetpass');

    if(checkResponse.status === 0) return res.send(checkResponse);

    const result = validate([form[0], form[1]]);

    if(result.status === 0) return res.send({ status: 0, invalids: result.invalidInputs, code: 11 });

    const [ password, repeatPassword, key ] = form;
    const { key: oldKey } = key;

    const newKey = uuid();
    const timeNow = moment().unix();

    if(password.val && repeatPassword.val ) {
        if(password.val !== repeatPassword.val) {
            return res.send({ status: 0, message: 'Passwords do not match!', code: 10 });
        } else {
            const [foundUser] = await User.query().where({ activate_or_reset_pass_key: oldKey }).limit(1);
            if(!foundUser) return res.send({ status: 0, message: 'Your link has expired or is not valid!', code: 155 });
            if(foundUser.reset_pass_time === null) return res.send({ status: 0, message: 'Your link has expired!', code: 155 });

            const userLimitTime = moment(foundUser.reset_pass_time).unix(); 
            const difference = parseInt(userLimitTime) - parseInt(timeNow); 
            if(difference <= 0 ) return res.send({ status: 0, message: 'Your link has expired!', code: 155 });

            bcrypt.hash(password.val, saltRounds, async(err, hashedPassword) => {
                if(err) return res.send({ status: 0, message: 'Error while trying to chage user password!', code: 404 });
                try {
                    const updatedUserPass = await User.query().findById(foundUser.id).patch({ password: hashedPassword, activate_or_reset_pass_key: newKey, reset_pass_time: null });
                    if(updatedUserPass !== undefined) return res.status(200).send({ status: 1, message: 'Your password has been changed successfully!', code: 200 });
                        else return res.send({ status: 0, message: 'Error while trying to chage user password!', code: 404 });
                } catch(err) {
                    return res.send({ status: 0, message: 'Error while trying to chage user password!', code: 404 });
                }
            });
        }
    } else {
        return res.send({ status: 0, message: 'Error while trying to chage user password!', code: 404 });
    }
});

// RECOVER CREDENTIALS OR RESEND ACTIVATION EMAIL
router.post('/recover', async(req, res) => {
    if(!Array.isArray(req.body)) return { status: 0, message: 'Invalid format!', code: 404 };

    const form = [ ...req.body ];

    const checkResponse = checkFormStructure(form);

    if(checkResponse.status === 0) return res.send(checkResponse);

    const result = validate(form);

    if(result.status === 0) return res.send({ status: 0, invalids: result.invalidInputs, code: 11 })

    const [ usernameOrEmail ] = form;

    const activate_or_reset_pass_key = uuid(); // CREATE A KEY FOR RESETING THE PASSWORD
    const reset_pass_time = moment().add(1, 'hours').format('YYYY-MM-DD HH:mm:ss'); // GIVE IT 1 HOUR VALIDITY
    
    if(usernameOrEmail.val) {
        try {
            const users = await User.query().where({ username: usernameOrEmail.val }).orWhere({ email: usernameOrEmail.val }).limit(1);
            const user = users[0];
            if(!user) return res.send({ status: 0, message: 'Incorrect email or username!', code: 15 });
              else {
                if(user.verified === 0) { // RESEND CONFIRMATION EMAIL
                    const activateEmail = constructActivationEmail({ ...user });
                    transporter.sendMail(activateEmail, err => {
                        if(err) return res.send({ status: 0, message: 'Error while trying to send email!', code: 404 });
                            else return res.status(200).send({ status: 1, message: 'Reactivation email was sent successfully!', user, code: 200 });
                    });
                } else { // SEND CHANGE PASSWORD EMAIL
                    const profileUpdated = await User.query().findById(user.id).patch({ activate_or_reset_pass_key, reset_pass_time });
                    if(profileUpdated !== 1) return res.send({ status: 0, message: 'Error updating profile!', code: 404 });
                    const activateEmail = constructForgotCredentialsEmail({ ...user }, activate_or_reset_pass_key);
                    transporter.sendMail(activateEmail, err => {
                        if(err) return res.send({ status: 0, message: 'Error while trying to send email!', code: 404 });
                            else return res.status(200).send({ status: 1, message: 'An email to reset your password was sent to you!', code: 200 });    
                    });
                }
            }
        } catch (err) {
            return res.send({ status: 0, message: 'Error while trying to recover user!', code: 404 });
        }
    } else {
        return res.send({ status: 0, message: 'Error while trying to recover user!', code: 404 });
    } 
});

// EDIT USER PROFILE
router.post('/edit', isAuthenticated, async(req, res) => {
    try {
        if(!Array.isArray(req.body)) return { status: 0, message: 'Invalid format!', code: 404 };
        const form = [ ...req.body ];
        const checkResponse = checkFormStructure(form, 'edit');
        if(checkResponse.status === 0) return res.send(checkResponse);
        const result = validate(form);
        if(result.status === 0) return res.send({ status: 0, invalids: result.invalidInputs, code: 11 });
        const { addressid: addressID } = req.query;
        const userID = req.session.user.id;
        const updateResult = addressID ? await makeRequest(form, userID, addressID) : await makeRequest(form, userID);
        res.status(200).send(updateResult);
    } catch(err) {
        return res.send({ status: 0, msg: 'Error updating user profile!'});
    }
});


// LOGIN USER
router.post('/login', async(req, res) => {
    if(!Array.isArray(req.body)) return { status: 0, message: 'Invalid format!', code: 404 };

    const form = [ ...req.body ];
    
    const checkResponse = checkFormStructure(form);

    if(checkResponse.status === 0) return res.send(checkResponse);

    const result = validate(form);

    if(result.status === 0) return res.send({ status: 0, invalids: result.invalidInputs, code: 11 })

    const [ username, password ] = form;
    
    if(username.val && password.val) {
        try {
            const users = await User.query().where({ username: username.val }).orWhere({ email: username.val }).limit(1);
            const user = users[0];
            if(!user) return res.send({ status: 0, message: 'Incorrent username!', code: 15 });
            if(user.verified === 0) return res.send({ status: 0, message: 'Please activate your account first!', code: 17 });
            bcrypt.compare(password.val, user.password, (err, isSame) => {
                if (err) return res.send({ status: 0, message: 'Error while trying to login user!', code: 404 });
                if(!isSame) return res.send({ status: 0, message: 'Incorrent password', code: 16 });
                    else {
                        req.session.user = { username: user.username, id: user.id };
                        return res.status(200).send({ status: 1, message: 'User logged in', username: user.username, userID: user.id, code: 200 });
                }
            });
        } catch (err) {
            return res.send({ status: 0, message: 'Error while trying to login user!', code: 404 });
        }
    } else {
        return res.send({ status: 0, message: 'Error while trying to login user!', code: 404 });
    } 
});

// VERIFY AND ACTIVATE ACCOUNT
router.get('/activate-email', async(req, res) => {
    const { key } = req.query;
    const newKey = uuid();

    if(key) {
        if(isUuid(key)) {
            try {
                const [user] = await User.query().where({ activate_or_reset_pass_key: key }).limit(1);
                if(!user) return res.redirect(`${clientEndpoint}/login?expired=true`); // link activated already or is expired
                if(user.verified === 1) return res.redirect(`${clientEndpoint}/login?activated=true`); // already activated
                const activatedAccount = await User.query().findById(user.id).patch({ activate_or_reset_pass_key: newKey, verified: 1 });
                if(activatedAccount !== undefined) return res.redirect(`${clientEndpoint}/login?activated=${key}`);
                    else return res.redirect(`${clientEndpoint}/login?activated=false`); 
            } catch (err) {
                return res.redirect(`${clientEndpoint}/login?expired=true`);
            }
        } return res.redirect(`${clientEndpoint}/login?expired=true`);
    } return res.redirect(`${clientEndpoint}/login?expired=true`);
});

// REGISTER USER
router.post('/register', async(req, res) => {
    if(!Array.isArray(req.body)) return { status: 0, message: 'Invalid format!', code: 404 };

    const form = [ ...req.body ];

    const checkResponse = checkFormStructure(form);

    if(checkResponse.status === 0) return res.send(checkResponse);

    const result = validate(form);

    if(result.status === 0) return res.send({ status: 0, invalids: result.invalidInputs, code: 11 });

    const [ username, password, email, repeatPassword ] = form;

    if(username.val && password.val && repeatPassword.val ) {
        if(password.val !== repeatPassword.val) return res.send({ status: 0, message: 'Passwords do not match!', code: 10 });
        else {
            bcrypt.hash(password.val, saltRounds, async(err, hashedPassword) => {
                if(err) return res.send({ status: 0, message: 'Error while trying to register user!', code: 404 });
                try {
                    const existingUser = await User.query().select().where({ username: username.val }).orWhere({ email: email.val }).limit(1);
                    if(existingUser[0]) { // HANDLE EXISTING USERNAME / EMAIL
                        if(existingUser[0].email.toLowerCase() === email.val.toLowerCase() && existingUser[0].username.toLowerCase() === username.val.toLowerCase()) return res.send({ status: 0, message: 'Email and username are already taken!', code: 12 }); 
                        if(existingUser[0].username.toLowerCase() === username.val.toLowerCase()) return res.send({ status: 0, message: 'Username is already taken!', code: 13 }); 
                        if(existingUser[0].email.toLowerCase() === email.val.toLowerCase()) return res.send({ status: 0, message: 'Email is already taken!', code: 14 }); 
                    } else { // CREATE A NEW USER
                        emailExistence.check(email.val, async(isExistingErr, isExistent) => { // CHECK IF EMAIL EXISTS AT ALL - MIGHT FAIL SOMETIMES (BE CAREFUL)
                            if(isExistingErr) return res.send({ status: 0, message: 'Your email address is not valid!', code: 9 });
                            if(!isExistent) return res.send({ status: 0, message: 'Your email address is not valid!', code: 9 });
                            const newUser = await User.query().insert({ username: username.val, password: hashedPassword, email: email.val, activate_or_reset_pass_key: uuid() });
                            if(!newUser.hasOwnProperty('id')) return res.send({ status: 0, message: 'Error while inserting user!', code: 404 });
                            const activateEmail = constructActivationEmail({ ...newUser });
                            transporter.sendMail(activateEmail, (err, emailRes) => {
                                if(err) return res.send({ status: 0, message: 'Error while trying to send email!', code: 404 });
                                    else return res.status(200).send({ status: 1, message: `SUCCESS: User ${newUser.username} is now created!`, code: 200 });
                            });
                        });
                    }
                } catch(err) {
                    return res.send({ status: 0, message: 'Error while trying to register user!', code: 404 });
                }
            });
        }
    } else {
        return res.send({ status: 0, message: 'Error while trying to register user!', code: 404 });
    }
});

module.exports = router;