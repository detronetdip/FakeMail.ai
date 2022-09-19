/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from "express";
import { StatusCodes } from "../error_codes";
import { UserModel } from "../model/userModel";

export async function getAllIdentites(req: Request, res: Response) {
  const { id } = req.body;

  const user = await UserModel.findOne({
    _id: id,
  }).select({
    identities: 1,
  });
  res.status(StatusCodes.Success).json({
    identites: user,
  });
}
