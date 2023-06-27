import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

import userRoute from "./src/routes/userRoute.js";
import todoRoute from "./src/routes/todoRoutes.js";

app.use(cookieParser());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/user", userRoute);
app.use("/todo", todoRoute);

app.listen(process.env.PORT, () => {
  console.log(`server created at PORT:${process.env.PORT}`);
  mongoose
    .connect(process.env.URL)
    .then(() => {
      console.log("connceted to databse");
    })
    .catch((err) => {
      console.log(err);
    });
});
