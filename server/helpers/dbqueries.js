const User = require(__dirname + '/../models/User');

const makeRequest = async(form, id) => {
    try {
        // ====================== CREATE NEW UPDATE OBJ ======================
        let requestObj = {};
    
        // ====================== ADDING THE MODIFIED KEYS AND VALUES ======================
        form.map(prop => requestObj[prop.type] = prop.val);

        if(requestObj.hasOwnProperty('birthdate') || requestObj.hasOwnProperty('password')) 
            return { status: 0, message: 'Birthdate or password cannot be updated!', code: 404 };
    
        // ====================== MAKING REQUEST TO UPDATE IN THE DB ======================
        const dbResponse = await User.query().findById(id).patch(requestObj);
        if(!dbResponse) return { status: 0, message: 'DB Error! Please try again', code: 404 };

        // ====================== EVERYTHING OK ======================
        return { status: 1, message: 'Your profile has been updated!', data: dbResponse, code: 200 };
    
    // ====================== HANDLE ERROR ======================  
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