import { Router, Request, Response } from "express";
const route = Router();
route.get("/", mid1, mid2, (req: Request, res: Response) => {
  res.send("working");
});
function mid1(req, res, n) {
  console.log("1 called.");
  n();
}
function mid2(req, res, n) {
  console.log("2 called.");
  n();
}
export default route;
