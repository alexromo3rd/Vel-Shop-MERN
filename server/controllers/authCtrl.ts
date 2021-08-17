import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { UserInterface } from '../interfaces/user.interface';
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

    const salt = await bcrypt.genSalt(5);
    const hash = await bcrypt.hash(password, salt);

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

        return res.status(201).send(req.session.user);
      })
      .catch((err) => {
        return res.status(400).send('Unable to create user');
      });
  },
  login: async (req: Request, res: Response) => {
    const { email, hash: password } = req.body;
    const foundUser: UserInterface = await User.findOne({ email: email });

    if (!foundUser) {
      return res.status(404).send('User does not exist');
    }

    const passwordsMatch = await bcrypt.compare(password, foundUser.hash);

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
  },
  logout: async (req: Request, res: Response) => {
    if (!req.session.user) {
      return res.status(400).send('Not logged in.');
    }

    req.session.destroy(() => {
      return res.status(200).send('Successfully logged out');
    });
  },
};
