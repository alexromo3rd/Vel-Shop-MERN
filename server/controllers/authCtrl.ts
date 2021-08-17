import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { UserInterface } from '../interfaces/user';
const User = require('../models/user');

declare module 'express-session' {
  interface Session {
    user: {
      _id: string;
      firstName: string;
      lastName: string;
      email: string;
    };
  }
}

module.exports = {
  register: async (req: Request, res: Response) => {
    const {
      firstName,
      lastName,
      email,
      hash: password,
    }: UserInterface = req.body;

    const foundUser = await User.findOne({ email: email });

    if (foundUser) {
      return res.status(404).send('User already exists');
    }

    const salt = bcrypt.genSaltSync(5);
    const hash = bcrypt.hashSync(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      hash,
    });

    newUser
      .save()
      .then((response: UserInterface) => {
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
  },
  login: async (req: Request, res: Response) => {
    const {
      firstName,
      lastName,
      email,
      hash: password,
    }: UserInterface = req.body;

    const foundUser = await User.findOne({ email: email });

    if (!foundUser) {
      return res.status(404).send('User does not exist');
    }
  },
  delete: async (req: Request, res: Response) => {},
  logout: async (req: Request, res: Response) => {},
};