const {
    describe,
    it
} = require('mocha');
const sinon = require('sinon');
const chai = require('chai');
const fs = require('fs');


const {
    Resizer
} = require('../lib/resizer');
const {
    S3Controller
} = require('../lib/awsModule');

const {
    controller
} = require('./controller');


const cwd = process.cwd();
const testFileName = 'test.jpg';
const eventFile = 'event.json';

describe('controller test', function () {
    const resizer = new Resizer();
    const s3Ctr = new S3Controller();
    let fileBuffer = null;

    before(function () {
        fileBuffer = fs.readFileSync(`${cwd}/test/${testFileName}`);
        sinon.stub(resizer, 'resizeImages').returns({
            origin: fileBuffer,
            standard: fileBuffer,
            thumbnail: fileBuffer,
        });
        sinon.stub(s3Ctr, 'getObjectBuffer').returns(fileBuffer);
        sinon.stub(s3Ctr, 'putObjectBuffer').returns('test.jpg');
    })

    it('test', async function () {
        const result = await controller({
            key: 'test.jpg',
            dstBucket: 'testbucket',
        }, resizer, s3Ctr);

        console.log(result);
    });
});