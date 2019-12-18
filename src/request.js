const request = require('request-promise');

const baseUri = process.env.API_BASE_URI;

class ApiRequest {

    /**
     *
     *
     * @param {string} name
     * @memberof ApiRequest
     */
    async postImage(name) {
        return request.post(baseUri, {
            method: 'POST',
            body: {
                name,
            },
            json: true
        });
    }
}

module.exports = {
    ApiRequest
}