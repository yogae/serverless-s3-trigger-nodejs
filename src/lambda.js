const {
  Resizer
} = require('../lib/resizer');
const {
  S3Controller
} = require('../lib/awsModule');
const {
  EventParser
} = require('../lib/eventParser');
const {
  controller
} = require('./controller');

const s3Ctr = new S3Controller();
const resizer = new Resizer();

exports.trigger = async (event, context) => {
  const eventParser = new EventParser(event);
  const {
    key,
    bucket
  } = eventParser.getSource();
  try {
    const result = await controller({
      key,
      dstBucket: bucket,
    }, resizer, s3Ctr);
    console.log(result);
  } catch (error) {
    console.error('controller error: ', error);
  }
}