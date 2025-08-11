const User = require('./users.model');

class UserService {
    getAll() {
        return User.find({}, "-password");
    }
    get(id) {
        return User.findById(id);
    }
    create(data){
        const user = new User(data);
        return user.save();
    }}

module.exports = new UserService();