import "express-async-errors";
import express from "express";
import cors from "cors";
import errorHandlerMW from "./middlewares/errorHandlerMW.js";

import router from "./routes/index.js";

const app = express();

app.use(express.json(), cors());
app.use(router);
app.use(errorHandlerMW);

export default app;
