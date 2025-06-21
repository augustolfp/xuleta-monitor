import { NextFunction, Request, Response } from "express";
import { ApiError } from "../helpers/api-errors.js";
import axios from "axios";

export default async function errorHandlerMW(
  err: Error & Partial<ApiError>,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const payload = `\`\`\`json
  ${JSON.stringify(err, null, 4)}
  \`\`\``;

  const discordErrorsWebhookUrl = process.env.DISCORD_ERRORS_WEBHOOK_URL!;

  await axios.post(discordErrorsWebhookUrl, {
    content: payload,
  });

  const statusCode = err.statusCode ?? 500;
  const message = err.statusCode ? err.message : "Internal Server Error";
  res.status(statusCode).json({ message });
  return;
}
