import * as dotEnv from "dotenv";
dotEnv.config({
  path: "./src/.env/.env",
});
import cors from "cors";
import express from "express";
import Database_Connection from "./config/DB";
import cookie from "cookie-parser";
import registration from "./routes/authentication/Register";
import login from "./routes/authentication/Login";
import refresh from "./routes/authentication/RefreshToken";
import emailScore from "./routes/resource/EmailScore";
import generateEmail from "./routes/resource/GenerateDummyEmail";
import upgradeLimit from "./routes/resource/Upgrade";
import addIdentities from "./routes/resource/Addidentity";
import defaultPath from "./routes/Default"
import corsOption from "./config/cors";

Database_Connection;
const app = express();
const port = 3000;
app.use(cors(corsOption));
app.use(cookie());
app.use(express.json());
app.use(registration);
app.use(login);
app.use(refresh);
app.use(emailScore);
app.use(generateEmail);
app.use(defaultPath);
app.use(upgradeLimit);
app.use(addIdentities);

app.listen(port, () => {
  return console.log(`Server is listening at http://localhost:${port}`);
});
