import { Router } from "express";
import { emailScoreClculator } from "../../controler/EmailScore";
import { validateEmailScore } from "../../middleware/validateEmailScore";
const route = Router();
route.post("/api/emailScore", validateEmailScore, emailScoreClculator);
export default route;
