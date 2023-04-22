import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import { MONGO_URL, PORT } from "./config";
import router from "./routes";
import connectDb from "./utils/connectDb";
import errorLogger from "./middleware/errorLogger";
import deserializeUser from "./middleware/deserializeUser";
import requireUser from "./middleware/requireUser";

/** initialize application */
const app: Application = express();

/** initialize middlewares */
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(deserializeUser);
app.use(express.static("public"));

/** initialize routes */
app.use("/api", router);

/** healthcheck home route */
app.get("/", requireUser, (req: Request, res: Response) => {
  const user = res.locals.user;
  res
    .status(200)
    .json({ success: true, message: "This is home route...", user });
});

/** handle route not found */
app.use("/", (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ success: false, message: "Route not found." });
});

/** initialize errorLogger */
app.use(errorLogger);

app.listen(Number(PORT), () => {
  console.log(`server is running at : http://localhost:${PORT}`);
  connectDb(MONGO_URL);
});
