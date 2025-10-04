import "express-async-errors";
import express from "express";
import cors from "cors";
import errorHandlerMW from "./middlewares/errorHandlerMW.js";
import cron from "node-cron";
import axios from "axios";
import os from "os";
import { exec } from 'node:child_process';

import router from "./routes/index.js";

const app = express();

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

cron.schedule("*/5 * * * *", async () => {
  const turnOffLightsCommand = "pinctrl set 27 op dl";
  const turnOnLightsCommand = "pinctrl set 27 op dh";

  await new Promise((resolve, reject) => {
    exec(turnOnLightsCommand, (error, stdout, stderr) => {
      if (error) return resolve(error);
      if (stderr) return resolve(stderr);
      resolve(stdout);
    });
  });

  await sleep(3000);

  await axios.post("http://localhost:3000/picture");

  await sleep(2000);

  await new Promise((resolve, reject) => {
    exec(turnOffLightsCommand, (error, stdout, stderr) => {
      if (error) return resolve(error);
      if (stderr) return resolve(stderr);
      resolve(stdout);
    });
  });
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
