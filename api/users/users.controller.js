const usersService = require("./users.service");

class UsersController {
    async getAll(req, res, next) {
        try{
            const users = await usersService.getAll();
            res.json(users);
        } catch (err) {
            next(err);
        }
    }
    async getById(req, res, next) {
        try{
            const id = req.params.id;
            const user = await usersService.get(id);
            if(!user) {
                throw new NotFoundError();
            }
        } catch (err) {
            next(err);
        }
    }
    async create(req, res, next) {
        try{
            const user = await usersService.create(req.body);
            user.password = undefined;
            res.status(201).json(user);
        } catch (err) {
            next(err);
        }
    }
    async update(req, res, next) {
        try{
            const id = req.params.id;
            const data = req.body;
            const userModified = await usersService.update(id, data);
            userModified.password = undefined;
            res.json(userModified);
        } catch (err) {
            next(err);
        }
    }
    async delete(req, res, next) {
        try{
            const id = req.params.id;
            const user = await usersService.delete(id);
            res.json(user);
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new UsersController();