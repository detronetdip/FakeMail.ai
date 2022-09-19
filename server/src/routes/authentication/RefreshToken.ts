import { Router } from "express";
import { handelRefresh } from "../../controler/Refresh";
import { validateRefresh } from "../../middleware/valitateRefresh";
const route = Router();
route.post("/api/refresh", validateRefresh, handelRefresh);
export default route;
