/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from "express";
import cookieOption from "../config/Cookie";
import { StatusCodes } from "../error_codes";
import { UserModel } from "../model/userModel";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
} from "../utils/token";

export function handelRefresh(req: Request, res: Response) {
  const { refreshToken } = req.cookies;
  const token = verifyToken(refreshToken);
  // console.log(token);

  if (!token) {
    res.status(StatusCodes.Unauthorized).json({
      msg: "No access granted",
    });
  } else {
    const findUser = async () => {
      // @ts-ignore
      const result = await UserModel.findOne({ email: token?.email });
      return result;
    };
    findUser().then((_user) => {
      let userId = _user.id;
      let UserName = _user.firstName + " " + _user.lastName;
      let userLID = _user.lid;
      let email = _user.email;
      let v = _user.tokenVersion;
      //@ts-ignore
      if (v !== token.v) {
        res.status(StatusCodes.Success).json({
          msg: "Hacker detected",
          code: 457,
        });
      } else {
        const accessToken = generateAccessToken({
          userId,
          userLID,
          UserName,
          email,
        });
        const incrementVersion = async () => {
          return await UserModel.findOneAndUpdate(
            //@ts-ignore
            { email: token?.email },
            { $inc: { tokenVersion: 1 } },
            { returnOriginal: false }
          );
        };
        incrementVersion().then((e) => {
          console.log(e);
          const refreshToken = generateRefreshToken({
            userId,
            userLID,
            UserName,
            email,
            //@ts-ignore
            v: e.tokenVersion,
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
            msg: "token regenerated successfully",
            code: 456,
          });
        });
      }
    });
  }
}
