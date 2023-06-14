import fs from "fs";
import AWS from "aws-sdk";
import formidable from "formidable";

import {
  accountSid,
  accessKeyId,
  authToken,
  bucketName,
  region,
  secretAccessKey,
  CountryCode,
} from "@constants";
import { addCountryCode, getJsonData } from "@utils";

const client = require("twilio")(accountSid, authToken);

const s3Client = new AWS.S3({
  region,
  credentials: { accessKeyId, secretAccessKey },
  signatureVersion: "v4",
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const form = formidable();
  const timestamp = Date.now().toString();

  form.parse(req, async (err, fields, files) => {
    fs.readFile(files.excel.filepath, (error, data) => {
      if (error) {
        res.status(500).json({ error: "Failed to read the file." });
        return;
      }

      console.log("Reading File...");

      const jsonData = getJsonData(data);

      console.log("Read file complete...");

      const uploadParams = {
        Bucket: bucketName,
        Key: timestamp + files.audio.originalFilename,
        Body: fs.createReadStream(files.audio.filepath),
        ContentType: "audio/mpeg",
      };

      console.log("Uploading File...");

      return new Promise((resolve, object) => {
        s3Client
          .putObject(uploadParams)
          .promise()
          .then(async (_) => {
            console.log("Sending callsss...");
            jsonData.map(async (v) => {
              console.log(
                "Sending Call to " +
                  addCountryCode(CountryCode, Object.values(v)[0]).toString()
              );

              try {
                await client.calls.create({
                  url:
                    "https://telephony-bot.s3.ap-south-1.amazonaws.com/" +
                    timestamp +
                    files.audio.originalFilename,
                  to: addCountryCode(
                    CountryCode,
                    Object.values(v)[0]
                  ).toString(),
                  from: process.env.MOBILE_NUMBER,
                  method: "GET",
                });
              } catch (error) {
                console.log(error);
              }
              res.status(201).json({ message: "Done!" });
              resolve();
            });
          })
          .catch((error) => {
            console.error("error uploading files: ", error);
            res.sendStatus(500);
            resolve();
          })
          .finally("Done!");
      });
    });
  });
}
