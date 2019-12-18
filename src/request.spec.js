const {
    describe,
    it
} = require('mocha');
const sinon = require('sinon');
const chai = require('chai');
const fs = require('fs');

const {
    ApiRequest
} = require('./request');
const apiRequest = new ApiRequest();
describe('controller test', function () {

    before(function () {

    });

    it('test', async function () {
        await apiRequest.postImage('test2.jpg');

        // chai.expect(result.length > 0).to.be.equals(true);
    });
});