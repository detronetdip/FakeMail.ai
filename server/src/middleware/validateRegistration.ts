/* eslint-disable @typescript-eslint/ban-types */
import { Request, Response } from "express";
import { StatusCodes } from "../error_codes";
import { getUserData } from "../utils/User";

export async function validateRegistration(
  req: Request,
  res: Response,
  next: Function
) {
  const { code } = req.body;

  if (code === undefined) {
    return res
      .status(StatusCodes.BadRequest)
      .json({ msg: "Insufficient Data" });
  } else {
    try {
      await getUserData(code).then((user) => {
        // @ts-ignore
        req.user = user;
        if (user != undefined) {
          next();
        }
      });
    } catch (error) {
      console.log(error, code);
    }
  }
}
