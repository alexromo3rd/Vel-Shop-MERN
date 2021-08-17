import { Schema, model } from 'mongoose';
import { UserInterface } from '../interfaces/user';

const UserSchema = new Schema<UserInterface>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  hash: { type: String, required: true },
});

const User = model<UserInterface>('User', UserSchema);

module.exports = User;
