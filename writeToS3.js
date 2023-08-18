
import AWS from "aws-sdk";

      // create a file name from the problem data
  let sess = problemData["sessionData"]["session-id"];
  let user = problemData["sessionData"]["user_id"];
  let d = new Date(Date.now()).toISOString();
  let pre_post_type = "none";

  if (typeof problemData["problemData"][0] !== "undefined") {
      pre_post_type = problemData["problemData"][0]["type"];
  }
  let fName = "";
      // console.log("writeToS3 type " + type)
  if (data_type === "demographic") {
    fName =
      "data/which_one_is_special_demographic_" +
      sess +
      "_user_" +
      user +
      "_date_" +
      d +
      ".json";
  } else if (data_type === "survey") {
    fName =
      "data/which_one_is_special_survey_" +
      sess +
      "_user_" +
      user +
      "_date_" +
      d +
      ".json";
  } else if (pre_post_type === "pre") {
    fName =
      "data/which_one_is_special_pre_test_" +
      sess +
      "_user_" +
      user +
      "_date_" +
      d +
      ".json";
  } else if (pre_post_type === "post") {
    fName =
      "data/which_one_is_special_post_test_" +
      sess +
      "_user_" +
      user +
      "_date_" +
      d +
      ".json";
  } else {
    // undefined type
    fName =
      "data/which_one_is_special_activity_" +
      sess +
      "_user_" +
      user +
      "_date_" +
      d +
      ".json";
  }
  console.log("fname " + fName);
  console.log("s3 problemdata:" + JSON.stringify(problemData)); // to reference data at least once.

      // Since these Idenity pool users only have read/write permission on a single bucket
      // I am going to leave this id in the code since it is not much of a security risk.

  var s3BucketName = "enlearn-efplus-math-which-one-is-special-results/";
  var bucketRegion = "us-west-2";
  var IdentityPoolId = "us-west-2:77d2e523-774d-4782-a18b-90c1158a0906";

  AWS.config.update({
    region: bucketRegion,
    credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: IdentityPoolId,
    }),
  });
  var s3 = new AWS.S3({
    apiVersion: "2006-03-01",
    params: { Bucket: s3BucketName },
  });
      // console.log("s3 " + JSON.stringify(s3))
      // try to write the data to the bucket
  var buf = Buffer.from(JSON.stringify(problemData));
  var data = {
      Bucket: s3BucketName,
      Key: fName,
      Body: buf,
      ContentEncoding: "base64",
      ContentType: "application/json",
      };
  // S3 ManagedUpload with callbacks are not supported in AWS SDK for JavaScript (v3).
  // Please convert to 'await client.upload(params, options).promise()', and re-run aws-sdk-js-codemod.
  // S3 ManagedUpload with callbacks are not supported in AWS SDK for JavaScript (v3).
  // Please convert to 'await client.upload(params, options).promise()', and re-run aws-sdk-js-codemod.
  // S3 ManagedUpload with callbacks are not supported in AWS SDK for JavaScript (v3).
  // Please convert to 'await client.upload(params, options).promise()', and re-run aws-sdk-js-codemod.
  // S3 ManagedUpload with callbacks are not supported in AWS SDK for JavaScript (v3).
  // Please convert to 'await client.upload(params, options).promise()', and re-run aws-sdk-js-codemod.
  // S3 ManagedUpload with callbacks are not supported in AWS SDK for JavaScript (v3).
  // Please convert to 'await client.upload(params, options).promise()', and re-run aws-sdk-js-codemod.
  s3.upload(data, function (err, data) {
    if (err) {
      console.log(err);
      console.log("Error uploading data: ", data);
    } else {
      console.log("succesfully uploaded!!!");
    }
  });