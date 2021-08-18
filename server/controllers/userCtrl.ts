import { Request, Response } from 'express';
import { UserInterface } from '../interfaces/user.interface';
import bcrypt from 'bcrypt';
const User = require('../models/user');

module.exports = {
  updateUser: async (req: Request, res: Response) => {
    const { id } = req.params;
    const {
      email = null,
      hash: password = null,
    }: { email: string | null; hash: string | null } = req.body;

    const foundUser = await User.findById(id);
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
        const updatedUser = await foundUser.set('email', email);

        await updatedUser.save().then((response: UserInterface) => {
          req.session.user = {
            _id: response._id,
            firstName: response.firstName,
            lastName: response.lastName,
            email: response.email,
          };
        });

        console.log(req.session.user);

        return res.status(202).send(req.session.user);
      } else {
        return res.status(406).send('Email matches current email');
      }
    }

    // only password provided
    if (password && !email) {
      const passwordsMatch = await bcrypt.compare(password, foundUser.hash);
      if (!passwordsMatch) {
        const salt = await bcrypt.genSalt(5);
        const hash = await bcrypt.hash(password, salt);
        const updatedUser = await foundUser.set('hash', hash);

        await updatedUser.save().then((response: UserInterface) => {
          req.session.user = {
            _id: response._id,
            firstName: response.firstName,
            lastName: response.lastName,
            email: response.email,
          };
        });

        return res.status(202).send(req.session.user);
      } else {
        return res.status(406).send('Password matches current password');
      }
    }

    // if email and password provided
    if (password && email) {
      const passwordsMatch = await bcrypt.compare(password, foundUser.hash);
      if (!passwordsMatch && email !== foundUser.email) {
        const salt = await bcrypt.genSalt(5);
        const hash = await bcrypt.hash(password, salt);
        const updatedUser = await User.findOneAndUpdate(
          { _id: foundUser._id },
          { email: email, hash: hash },
          { new: true }
        );

        await updatedUser.save().then((response: UserInterface) => {
          req.session.user = {
            _id: response._id,
            firstName: response.firstName,
            lastName: response.lastName,
            email: response.email,
          };
        });

        return res.status(202).send(req.session.user);
      } else {
        return res.status(406).send('Email/Password matches current password');
      }
    }
  },
  deleteUser: async (req: Request, res: Response) => {
    const { id } = req.params;

    const foundUser = await User.findById(id);
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
      await foundUser.remove();

      req.session.destroy((err) => {
        if (err) {
          console.log(err);
        }
      });

      return res.status(200).send('Successfully deleted account');
    } else {
      return res.status(400).send('User does not match');
    }
    return res.status(400).send('Unable to delete account');
  },
};
