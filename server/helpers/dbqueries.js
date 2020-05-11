const User = require(__dirname + '/../models/User');

const makeRequest = async(form, userID, addressID) => {
    try {
        let requestObj = { id: parseInt(userID) };
        if(form.findIndex(e => e.hasOwnProperty('address')) > -1) requestObj.user_address = {};
        if(addressID && requestObj.hasOwnProperty('user_address')) requestObj.user_address.id = parseInt(addressID);
    
        form.map(prop => { 
            if(prop.hasOwnProperty('address')) requestObj.user_address[prop.type] = prop.val;
                else requestObj[prop.type] = prop.val;
        });
    
        if(requestObj.hasOwnProperty('username')) {
            const [fullUser] = await User.query().where({ username: requestObj.username }).limit(1);
            if(fullUser !== undefined && fullUser.id !== parseInt(userID)) return { status: 0, message: 'This username is already taken!', code: 87 };
        }
    
        const dbResponse = await User.query().upsertGraph(requestObj);
        if(typeof dbResponse !== 'object') return { status: 0, message: 'DB Error! Please try again', code: 404 };
        return { status: 1, message: 'Your profile has been updated!', data: dbResponse, code: 200 };
    } catch(e) {
        return { status: 0, message: 'Error configuring request!', code: 404 };
    }
}

const getProFileData = async(userID) => {
    try {
        const [ { password, activate_or_reset_pass_key, created_at, email, ...rest } ] = await User.query().where({ id: userID }).withGraphFetched('user_address');
        if(rest === undefined) return {};
        return rest;
    } catch(e) {
        return {};
    }
}

module.exports = { makeRequest, getProFileData };