class BaseResponse {
    constructor() {
    }

    constructor(code, message) {
        this.code = code;
        this.message = message;
    }

    code;
    message;
}

module.exports = BaseResponse;
