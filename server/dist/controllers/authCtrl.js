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
    register: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { firstName, lastName, email, hash: password, } = req.body;
        const foundUser = yield User.findOne({ email: email });
        if (foundUser) {
            return res.status(409).send('User already exists');
        }
        const salt = yield bcrypt_1.default.genSalt(5);
        const hash = yield bcrypt_1.default.hash(password, salt);
        const newUser = new User({
            firstName,
            lastName,
            email,
            hash,
        });
        newUser
            .save()
            .then((response) => {
            req.session.user = {
                _id: response._id,
                firstName: response.firstName,
                lastName: response.lastName,
                email: response.email,
            };
            return res.status(201).send(req.session.user);
        })
            .catch((err) => {
            return res.status(400).send('Unable to create user');
        });
    }),
    login: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, hash: password } = req.body;
        const foundUser = yield User.findOne({ email: email });
        if (!foundUser) {
            return res.status(404).send('User does not exist');
        }
        const passwordsMatch = yield bcrypt_1.default.compare(password, foundUser.hash);
        if (!passwordsMatch) {
            return res.status(401).send('Incorrect password');
        }
        req.session.user = {
            _id: foundUser._id,
            firstName: foundUser.firstName,
            lastName: foundUser.lastName,
            email: foundUser.email,
        };
        return res.status(202).send(req.session.user);
    }),
    logout: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        if (!req.session.user) {
            return res.status(400).send('Not logged in.');
        }
        req.session.destroy(() => {
            return res.status(200).send('Successfully logged out');
        });
    }),
};
//# sourceMappingURL=authCtrl.js.map