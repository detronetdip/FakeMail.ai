/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from "express";
import { UserModel } from "../model/userModel";
import bcrypt from "bcryptjs";
import { StatusCodes } from "../error_codes";
import { UserDataFromLinkedIn, UserObject } from "../types";
import { generateAccessToken, generateRefreshToken } from "../utils/token";
import cookieOption from "../config/Cookie";

export async function handelRegistration(req: Request, res: Response) {
  // @ts-ignore
  const user: UserDataFromLinkedIn = req.user;
  console.log(user);

  const addUser = async () => {
    const USER = new UserModel({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      profileURL: user.profileURL,
      lid: user.id,
    });
    await USER.save()
      //@ts-ignore
      .then((_e: UserObject) => {
        let userId = _e.id;
        let UserName = _e.firstName + " " + _e.lastName;
        let userLID = _e.lid;
        let email = _e.email;
        let v = _e.tokenVersion;
        const accessToken = generateAccessToken({
          userId,
          userLID,
          UserName,
          email,
        });
        const refreshToken = generateRefreshToken({
          userId,
          userLID,
          UserName,
          email,
          v,
        });
        res.cookie("accessToken", accessToken, {
          ...cookieOption,
          maxAge: 600 * 1000,
        });
        res.cookie("refreshToken", refreshToken, {
          ...cookieOption,
          maxAge: 604800 * 1000,
        });
        res.status(StatusCodes.Success).json({
          msg: "account created successfully",
          code: 450,
        });
      });
  };
  const findUser = async () => {
    const result = await UserModel.findOne({ lid: user.id });
    return result;
  };
  try {
    findUser().then((_user) => {
      if (!_user) {
        addUser();
      } else {
        let userId = _user.id;
        let UserName = _user.firstName + " " + _user.lastName;
        let userLID = _user.lid;
        let email = _user.email;
        let v = _user.tokenVersion;
        const accessToken = generateAccessToken({
          userId,
          userLID,
          UserName,
          email,
        });
        const refreshToken = generateRefreshToken({
          userId,
          userLID,
          UserName,
          email,
          v,
        });
        res.cookie("accessToken", accessToken, {
          ...cookieOption,
          maxAge: 600 * 1000,
        });
        res.cookie("refreshToken", refreshToken, {
          ...cookieOption,
          maxAge: 604800 * 1000,
        });
        res.status(StatusCodes.Success).json({
          msg: "token generated successfully",
          code: 456,
        });
      }
    });
  } catch (error) {
    res.status(StatusCodes.BadRequest).json({
      msg: "Duplicate Entry detected",
    });
  }
}
