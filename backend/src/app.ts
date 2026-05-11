import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";


export function createExpressApp() {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(cors());

  app.use("/", (req, res, next) => {
    res.send("Hello World!");
  });


  return app;
}