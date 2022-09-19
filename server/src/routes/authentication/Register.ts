import { Router } from "express";
import { handelRegistration } from "../../controler/registration";
import { validateRegistration } from "../../middleware/validateRegistration";
const route = Router();
route.post("/api/registration", validateRegistration, handelRegistration);
console.log("\n\napi hit\n\n");

export default route;
