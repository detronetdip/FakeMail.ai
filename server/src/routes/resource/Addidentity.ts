import { Router } from "express";
import { addIdentites } from "../../controler/addIdentities";
import { getAllIdentites } from "../../controler/getAllIdentites";
const route = Router();
route.post("/api/addIdentity", addIdentites);
route.post("/api/getIdentites", getAllIdentites);
export default route;
