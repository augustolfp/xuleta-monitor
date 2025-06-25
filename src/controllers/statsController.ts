import { Request, Response } from "express";
import axios from "axios";
import os from "os";

export default async function sendStatistics(req: Request, res: Response) {
  res.status(201).send("Success");
}
