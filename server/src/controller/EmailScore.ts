/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { json, Request, Response } from "express";
import { StatusCodes } from "../error_codes";
import emailScore from "../api/emailScore.json";

export function emailScoreClculator(req: Request, res: Response) {
  res.send(emailScore);
}
