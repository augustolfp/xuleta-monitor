import "express-async-errors";
import express from "express";
import cors from "cors";

import router from "./routes/index.js";

const app = express();

app.use(express.json(), cors());
app.use(router);

export default app;
