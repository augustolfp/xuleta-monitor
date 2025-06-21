import { Router } from "express";
import triggerPicture from "../controllers/picturesController.js";

const picturesRouter = Router();

picturesRouter.post("/picture", triggerPicture);

export default picturesRouter;
