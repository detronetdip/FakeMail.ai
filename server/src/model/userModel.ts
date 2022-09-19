import { Schema, model } from "mongoose";
const userSchema = new Schema({
  firstName: {
    type: String,
    unique: true,
  },
  lastName: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  lid: {
    type: String,
  },
  profileURL: {
    type: String,
  },
  tokenVersion: {
    type: Number,
    default: 0,
  },
  usage: {
    type: Number,
    default: 0,
  },
  limit: {
    type: Number,
    default: 15,
  },
  identities: [
    {
      cName: String,
      cWeb: String,
      desc: String
    },
  ],
});
const UserModel = model("user", userSchema);
export { UserModel };
