import { Request, Response } from "express";
import { exec } from "child_process";
import shortid from "shortid";

export default async function triggerPicture(req: Request, res: Response) {
  const pictureFilename = await takePicture();

  res.status(201).send(pictureFilename);
}

async function takePicture() {
  const baseCommand = process.env.TAKE_PICTURE_BASE_COMMAND!;

  const uid = shortid.generate();
  const pictureFilename = `${uid}.jpg`;

  const fullCommand = `${baseCommand} ${pictureFilename}`;

  const result = await new Promise((resolve, reject) => {
    exec(fullCommand, (error, stdout, stderr) => {
      if (error) return resolve(error);
      if (stderr) return resolve(stderr);
      resolve(stdout);
    });
  });

  return pictureFilename;
}
