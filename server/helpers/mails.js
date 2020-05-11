const { gmailRequestData } = require('../config/gmailConfig');
const { usersEndpoint } = require('../config/otherConfigs');

const rawEmail = {
    from: `Holiday House <${process.env.MAIL_SENDER || gmailRequestData.senderEmail}>`,
    to: 'receiver.email@gmail.com',
    subject: '',
    text: ''
}

const constructActivationEmail = user => {
    const { email, activate_or_reset_pass_key, username } = user;
    const path = `${process.env.SERVER_ENDPOINT || usersEndpoint}/activate-email?key=${activate_or_reset_pass_key}`;
    let newEmail = { ...rawEmail };
    newEmail.to = email;
    newEmail.subject = 'Welcome to SoftCloud! - Activate your account';
    newEmail.text =  `Activate your account here: ${path}`;
    newEmail.html = `<h1 style="color:#ff9800;">Welcome, ${username}!</h1>
                    <h4 style="margin-top: 20px;color:#485877;font-size:14px;margin-bottom:0;"=>One last step to fully activate your account. Click the link below and your SoftCloud account is ready!</h4><br>
                    <a style="font-size:14px;letter-spacing: 0.25px;color: #0080ff;" href="${path}">Click here to verify your account!</a>`;
    return newEmail;
}

const constructForgotCredentialsEmail = (user, key) => {
    const { email, username } = user;
    const path = `${process.env.SERVER_ENDPOINT || usersEndpoint}/reset?key=${key}`;
    let newEmail = { ...rawEmail };
    newEmail.to = email;
    newEmail.subject = 'SoftCloud - Recover your account credentials';
    newEmail.text =  `Reset your password here: ${path}`;
    newEmail.html = `<h2 style="color:#ff9800;">Got a little stuck? No worries, here you will get your help</h2><br>
                    <p style="color:#485877;">Your SoftCloud username is: <b>${username}</b></p><br>
                    <p style="color:#485877;"><b>NOTE:</b> Never give this link to anyone who do not trust 100%. They can change your password and take control of your account!</p><br>
                    <p style="color:#485877;">If you would like to reset your password please follow the information in this link: </p><br>
                    <a style="font-size:14px;letter-spacing: 0.25px;color: #0080ff;" href="${path}">Click here to reset your password</a>`;
    return newEmail;
}

module.exports = {
    constructActivationEmail,
    constructForgotCredentialsEmail
};