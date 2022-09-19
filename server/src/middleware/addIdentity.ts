/* eslint-disable @typescript-eslint/ban-types */
import { Request, Response } from "express";
import { StatusCodes } from "../error_codes";
import { verifyToken } from "../utils/token";
import { UserModel } from "../model/userModel";

export async function checkIdentity(
  req: Request,
  res: Response,
  next: Function
) {
  const { cName, cWeb, Desc } = req.body;
  
}
