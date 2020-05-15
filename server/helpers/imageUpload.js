const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const { AWS_Access_Key, AWS_Secret_Key } = require(__dirname + '/../config/otherConfigs');

aws.config.update({
    secretAccessKey: AWS_Secret_Key,
    accessKeyId: AWS_Access_Key,
    region: 'us-east-1'
});
 
const s3 = new aws.S3();

const fileFilter = (req, file, cb) => {
    if (file.mimetype.toLowerCase() === 'image/jpeg' || file.mimetype.toLowerCase() === 'image/png' || file.mimetype.toLowerCase() === 'image/jpg') {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type, only JPEG and PNG is allowed!'), false);
    }
}
 
const upload = multer({
    fileFilter,
    storage: multerS3({
    s3: s3,
    bucket: 'holidayhouse1',
    acl: 'public-read',
    metadata: function (req, file, cb) {
        cb(null, {fieldName: 'TESTING_METADATA'});
    },
    key: function (req, file, cb) {
        cb(null, Date.now().toString())
    }
    })
});

module.exports = upload;