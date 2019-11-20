"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("source-map-support/register");
exports.hello = async (event, _context) => {
    console.error(new Error('test'));
    return {
        statusCode: 200,
        body: JSON.stringify({
            message: 'Go Serverless Webpack (Typescript) v1.0! Your function executed successfully!',
            input: event,
        }, null, 2),
    };
};
exports.trigger = async (event, context) => {
    const srcBucket = event.Records[0].s3.bucket.name;
    // Object key may have spaces or unicode non-ASCII characters.
    const srcKey = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, " "));
};
//# sourceMappingURL=handler.js.map