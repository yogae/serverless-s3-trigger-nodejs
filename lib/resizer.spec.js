const {
    describe,
    it
} = require('mocha');
const sinon = require('sinon');
const chai = require('chai');
const fs = require('fs');

const {
    Resizer
} = require('./resizer');

const cwd = process.cwd();
const testFileName = 'test.jpg';

describe('resizer test', function () {
    let fileBuffer = null;

    before(function () {
        fileBuffer = fs.readFileSync(`${cwd}/test/${testFileName}`);
    })

    it('resizeImages method', async function () {
        const resizer = new Resizer(fileBuffer);
        const result = await resizer.resizeImages('jpeg');
        Object.keys(result).forEach(async (key) => {
            const {
                w,
                h
            } = await resizer.getImageInfo(result[key])
            const size = resizer.resolutionBySize(key);
            if (size) {
                chai.expect(w).to.be.equals(size.w);
                chai.expect(h).to.be.equals(size.h);
            }
        })
    });
});