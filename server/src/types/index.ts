import { ObjectId } from "mongoose";

export interface UserDataFromLinkedIn {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  profileURL: string;
}
export interface UserObject {
  firstName: string;
  lastName: string;
  email: string;
  lid: string;
  profileURL: string;
  tokenVersion: number;
  id: string;
  __v: number;
}
export interface UserDataToSign {
  userId: string;
  UserName: string;
  userLID: string;
  email: string;
  v?: number;
}
