import express from "express";

export function createExpressApp() {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  
  return app;
}