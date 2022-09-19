/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from "express";
import { StatusCodes } from "../error_codes";
import { UpgradeRequstModel } from "../model/UpgradeRequest";
import {verifyToken} from "../utils/token"

export function upgradeLimit(req: Request, res: Response) {
  const { accessToken } = req.cookies;
  //@ts-ignore
  const { userId } = verifyToken(accessToken);
  const findUser = async (tid: any) => {
    // @ts-ignore
    const result = await UpgradeRequstModel.findOne({ userId: tid });
    return result;
  };
  findUser(userId).then((e) => {
    if (e) {
      res.status(StatusCodes.Accepted).json({
        msg: "You have a pending upgrade request",
        code: 1003,
      });
    } else {
      const request = new UpgradeRequstModel({
        userId: userId,
        isRequested: true,
      });
      const save = async () => {
        await request.save();
      };
      save();
      res.status(StatusCodes.Success).json({
        msg: "Requested successfully",
        code: 1004,
      });
    }
  });
}
