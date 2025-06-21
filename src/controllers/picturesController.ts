import { Request, Response } from "express";
import { exec } from "child_process";

export default async function triggerPicture(req: Request, res: Response) {
  const command = process.env.TAKE_PICTURE_COMMAND || "";

  const run = () => {
    return new Promise((resolve, reject) => {
      exec(command, (error, stdout, stderr) => {
        if (error) return resolve(error);
        if (stderr) return resolve(stderr);
        resolve(stdout);
      });
    });
  };

  const result = await run();

  res.status(201).send("Created");
}
