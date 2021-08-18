"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const User = require('../models/user');
module.exports = {
    updateUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        const { email = null, hash: password = null, } = req.body;
        const foundUser = yield User.findById(id);
        if (!foundUser) {
            return res.status(400).send('User not found');
        }
        if (!req.session.user) {
            return res.status(400).send('Not logged in.');
        }
        if (req.session.user._id !== foundUser._id.toString()) {
            return res.status(401).send('Cannot modify other users');
        }
        // only email provided
        if (!password && email) {
            if (email !== foundUser.email) {
                const updatedUser = yield foundUser.set('email', email);
                yield updatedUser.save().then((response) => {
                    req.session.user = {
                        _id: response._id,
                        firstName: response.firstName,
                        lastName: response.lastName,
                        email: response.email,
                    };
                });
                console.log(req.session.user);
                return res.status(202).send(req.session.user);
            }
            else {
                return res.status(406).send('Email matches current email');
            }
        }
        // only password provided
        if (password && !email) {
            const passwordsMatch = yield bcrypt_1.default.compare(password, foundUser.hash);
            if (!passwordsMatch) {
                const salt = yield bcrypt_1.default.genSalt(5);
                const hash = yield bcrypt_1.default.hash(password, salt);
                const updatedUser = yield foundUser.set('hash', hash);
                yield updatedUser.save().then((response) => {
                    req.session.user = {
                        _id: response._id,
                        firstName: response.firstName,
                        lastName: response.lastName,
                        email: response.email,
                    };
                });
                return res.status(202).send(req.session.user);
            }
            else {
                return res.status(406).send('Password matches current password');
            }
        }
        // if email and password provided
        if (password && email) {
            const passwordsMatch = yield bcrypt_1.default.compare(password, foundUser.hash);
            if (!passwordsMatch && email !== foundUser.email) {
                const salt = yield bcrypt_1.default.genSalt(5);
                const hash = yield bcrypt_1.default.hash(password, salt);
                const updatedUser = yield User.findOneAndUpdate({ _id: foundUser._id }, { email: email, hash: hash }, { new: true });
                yield updatedUser.save().then((response) => {
                    req.session.user = {
                        _id: response._id,
                        firstName: response.firstName,
                        lastName: response.lastName,
                        email: response.email,
                    };
                });
                return res.status(202).send(req.session.user);
            }
            else {
                return res.status(406).send('Email/Password matches current password');
            }
        }
    }),
    deleteUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        const foundUser = yield User.findById(id);
        if (!foundUser) {
            return res.status(400).send('User not found');
        }
        if (!req.session.user) {
            return res.status(400).send('Not logged in.');
        }
        if (req.session.user._id !== foundUser._id.toString()) {
            return res.status(401).send('Cannot delete other users');
        }
        if (foundUser._id.toString() === id) {
            yield foundUser.remove();
            req.session.destroy((err) => {
                if (err) {
                    console.log(err);
                }
            });
            return res.status(200).send('Successfully deleted account');
        }
        else {
            return res.status(400).send('UserId does not match');
        }
    }),
};
//# sourceMappingURL=userCtrl.js.map