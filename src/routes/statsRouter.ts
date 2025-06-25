import { Router } from "express";
import sendStatistics from "../controllers/statsController.js";

const statisticsRouter = Router();

statisticsRouter.post("/statistics", sendStatistics);

export default statisticsRouter;
