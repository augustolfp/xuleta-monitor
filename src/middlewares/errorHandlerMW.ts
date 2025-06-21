import { NextFunction, Request, Response } from "express";
import { ApiError } from "../helpers/api-errors.js";

export default function errorHandlerMW(
  err: Error & Partial<ApiError>,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(err);
  const statusCode = err.statusCode ?? 500;
  const message = err.statusCode ? err.message : "Internal Server Error";
  res.status(statusCode).json({ message });
  return;
}
