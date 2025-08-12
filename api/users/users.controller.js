const usersService = require("./users.service");
const NotFoundError = require("../../errors/not-found");
const UnauthorizedError = require("../../errors/unauthorized");
const jwt = require("jsonwebtoken");
const config = require("../../config");

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
            res.json(user);
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
            res.status(204).send();
        } catch (err) {
            next(err);
        }
    }
    async login(req, res, next) {
        try{
            const {email, password} = req.body;
            const userId = await usersService.checkPassword(email, password);
            if(!userId) {
                throw new UnauthorizedError();
            }   
            const token = jwt.sign({userId}, config.secretJwtToken, {expiresIn: '3d'});
            res.json({token});         
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new UsersController();