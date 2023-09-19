<template>
  <main>
    <router-view :key="$route.path" @save-data="saveData"/>
  </main>
 
</template>

<script>
import { v4 as uuidv4 } from "uuid";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { fromCognitoIdentityPool  } from "@aws-sdk/credential-providers"; // ES6 import



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
  /*
   Things to do before the page is populated. 
   Create a UserID, a SessionId and a start-time for the session.
  */
  beforeCreate: function () {
    this.sessionStorage = window.sessionStorage; 
    this.sessionStorage.setItem('user_id', uuidv4());
    this.sessionStorage.setItem('session-id', uuidv4()); // store another one as a session-id
    this.sessionStorage.setItem('start-time', Date.now());
  },
  mounted() { },
  methods: {
    /*
      Write the data to AWS S3 using version 3 of the api.
      Data includes both session and user ids along with a
      json array of the data from the various pages including
      the demographic page, the actual activity page and the survey page.
    */
   writeToS3: function (problemData, type) {
      // create a file name from the problem data
      let sess = problemData["sessionData"]["session-id"];
      let user = problemData["sessionData"]["user_id"];
      let d = new Date(Date.now()).toISOString();
      // change any colons in the date to _ since it is just a file name
      let d0 = d.replaceAll(':', '_');
      
      var fName = "/data/which_one_is_special_"; // file name is based upon the type of data, the date and the user id
      if (type === "demographic") {
        fName = fName + 
          "demographic_" +
          sess +
          "_user_" +
          user +
          "_date_" +
          d +
          ".json";
      } else if (type === "survey") {
        fName = fName + 
          "survey_" +
          sess +
          "_user_" +
          user +
          "_date_" +
          d0 +
          ".json";
      }  else {
        // undefined type
        fName = fName + 
          "activity_" +
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
     
      // try to write the data to the bucket
      var buf = Buffer.from(JSON.stringify(problemData));
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
    /*
      Method to send command to AWS S3 via the s3 client api. 
      Inputs are the command and the key (in this case the filename)
      for the S3 bucket. 
    */
    async sendCommand(command,fName) {
      try {
        console.log('calling send command'); 
        console.log('Command is ' + (command)); 
        var s3BucketName = "enlearn-efplus-math-which-one-is-special-results/";
        var bucketRegion = "us-west-2";
        var IdentityPoolId = "us-west-2:77d2e523-774d-4782-a18b-90c1158a0906";
        // replaced by the code just below. version 2 vs. version 3 of the api. 
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
    /* 
      function that is emitted by the other pages in order to write the
      data to AWS S3.
    */
    saveData: function (problemData) {
      this.savedData.problemData = problemData;
      this.savedData.sessionData = {}; // adding session data to the log.
      Object.keys(this.sessionStorage).forEach((key) => {
        this.savedData.sessionData[key] = this.sessionStorage.getItem(key);
      });
      console.log("saved Data");
      console.log(JSON.stringify(this.savedData));
      console.log("type " + problemData.type);
      console.log("posting data to s3");
      this.writeToS3(this.savedData, problemData.type);
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
