import { UserDataToSign } from "../types";
import jwt from "jsonwebtoken";
import { getPrivateKey, getPublicKey } from "./key";

function signToken(userDetails: UserDataToSign, age: number): string {
  const token = jwt.sign(userDetails, getPrivateKey(), {
    algorithm: "RS256",
    expiresIn: age,
  });
  return token;
}
export function verifyToken(token: string): string | undefined | object {
  try {
   return  jwt.verify(token, getPublicKey(), function (err, decoded) {
      return decoded;
    });
  } catch (error) {
    return undefined;
  }
}
export function generateAccessToken(userDetails: UserDataToSign): string {
  return signToken(userDetails, 600);
}
export function generateRefreshToken(userDetails: UserDataToSign): string {
  return signToken(userDetails, 604800);
}
