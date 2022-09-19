import { Router } from "express";
import { upgradeLimit } from "../../controler/Upgrade";
import { authentication } from "../../middleware/authentication";
import { validateUpgrade } from "../../middleware/validateUpgrade";
const route = Router();
route.get("/api/upgradeLimit", authentication, validateUpgrade,upgradeLimit);
export default route;
