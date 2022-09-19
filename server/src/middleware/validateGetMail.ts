/* eslint-disable @typescript-eslint/ban-types */
import { Request, Response } from "express";
import { StatusCodes } from "../error_codes";

export function validateGetEmail(
  req: Request,
  res: Response,
  next: Function
) {
  const { identity, goal, customaization } = req.body;
  if (!customaization || !goal || !identity) {
    return res
      .status(StatusCodes.BadRequest)
      .json({ msg: "Insufficient Data" });
  } else {
    next();
  }
}
