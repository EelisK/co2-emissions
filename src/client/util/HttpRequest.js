class HttpRequest {
    constructor(path, method = "GET") {
        this.request = new Request(path, { method });
    }

    send() {
        return fetch(this.request).then(x => x.json());
    }
}

export default HttpRequest;