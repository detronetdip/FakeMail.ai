/* eslint-disable @typescript-eslint/ban-types */
import { Request, Response } from "express";
import { StatusCodes } from "../error_codes";

export function validateLogin(req: Request, res: Response, next: Function) {
  const { accessToken, refreshToken } = req.cookies;
  if (!accessToken && refreshToken) {
    return res.status(StatusCodes.Unauthorized).json({
      at: true,
      msg: "Not authenticated",
    });
  } else if (!accessToken && !refreshToken) {
    return res.status(StatusCodes.Unauthorized).json({
      at: false,
      msg: "Not authenticated",
    });
  } else {
    next();
  }
}
