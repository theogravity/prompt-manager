import http from "http";
import express from "express";
import { initApp } from "./app.js";

const app = express();
await initApp(app);

http.createServer(app).listen(3306, () => {
  console.log(`API server started on port ${3306}`);
});
