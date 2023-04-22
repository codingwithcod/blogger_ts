import mongoose, { Document, Schema } from "mongoose";

export interface IBaseUser {
  name: string;
  email: string;
  sub: string;
  picture: string;
}

export interface IUserSchema extends IBaseUser, Document {}

const userSchema = new Schema<IUserSchema>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    sub: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model<IUserSchema>("user", userSchema);

export default userModel;
