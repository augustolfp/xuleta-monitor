import "express-async-errors";
import express from "express";
import cors from "cors";
import errorHandlerMW from "./middlewares/errorHandlerMW.js";
import cron from "node-cron";
import axios from "axios";
import os from "os";

import router from "./routes/index.js";

const app = express();

cron.schedule("*/5 * * * *", () => {
  //   console.log("running a task every minute");
  axios.post("http://localhost:3000/picture");
});

cron.schedule("* * * * *", () => {
  const systemUptimeInSeconds = os.uptime();

  const hours = Math.floor(systemUptimeInSeconds / 3600);
  const minutes = Math.floor((systemUptimeInSeconds % 3600) / 60);
  const seconds = Math.floor(systemUptimeInSeconds % 60);

  console.log(`System uptime: ${hours} hours, ${minutes} minutes, ${seconds} seconds`);
});

app.use(express.json(), cors());
app.use(router);
app.use(errorHandlerMW);

export default app;
