import fs from "fs";
import AWS from "aws-sdk";
import formidable from "formidable";
import { read, utils } from "xlsx";

const COUNTRYCODE = 91;

function IsCountryCodePresent(number) {
  if (String(number).length > 10) {
    return true;
  }
  return false;
}

function addCountryCode(number) {
  if (!IsCountryCodePresent(number)) {
    return '+' + String(COUNTRYCODE) + number;
  }

  return '+' + String(number);
}

const region = "ap-south-1";
const bucketName = "telephony-bot";
const accessKeyId = process.env.LOCAL_AWS_ACCESS_KEY;
const secretAccessKey = process.env.LOCAL_AWS_SECRET_KEY;
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
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

      const workbook = read(data, { type: "buffer" });
      const jsonData = utils.sheet_to_json(
        workbook.Sheets[workbook.SheetNames[0]]
      );

      try {
        return s3Client.putObject(
          {
            Bucket: bucketName,
            Key: timestamp + files.audio.originalFilename,
            Body: fs.createReadStream(files.audio.filepath),
            ContentType: 'audio/mpeg'
          },
          async (err, data) => {
            jsonData.map((v) => {
              addCountryCode(Object.values(v)[0]).toString()
              client.calls.create({
                url: "https://telephony-bot.s3.ap-south-1.amazonaws.com/" + timestamp + files.audio.originalFilename,
                to: addCountryCode(Object.values(v)[0]).toString(),
                from: process.env.MOBILE_NUMBER,
                method: 'GET'
              }).then((call) => console.log(call.sid)).catch((error) => console.error(error))
            });
            res.status(201).send({ message: "ok!" });
          }
        );
      } catch (e) {
        console.log(e);
        res.status(500).send("Error uploading files");
      }
    });
  });
}
