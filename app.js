
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { userRouter } from "./userRouter";

const app = express();

const handleHome = (req, res) => res.send("Hello From Home!");
const handleProfile = (req, res) => res.send("You From Profile!");

// Middleware 추가
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(helmet());
app.use(morgan("dev"));

// Router 설정
app.get("/", handleHome);
app.get("/profile", handleProfile);
app.use("/user", userRouter); 

export default app;