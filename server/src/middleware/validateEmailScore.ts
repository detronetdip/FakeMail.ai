/* eslint-disable @typescript-eslint/ban-types */
import { Request, Response } from "express";
import { StatusCodes } from "../error_codes";

export function validateEmailScore(req: Request, res: Response, next: Function) {
  const { email } = req.body;
  console.log(req.body);
  
  if (!email) {
    return res
      .status(StatusCodes.BadRequest)
      .json({ msg: "Insufficient Data" });
  } else {
    next();
  }
}
