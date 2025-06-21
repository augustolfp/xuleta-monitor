import { Router } from "express";
import picturesRouter from "./picturesRouter.js";

const router = Router();

router.use(picturesRouter);

export default router;
