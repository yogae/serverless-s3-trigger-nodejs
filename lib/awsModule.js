const AWS = require('aws-sdk');

const s3Obj = new AWS.S3();


/**
 *
 *
 * @class S3Controller
 */
class S3Controller {

    /**
     *
     * @param {string} bucketName
     * @param {String} key
     * @returns {Promise<Buffer>}
     * @memberof S3Controller
     */
    async getObjectBuffer(bucketName, key) {
        return s3Obj.getObject({
            Bucket: bucketName,
            Key: key
        }).promise().then((res) => res.Body);
    }


    /**
     *
     * @param {string} bucketName
     * @param {String} key
     * @param {Buffer} body
     * @returns {Promise<String>}
     * @memberof S3Controller
     */
    async putObjectBuffer(bucketName, key, body) {
        return s3Obj.putObject({
            Bucket: bucketName,
            Key: key,
            Body: body,
        }).promise().then(() => key);
    }
}

module.exports = {
    S3Controller
}