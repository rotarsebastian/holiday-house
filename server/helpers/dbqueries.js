const User = require(__dirname + '/../models/User');
const Property = require(__dirname + '/../models/Property');
const { removeImages } = require(__dirname + '/handleImages');

// ====================== EDIT USER ======================
const editUser = async(form, id) => {
    try {
        // ====================== CREATE NEW UPDATE OBJ ======================
        let requestObj = {};
    
        // ====================== ADDING THE MODIFIED KEYS AND VALUES ======================
        form.map(prop => requestObj[prop.type] = prop.val);

        // ====================== AVOID CHANGING BIRTHDAY AND PASSWORD ======================
        if(requestObj.hasOwnProperty('birthdate') || requestObj.hasOwnProperty('password')) 
            return { status: 0, message: 'Birthdate or password cannot be updated!', code: 404 };

        // ====================== CHECK IF THE EMAIL IS NOT TAKEN ALREADY ======================
        if(requestObj.hasOwnProperty('email')) {
            const [ userExisting ] = await User.query().where({ email: requestObj.email }).limit(1);
            if(userExisting !== undefined && userExisting.id !== parseInt(id)) return { status: 0, message: 'This email is already taken!', code: 87 };
        }
    
        // ====================== MAKING REQUEST TO UPDATE IN THE DB ======================
        const dbResponse = await User.query().findById(id).patch(requestObj);
        if(!dbResponse) return { status: 0, message: 'DB Error! Please try again', code: 404 };

        // ====================== EVERYTHING OK ======================
        if(dbResponse === 1) return { status: 1, message: 'Your profile has been updated!', data: requestObj, code: 200 };
            else return { status: 0, message: 'DB Error! Please try again', code: 404 };
    
    // ====================== HANDLE ERROR ======================  
    } catch(e) {
        return { status: 0, message: 'Error configuring request!', code: 404 };
    }
}

// ====================== GET USER PROPERTIES ======================
const getProFileData = async(userID) => {
    // try {
    //     const [ { password, activate_or_reset_pass_key, created_at, email, ...rest } ] = await User.query().where({ id: userID }).withGraphFetched('user_address');
    //     if(rest === undefined) return {};
    //     return rest;
    // } catch(e) {
    //     return {};
    // }
}

// ====================== EDIT PROPERTY ======================
const editProperty = async(form, id, oldPhotos, newPhotos, facilitiesID) => {
    try {
        // ====================== CREATE NEW EDIT OBJ ======================
        let requestObj = { id: parseInt(id) };
        if(form.findIndex(e => e.type === 'facilities') > -1) requestObj.facilities = {};
        if(facilitiesID && requestObj.hasOwnProperty('facilities')) requestObj.facilities.id = parseInt(facilitiesID);
    
        // ====================== CONSTRUCT REQUEST OBJECT ======================
        form.map(prop => { 
            if(prop.type === 'facilities') requestObj.facilities.facilities_list = prop.val;
                else requestObj[prop.type] = prop.val;
        });

        // ====================== CONSTRUCT REMOVED IMAGES ======================
        const requestPhotos = JSON.parse(requestObj.photos);
        const keptImages = [];

        const removedPhotos = JSON.parse(oldPhotos).filter(img => { 
            if(requestPhotos.indexOf(img) < 0) return img;
                else keptImages.push(img);
        });

        // ====================== REMOVE IMAGES FROM S3 ======================
        const awsRes = await removeImages(removedPhotos);
        if(awsRes.status === 0) return awsRes;

        // ====================== PUT BACK THE KEPT IMAGES ======================s
        requestObj.photos = JSON.stringify(keptImages);

        // ====================== CHECK IF NEW IMAGES ======================
        if(newPhotos && newPhotos.length > 0) {
            const photos = [ ...JSON.parse(requestObj.photos) ];
            newPhotos.map(img => photos.push(img.location.slice(-41)));
            requestObj.photos = JSON.stringify(photos); // ADD IT AS JSON INSIDE THE REQUEST OBJECT
        }
 
        // ====================== MAKE THE REQUEST ======================
        const dbResponse = await Property.query().upsertGraph(requestObj);
        if(typeof dbResponse !== 'object') return { status: 0, message: 'DB Error! Please try again', code: 404 };

        // ====================== SUCCESS ======================
        return { status: 1, message: 'Your property has been updated!', data: dbResponse, code: 200 };
    
    // ====================== HANDLE ERROR ======================  
    } catch(e) {
        return { status: 0, message: 'Error configuring request!', code: 404 };
    }
}

module.exports = { editUser, getProFileData, editProperty };