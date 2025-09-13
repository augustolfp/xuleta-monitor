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

cron.schedule("* * * * *", async () => {
  const systemUptimeInSeconds = os.uptime();

  const hours = Math.floor(systemUptimeInSeconds / 3600);
  const minutes = Math.floor((systemUptimeInSeconds % 3600) / 60);
  const seconds = Math.floor(systemUptimeInSeconds % 60);

  const payload = `System uptime: ${hours} hours, ${minutes} minutes, ${seconds} seconds`;

  // console.log(payload);

  try {
    const url = "https://discord.com/api/webhooks/1416458094073876662/_JtJiSNGnfbeS3AlGyu9iv1iCzIXrldFIjMfj3lWNS-NXmHLeWcSEnG1ErnD4ONHGkkA";
    await axios.post(url, {
      content: payload
    });
  } catch (error: any) {
    console.log(error)
  }
});

app.use(express.json(), cors());
app.use(router);
app.use(errorHandlerMW);

export default app;
