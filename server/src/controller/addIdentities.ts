/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from "express";
import { StatusCodes } from "../error_codes";
import { UserModel } from "../model/userModel";
import mailList from "../api/fakeMails.json";
import { verifyToken } from "../utils/token";

export async function addIdentites(req: Request, res: Response) {
  const { cn, cw, d, id } = req.body;

  const user = await UserModel.findOneAndUpdate(
    {
      _id: id,
    },
    {
      $push: {
        identities: {
          cName: cn,
          cWeb: cw,
          desc: d,
        },
      },
    },
    { returnOriginal: false }
  );
  res.status(StatusCodes.Success).json({
    identites:user.identities,
  });
}
