class UnauthorizedError extends Error {
    constructor(message = "Unauthorized") {
        super(message);
        this.status = 401;
    }
}