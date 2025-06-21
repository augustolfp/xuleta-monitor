import { Request, Response } from "express";

export default async function triggerPicture(req: Request, res: Response) {
  res.status(201).send("Created");
}
