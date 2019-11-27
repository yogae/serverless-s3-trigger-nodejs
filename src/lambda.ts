import { S3Handler } from 'aws-lambda';
import 'source-map-support/register';

export const trigger: S3Handler = async (event, context) => {
  const srcBucket = event.Records[0].s3.bucket.name;
  // Object key may have spaces or unicode non-ASCII characters.
  const srcKey = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, " "));

  console.log('srcBucket', srcBucket);
  console.log('srcKey', srcKey);
}