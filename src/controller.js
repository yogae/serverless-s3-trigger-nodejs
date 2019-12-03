const {
    Resizer
} = require('../lib/resizer');
const {
    S3Controller
} = require('../lib/awsModule');
const {
    EventParser
} = require('../lib/eventParser');

const destinationBucket = process.env.DESTINATION_BUCKET_NAME;

/**
 *
 *
 * @param {String} key
 * @returns {String}
 */
function getFileName(key) {
    const splitArray = key.split('/');
    return splitArray[splitArray.length - 1];
}


/**
 *
 *
 * @param {'thumbnail' | 'standard' | 'origin'} resolution
 * @param {String} fileName
 * @returns
 */
function contentsBucketKeyBuilder(resolution, fileName) {
    return `${resolution}/${fileName}`;
}


/**
 *
 *
 * @param {{key: String, dstBucket: String}} sourceInfo
 * @param {Resizer} resizer
 * @param {S3Controller} s3Ctr
 * @returns
 */
async function controller(sourceInfo, resizer, s3Ctr) {
    const fileName = getFileName(sourceInfo.key);
    const [imageName, extension] = fileName.split('.');
    const requiredFormat = extension == "jpg" ? "jpeg" : extension; // sharp에서는 jpg 대신 jpeg사용합니다.
    const objectBuffer = await s3Ctr.getObjectBuffer(sourceInfo.dstBucket, sourceInfo.key);
    const resultBufferMap = await resizer.resizeImages(objectBuffer, requiredFormat);
    const promises = Object.keys(resultBufferMap).map((resolution) => {
        const uploadKey = contentsBucketKeyBuilder(resolution, fileName);
        return s3Ctr.putObjectBuffer(destinationBucket, uploadKey, resultBufferMap[resolution]);
    })
    const result = await Promise.all(promises);
    return result;
}

exports.controller = controller;