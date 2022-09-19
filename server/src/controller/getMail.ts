/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from "express";
import { StatusCodes } from "../error_codes";
import { UserModel } from "../model/userModel";
import mailList from "../api/fakeMails.json";
import { verifyToken } from "../utils/token";

export function handelGetMail(req: Request, res: Response) {
  const { customaization } = req.body;
  const { accessToken } = req.cookies;
  //@ts-ignore
  const { userLID } = verifyToken(accessToken);
  const incrementVersion = async () => {
    return await UserModel.findOneAndUpdate(
      //@ts-ignore
      { lid: userLID },
      { $inc: { usage: 1 } }
    );
  };
  incrementVersion();

  const type = customaization.type;
  let name = "";
  if (type == "linkedIn") {
    name = customaization.source.split("-")[0];
  }
  res.status(StatusCodes.Success).json({ mailList, name, type });
}
