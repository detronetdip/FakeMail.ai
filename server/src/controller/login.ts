/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from "express";
import { UserModel } from "../model/userModel";
import { StatusCodes } from "../error_codes";
import { verifyToken } from "../utils/token";

export function handelLogin(req: Request, res: Response) {
  const { accessToken } = req.cookies;
  const token = verifyToken(accessToken);
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
    findUser().then((e) => {
      res.status(StatusCodes.Success).json({
        isLoggedIn: true,
        user: {
          id: e.id,
          firstName: e.firstName,
          lastName: e.lastName,
          email: e.email,
          lid: e.lid,
          profileURL: e.profileURL,
          usage: e.usage,
          limit: e.limit,
        },
      });
    });
  }
}
