import { Router } from "express";
import { handelGetMail } from "../../controler/getMail";
import { authentication } from "../../middleware/authentication";
import { validateGetEmail } from "../../middleware/validateGetMail";
import { checkLimit } from "../../middleware/checkLimit";
const route = Router();
route.post("/api/genereteMail",validateGetEmail,authentication,checkLimit,handelGetMail);
export default route;
