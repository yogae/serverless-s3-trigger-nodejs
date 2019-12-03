class EventParser {
    constructor(event) {
        this.event = event;
        const s3 = event.Records[0].s3;
        this.key = decodeURIComponent(s3.object.key.replace(/\+/g, " "));
        this.bucket = s3.bucket.name;
    }

    /**
     *
     *
     * @returns {{key: String, bucket: String}}
     * @memberof EventParser
     */
    getSource() {
        return {
            key: this.key,
            bucket: this.bucket
        }
    }
}

exports.EventParser = EventParser;