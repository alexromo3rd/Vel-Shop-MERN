import { Schema, model } from 'mongoose';

interface User {
  name: string;
  email: string;
  hash: string;
}

const UserSchema = new Schema<User>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  hash: { type: String, required: true },
});

const UserModel = model<User>('User', UserSchema);

export default UserModel;
