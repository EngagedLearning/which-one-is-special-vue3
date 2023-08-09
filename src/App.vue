<template>
  <main>
    <router-view/>
  </main>
 
</template>

<script>
import { v4 as uuidv4 } from "uuid";

//import S3 from "@aws-sdk/client-s3";

export default {
  name: 'App',
  components: {},
  data: function () {
    return {
      // experiment data for Which One Is Special.
      savedData: {
        sessionData: {},
        problemData: [],
        sessionStorage:{},
      },
    };
  },
  beforeCreate: function () {
    this.sessionStorage = window.sessionStorage; 
    this.sessionStorage.setItem('user_id', uuidv4());
  // this.$session.start();
  //  this.$session.set("user_id", uuidv4());
  },
  mounted() { },
  methods: {
    writeToS3: function (problemData, type) {
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
      if (type === "demographic") {
        fName =
          "data/which_one_is_special_demographic_" +
          sess +
          "_user_" +
          user +
          "_date_" +
          d +
          ".json";
      } else if (type === "survey") {
        fName =
          "data/which_one_is_special_survey_" +
          sess +
          "_user_" +
          user +
          "_date_" +
          d +
          ".json";
      }  else {
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

   /*  var s3config = S3.config.update({
        region: bucketRegion,
        credentials: new S3.CognitoIdentityCredentials({
          IdentityPoolId: IdentityPoolId,
        }),
      });*
      var s3 = new S3({
        apiVersion: "2006-03-01",
        params: { Bucket: s3BucketName },
      });*/
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
     // s3.
      /*s3.upload(data, function (err, data) {
        if (err) {
          console.log(err);
          console.log("Error uploading data: ", data);
        } else {
          console.log("succesfully uploaded!!!");
        }
      });*/
    },
    postLogData: function (problemData, type) {
      console.log("problemData: " + JSON.stringify(problemData));
      console.log("postLogData type " + type);
      this.writeToS3(problemData, type);
    },
    saveData: function (problemData) {
      console.log("problemData type flag " + problemData.type);
      this.savedData.problemData = problemData;
      this.savedData.sessionData = {}; // adding session data to the log.
      Object.keys(this.sessionStorage).forEach((key) => {
        this.savedData.sessionData[key] = this.sessionStorage.getItem(key);
      });
      console.log("saved Data");
      console.log(JSON.stringify(this.savedData));
      console.log("type " + problemData.type);
      console.log("posting data to s3");
      this.postLogData(this.savedData, problemData.type);
    },
  },
};


</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 30px;
}
</style>
