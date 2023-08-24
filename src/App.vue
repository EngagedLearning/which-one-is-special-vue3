<template>
  <main>
    <router-view @save-data="saveData"/>
  </main>
 
</template>

<script>
import { v4 as uuidv4 } from "uuid";

//import AWS from "aws-sdk";
import { PutObjectCommand, S3Client,S3 } from "@aws-sdk/client-s3";

import { fromCognitoIdentityPool  } from "@aws-sdk/credential-providers"; // ES6 import
//import { CognitoIdentityClient } from '@aws-sdk/client-cognito-identity';

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
    this.sessionStorage.setItem('session-id', uuidv4()); // store another one as a session-id
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
      // change any colons to _ since it is just a file name
      let d0 = d.replaceAll(':','_')
      let pre_post_type = "none";

      if (typeof problemData["problemData"][0] !== "undefined") {
        pre_post_type = problemData["problemData"][0]["type"];
      }

      var fName = "";
      // console.log("writeToS3 type " + type)
      if (type === "demographic") {
        fName =
          "/data/which_one_is_special_demographic_" +
          sess +
          "_user_" +
          user +
          "_date_" +
          d +
          ".json";
      } else if (type === "survey") {
        fName =
          "/data/which_one_is_special_survey_" +
          sess +
          "_user_" +
          user +
          "_date_" +
          d0 +
          ".json";
      }  else {
        // undefined type
        fName =
          "/data/which_one_is_special_activity_" +
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

      var s3BucketName = "enlearn-efplus-math-which-one-is-special-results";   
     
    /*  var s3 = new AWS.S3({
        apiVersion: "2006-03-01",
        params: { Bucket: s3BucketName },
      });*/
      // console.log("s3 " + JSON.stringify(s3))
      // try to write the data to the bucket
      var buf = Buffer.from(JSON.stringify(problemData));
      console.log('buf is ' + (buf));
      console.log('creating a command');
      var command = new PutObjectCommand({
        Bucket: s3BucketName,
        Key: fName,
        Body: buf,
        ContentEncoding: "base64",
        ContentType: "application/json"
      });
      // send the command and wait for a reply
      this.sendCommand(command,fName); 
    },
    async sendCommand(command,fName) {
      try {
        console.log('calling send command'); 
        console.log('Command is ' + (command)); 
        var s3BucketName = "enlearn-efplus-math-which-one-is-special-results/";
        var bucketRegion = "us-west-2";
        var IdentityPoolId = "us-west-2:77d2e523-774d-4782-a18b-90c1158a0906";
        // replaced by the code just below. 
        /*  AWS.config.update({
           region: bucketRegion,
           credentials: new AWS.CognitoIdentityCredentials({
             IdentityPoolId: IdentityPoolId,
           }),
         });*/
        
        var client_s3 = new S3Client({
            region:bucketRegion,
            credentials: fromCognitoIdentityPool({
              clientConfig: { region: bucketRegion },
              identityPoolId: IdentityPoolId,
            })
        });
        await client_s3.send(command)
        console.log('Successfully uploaded data to ' + s3BucketName + '/' + fName);
      } catch (err) {
        console.error(err, err.stack);
      }
    },
    postLogData: function (problemData, type) {
      console.log("problemData: " + JSON.stringify(problemData));
      console.log("postLogData type " + type);
      this.writeToS3(problemData, type);
    },
    saveData: function (problemData) {
      console.log('calling SaveData');
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
