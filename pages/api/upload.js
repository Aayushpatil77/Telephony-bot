import {
  accountSid,
  authToken,
  CountryCode,
  bucketName,
  mobileNumber,
} from "@constants";
import { addCountryCode, getJsonData, uploadAudio } from "@utils";

import formidable from "formidable";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false,
  },
};

const client = require("twilio")(accountSid, authToken);

export default async function handler(req, res) {
  const form = formidable();
  const timestamp = Date.now().toString();
  let jsonData = [];
  let txtData;

  // Parsing the form to get all the required data
  form.parse(req, async (err, fields, files) => {
    // Excel file
    jsonData = getJsonData(fs.readFileSync(files.excel.filepath));

    // Text file
    txtData = fs.readFileSync(files.text.filepath, "utf-8");

    // upload audio file to s3
    await uploadAudio(
      bucketName,
      timestamp + files.audio.originalFilename,
      fs.createReadStream(files.audio.filepath)
    );

    // send messages
    Promise.all(
      jsonData.map((number) => {
        console.log(
          "Messaging: " +
            addCountryCode(CountryCode, Object.values(number)[0]).toString()
        );
        client.messages.create({
          body: String(txtData),
          from: mobileNumber,
          to: addCountryCode(CountryCode, Object.values(number)[0]).toString(),
        }).catch(error => console.error(error));
      })
    )
      .then((messages) => {
        console.log("All Messages sent!");
      })
      .catch((err) => console.error(err));

    // send calls
    Promise.all(
      jsonData.map((number) => {
        console.log(
          "Calling: " +
            addCountryCode(CountryCode, Object.values(number)[0]).toString()
        );
        client.calls.create({
          url:
            "https://telephony-bot.s3.ap-south-1.amazonaws.com/" +
            timestamp +
            files.audio.originalFilename,
          to: addCountryCode(CountryCode, Object.values(number)[0]).toString(),
          from: mobileNumber,
          method: "GET",
        }).catch(error => console.error(error));
      })
    )
      .then((calls) => {
        console.log("All Calls sent!");
      })
      .catch((err) => console.error(err));

    res.status(201).json({ message: "" });
  });
}
