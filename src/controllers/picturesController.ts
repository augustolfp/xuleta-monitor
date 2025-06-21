import { Request, Response } from "express";
import { exec } from "child_process";
import shortid from "shortid";
import fs from "fs/promises";
import AWS from "aws-sdk";
import axios from "axios";

export default async function triggerPicture(req: Request, res: Response) {
  const pictureFilename = await takePicture();

  const s3BucketLocation = await uploadToS3(pictureFilename);

  const discordWebhookUrl = process.env.DISCORD_WEBHOOK_URL!;

  await axios.post(discordWebhookUrl, {
    content: "Update Xuleta",
    embeds: [
      {
        image: {
          url: s3BucketLocation,
        },
      },
    ],
  });

  await fs.unlink(`pictures/${pictureFilename}`);

  res.status(201).send(s3BucketLocation);
}

async function takePicture() {
  const baseCommand = process.env.TAKE_PICTURE_BASE_COMMAND!;

  const timestamp = unixTimestamp();
  const uid = shortid.generate();
  const pictureFilename = `${uid}_${timestamp}.jpg`;

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

function unixTimestamp() {
  return Math.floor(Date.now() / 1000);
}

async function uploadToS3(fileName: string) {
  AWS.config.update({
    region: "sa-east-1",
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  });

  const s3 = new AWS.S3();

  const pictureContent = await fs.readFile(`pictures/${fileName}`);

  const params = {
    Bucket: "xuletapictures",
    ContentType: "image/jpeg",
    Key: fileName,
    Body: pictureContent,
  };

  const result = await s3.upload(params).promise();

  return result.Location;
}
