const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const { AWS_Access_Key, AWS_Secret_Key } = require(__dirname + '/../config/otherConfigs');
const { uuid } = require('uuidv4');

aws.config.update({
    secretAccessKey: process.env.secretAWS || AWS_Secret_Key,
    accessKeyId: process.env.accessAWS || AWS_Access_Key,
    region: 'us-east-1'
});

const s3 = new aws.S3();

const fileFilter = (req, file, cb) => {
    if (file.mimetype.toLowerCase() === 'image/jpeg' || file.mimetype.toLowerCase() === 'image/png' || file.mimetype.toLowerCase() === 'image/jpg') {
        return cb(null, true);
    } else {
        return cb(new Error('Invalid file type, only JPEG, JPG and PNG is allowed!'), false);
    }
}
 
const upload = multer({
    fileFilter,
    storage: multerS3({
        s3: s3,
        bucket: 'holidayhouse1',
        acl: 'public-read',
        metadata: function (req, file, cb) {
            cb(null, { fieldName: 'TESTING_METADATA' });
        },
        key: function (req, file, cb) {
            cb(null, uuid() + '.jpeg')
        }
    })
});

const removeImages = async(removedImages) => {
    if(removedImages && removedImages.length === 0) return { status: 1, message: 'No images to remove!' };
    
    try {
        const imgsToRemove = [];
        
        removedImages.forEach(img => imgsToRemove.push({ Key: img.slice(-41) }));
    
        const s3Res = await s3.deleteObjects({
            Bucket: 'holidayhouse1',
            Delete: {
                Objects: imgsToRemove
            }
        }).promise();

        if(s3Res && s3Res.Deleted && s3Res.Deleted.length > 0) return { status: 1, message: 'Images removed successfully!', deleted: s3Res.Deleted };
    } catch (error) {
        return { status: 0, message: 'S3 Error deleting images', code: 404 };
    }
} 

module.exports = { upload, removeImages };