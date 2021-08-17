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
            return res.status(404).send('User already exists');
        }
        const salt = bcrypt_1.default.genSaltSync(5);
        const hash = bcrypt_1.default.hashSync(password, salt);
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
            return res.status(201).send('User created successfully');
        })
            .catch((err) => {
            return res.status(400).send('Unable to create user');
        });
    }),
    login: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { firstName, lastName, email, hash: password, } = req.body;
        const foundUser = yield User.findOne({ email: email });
        if (!foundUser) {
            return res.status(404).send('User does not exist');
        }
    }),
    delete: (req, res) => __awaiter(void 0, void 0, void 0, function* () { }),
    logout: (req, res) => __awaiter(void 0, void 0, void 0, function* () { }),
};
//# sourceMappingURL=authCtrl.js.map