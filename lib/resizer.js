const Sharp = require("sharp");

const defaultSizeByResolution = {
    thumbnail: {
        w: 128,
        h: 128
    },
    standard: {
        w: 512,
        h: 512
    }
}

class Resizer {

    /**
     *Creates an instance of Resizer.
     * @memberof Resizer
     */
    constructor() {
        const resArray = Object.keys(defaultSizeByResolution);
        resArray.push('origin');
        this.resArray = resArray;
    }

    /**
     *
     *
     * @param {'thumbnail' | 'standard' | 'origin'} resolution
     * @returns
     * @memberof Resizer
     */
    resolutionBySize(resolution) {
        const defaultSize = defaultSizeByResolution[resolution];
        if (defaultSize) return {
            w: defaultSize.w,
            h: defaultSize.h
        }
        return undefined
    }

    /**
     *
     * @param {Buffer} image
     * @param {'thumbnail' | 'standard' | 'origin'} resolution
     * @param {string} extension
     * @returns {Promise<{resolution: 'thumbnail' | 'standard' | 'origin', buffer: Buffer}>}
     * @memberof Resizer
     */
    async resize(image, resolution, extension) {
        const res = resolution.toLowerCase();
        const result = {
            resolution,
            buffer: null
        }
        if (res === 'origin') {
            result.buffer = image;
        } else if (this.resArray.includes(res)) {
            const size = this.resolutionBySize(resolution);
            const buffuer = await Sharp(image)
                .resize(size.w, size.h)
                .toFormat(extension)
                .toBuffer()
                .catch((err) => {
                    throw new Error(`sharp error : ${err.message}`)
                });
            result.buffer = buffuer;
        } else {
            throw new Error('invalid resolution');
        }
        return result;
    }


    /**
     *
     *
     * @returns {Promise<{[key: 'thumbnail' | 'standard' | 'origin']: Buffer}>}
     * @memberof Resizer
     */
    async resizeImages(image, extention) {
        const promises = this.resArray.map((resolution) => {
            return this.resize(image, resolution, extention);
        });
        return Promise.all(promises)
            .then((res) => {
                return res.reduce((acc, {
                    resolution,
                    buffer
                }) => {
                    acc[resolution] = buffer;
                    return acc;
                }, {});
            })
    }


    /**
     *
     *
     * @returns {Promise<{w: Number, h: Number}>}
     * @memberof Resizer
     */
    async getImageInfo(buffer) {
        return Sharp(buffer).metadata().then((res) => {
            return {
                w: res.width,
                h: res.height
            }
        })
    }
}

module.exports = {
    Resizer
}