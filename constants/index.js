const region = "ap-south-1";
const bucketName = "telephony-bot";
const accessKeyId = process.env.LOCAL_AWS_ACCESS_KEY;
const secretAccessKey = process.env.LOCAL_AWS_SECRET_KEY;
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const mobileNumber = process.env.MOBILE_NUMBER;
const CountryCode = 1;

export {
  region,
  bucketName,
  accessKeyId,
  secretAccessKey,
  accountSid,
  authToken,
  CountryCode,
  mobileNumber,
};
