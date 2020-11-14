import * as express from "express";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as morgan from "morgan";
import * as helmet from "helmet";
import db from "./db";
import router from "./router";

const app = express();

app.set("db", db);
app.set("view engine", "ejs");

app.use(helmet());
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(router);

export default app;
