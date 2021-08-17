import { Request, Response } from 'express';
import { UserInterface } from '../interfaces/user.interface';
const User = require('../models/user');

module.exports = {
  updateUser: async (req: Request, res: Response) => {
    const { id } = req.params;
    const { email = null, password = null } = req.body;

    if (!req.session.user) {
      return res.status(400).send('Not logged in.');
    }

    const foundUser = await User.findById(id);
    if (!foundUser) {
      return res.status(400).send('User not found');
    }

    if (req.session.user._id !== foundUser._id) {
      return res.status(401).send('Cannot modify other users');
    }
  },
  deleteUser: async (req: Request, res: Response) => {},
};
