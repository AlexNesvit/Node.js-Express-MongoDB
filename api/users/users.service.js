const User = require('./users.model');

class UserService {
    getAll() {
        return User.find({}, "-password");
    }
    get(id) {
        return User.findById(id, "-password");
    }
    create(data){
        const user = new User(data);
        return user.save();
    }
    update(id, data){
        return User.findByIdAndUpdate(id, data, {new: true});
    }
    delete(id){
        return User.deleteOne({_id: id});
    }
}

module.exports = new UserService();