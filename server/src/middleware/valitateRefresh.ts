/* eslint-disable @typescript-eslint/ban-types */
import { Request, Response } from "express";
import { StatusCodes } from "../error_codes";

export function validateRefresh(req: Request, res: Response, next: Function) {
  console.log("validate reffresh");

  const { refreshToken } = req.cookies;
  if (!refreshToken) {
    return res.status(StatusCodes.Unauthorized).json({
      at: false,
      msg: "Not authenticated",
    });
  } else {
    console.log("validate nst");
    next();
  }
}
