import { Router } from "express";
import picturesRouter from "./picturesRouter.js";
import statisticsRouter from "./statsRouter.js";

const router = Router();

router.use(picturesRouter);
router.use(statisticsRouter);

export default router;
