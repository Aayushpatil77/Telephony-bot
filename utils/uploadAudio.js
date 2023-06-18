import AWS from "aws-sdk";
import { accessKeyId, region, secretAccessKey } from "@constants";

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

export default function uploadAudio(bucketName, filename, readStream) {
  const uploadParams = {
    Bucket: bucketName,
    Key: filename,
    Body: readStream,
    ContentType: "audio/mpeg",
  };
  return s3Client.putObject(uploadParams).promise();
}
