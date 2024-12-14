class Response {
    constructor(succes, data = null , message = ''){
        this.succes = succes;
        this.data = data,
        this.message = message
    }
}

module.exports = Response