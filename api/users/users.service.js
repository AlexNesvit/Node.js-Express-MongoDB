const User = require('./users.model');

class UserServise {
    getAll() {
        return User.find();
    }
    get(id) {
        return User.findById(id);
    }
}

module.exports = new UserServise();