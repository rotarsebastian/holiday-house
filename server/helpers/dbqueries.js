const User = require(__dirname + '/../models/User');
const Property = require(__dirname + '/../models/Property');
const { removeImages } = require(__dirname + '/handleImages');
const { ref, raw } = require('objection');

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
            if(userExisting !== undefined && userExisting.id !== Number(id)) return { status: 0, message: 'This email is already taken!', code: 87 };
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
const getPropertiesWithFilters = async(offset, city, from, to, guests, types, minPrice, maxPrice) => {
    let properties;
    let min = minPrice ? minPrice : 0;
    let max = maxPrice ? maxPrice : 999999;
    if(!types) {
        properties = await Property.query()
            .select('title', 'beds', 'bathrooms', 'rooms', 'type', 'capacity', 'price', 'photos')
            .where(ref('address:city').castText(), '=', city.toLowerCase())
            .andWhere('available_start', '<=' , from)
            .andWhere('available_end', '>=' , to)
            .andWhere('capacity', '>=' , guests)
            .andWhere('price', '>=' , min)
            .andWhere('price', '<=' , max)
            .limit(10)
            .offset(offset)
    } else {
        properties = await Property.query()
            .select('title', 'beds', 'bathrooms', 'rooms', 'type', 'capacity', 'price', 'photos')
            .where(ref('address:city').castText(), '=', city.toLowerCase())
            .andWhere('available_start', '<=' , from)
            .andWhere('available_end', '>=' , to)
            .andWhere('capacity', '>=' , guests)
            .andWhere('price', '>=' , min)
            .andWhere('price', '<=' , max)
            .where(builder => {
                builder
                  .where(raw('LOWER("type") = ?', type.toLowerCase()))
                  .orWhere(raw('LOWER("type") = ?', type1.toLowerCase()));
            })
            // .andWhere(raw('LOWER("type") = ?', type.toLowerCase()))
            .limit(10)
            .offset(offset)      
    }
    return properties;
}

// ====================== EDIT PROPERTY ======================
const editProperty = async(form, id, oldPhotos, newPhotos, facilitiesID) => {
    try {
        // ====================== CREATE NEW EDIT OBJ ======================
        let requestObj = { id: Number(id) };
        if(form.findIndex(e => e.type === 'facilities') > -1) requestObj.facilities = {};
        if(facilitiesID && requestObj.hasOwnProperty('facilities')) requestObj.facilities.id = Number(facilitiesID);
    
        // ====================== CONSTRUCT REQUEST OBJECT ======================
        form.map(prop => { 
            if(prop.type === 'facilities') requestObj.facilities.facilities_list = prop.val;
                else if(prop.type === 'address') requestObj[prop.type] = prop.val.toLowerCase();
                    else requestObj[prop.type] = prop.val;
        });

        // ====================== CONSTRUCT REMOVED IMAGES ======================
        const requestPhotos = JSON.parse(requestObj.photos);
        const keptImages = [];

        const removedPhotos = oldPhotos.filter(img => { 
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
        console.log(e)
        return { status: 0, message: 'Error configuring request!', code: 404 };
    }
}

module.exports = { editUser, editProperty, getPropertiesWithFilters };