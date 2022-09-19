/* eslint-disable @typescript-eslint/ban-types */
import { Request, Response } from "express";
import { StatusCodes } from "../error_codes";
import {verifyToken} from "../utils/token"
import {UserModel} from "../model/userModel"

export function validateUpgrade(req: Request, res: Response, next: Function) {
  const { accessToken, refreshToken } = req.cookies;
  //@ts-ignore
  const { userLID } = verifyToken(accessToken);
  const findUser = async (tid: any) => {
    // @ts-ignore
    const result = await UserModel.findOne({ lid: tid });
    return result;
  };
  findUser(userLID).then((e) => {
    console.log(e);

    if (e.usage != e.limit) {
      return res.status(StatusCodes.Accepted).json({
        msg: "You have not reached your monthly limit",
        code: 1002,
      });
    } else {
      next();
    }
  });
}
