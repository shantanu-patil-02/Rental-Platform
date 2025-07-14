class ExpressError extends Error {
    constructor (statuscode , messsage) {
        super();
        this.statuscode = statuscode;
        this.message = this.message;
    }
}

module.exports = ExpressError;