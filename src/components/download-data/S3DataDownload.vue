<template>
    <div style="background-color: teal;">
        <h1 style="margin-top:5px;margin-bottom:5px;color:ivory">{{ this.s3_data_title }}</h1>
    </div>
    <el-row>
        <el-col :span="2"></el-col>
        
        <el-col :span="8" :offset="2">
            <el-text size="large" style="font-weight: bold;">Download Data From This Date Forward: </el-text>
            <el-date-picker
             v-model="last_modified_date"
             type="date"
             placeholder="Pick a last modified date"
             :disabled-date="disabledDate"
             :shortcuts="shortcuts"
             :size="size"
             :default-value="new Date(2023,8,28)"
            >
            </el-date-picker>
        </el-col>
        <el-col :span="4" :offset="1">
            <el-button @click="listObjects" type="primary" style="margin-left:80%;">List Data Files</el-button>
        </el-col>
    </el-row>
    <el-row>
        <el-col :span="4" :offset="12">
            <el-text><span style="font-weight:bold;font-size:16px;"> Total number of files: </span>{{ total_files }}</el-text>
        </el-col>
    </el-row>
    <br/>
    <el-row>
        <el-col :span="20" :offset="2.0">
            <el-table 
                :data = "s3_data"
                 stripe 
                 border 
                 height="300" 
                 :default-sort="{prop:'last-modified',order:'descending'}"
                 v-loading="loading"
                 element-loading-background="rgba(122, 122, 122, 0.5)"
                >
                <el-table-column type="index" width="50" />
                <el-table-column prop="filename" label="S3 Filename">
                </el-table-column>
                <el-table-column prop="last-modified" label="Last Modified Date" sortable>
                </el-table-column>
            </el-table>
        </el-col>
    </el-row>
    <el-row>
        
        <el-col :span = "4" :offset="2" style="margin-top:1%;">
            <el-text style="font-weight:bold;">File Name:</el-text>
        </el-col>
        <el-col :span = "8" :offset="0" style="margin-top:1%;">
           <el-input v-model = "saved_filename" placeholder="Please enter download filename (*.json)"></el-input>
        </el-col>
        <el-col :span = "8" :offset="4" style="margin-top:1%;">
               <el-button @click="downloadObjects" type="primary" :disabled="download_disabled" style="margin-left:80%;">Download Listed Files</el-button>
        </el-col>
    </el-row>
</template>

<script>

    import { GetObjectCommand, ListObjectsV2Command,S3Client} from "@aws-sdk/client-s3";
    import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers"; // ES6 import
    
export default {
    name: 's3-data-download',
    components: {},
    emits: {
        saveData:null,
    },
    data: function () {
        return {
            s3_data_title: "Data Results Download",
            // experiment data for Which One Is Special.
            downloadedData: {
                sessionData: {},
                problemData: [],
                sessionStorage: {},
            },
            s3_data: [],
            s3BucketName: "",
            size: 'small',
            last_modified_date: new Date(),
            disabledDate: null,
            shortcuts: [],
            loading: false,
            download_disabled: true,
            saved_filename: "",
            total_files:0,
        };
    },
    beforeCreate: function () { },
    mounted() {
        this.s3BucketName = "enlearn-efplus-math-which-one-is-special-results";
        this.disabledDate = (time) => {
            return time.getTime() > Date.now()
        };
        this.total_files = 0; 
        this.loading = false;
        this.download_disabled = true;
        this.shortcuts = [
            {
                text: 'Today',
                value: new Date(),
            },
            {
                text: 'Yesterday',
                value: () => {
                    const date = new Date()
                    date.setTime(date.getTime() - 3600 * 1000 * 24)
                    return date
                },
            },
            {
                text: 'A week ago',
                value: () => {
                    const date = new Date()
                    date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
                    return date
                },
            },
        ];
    },
    methods: {
        listObjects() {
            console.log('listObjects');
            this.listObjectsFromBucket(this.s3BucketName);
        },
        downloadObjects() {
            console.log('download objects');
            if (this.s3_data.length > 0) {
                var s3BucketName = "enlearn-efplus-math-which-one-is-special-results";
                console.log('calling downloadS3Files');
                this.downloads3Files(this.s3_data, s3BucketName);
            }
        },
        readFromS3: function () {
            // get a date range from the interface 
            let d = new Date(Date.now()).toISOString();

            // Since these Idenity pool users only have read/write permission on a single bucket
            // I am going to leave this id in the code since it is not much of a security risk.
            var s3BucketName = "enlearn-efplus-math-which-one-is-special-results";

            // try to write the data to the bucket
            var buf = Buffer.from(JSON.stringify(problemData));
            console.log('buf is ' + (buf));
            console.log('creating a command');
            //var request
            var command = new PutObjectCommand({
                Bucket: s3BucketName,
                Key: fName,
                Body: buf,
                ContentEncoding: "base64",
                ContentType: "application/json"
            });
            // send the command and wait for a reply
            this.sendCommand(command, fName);
        },
        async listObjectsFromBucket(my_bucket) {
            console.log('my_bucket ' + my_bucket);
            console.log('last_modifed_date ' + this.last_modified_date);
            var bucketRegion = "us-west-2";
            var IdentityPoolId = "us-west-2:77d2e523-774d-4782-a18b-90c1158a0906";
            const command = new ListObjectsV2Command({
                Bucket: my_bucket,
                MaxKeys: 1 // for now just get the first item to see if command works. 
            });
            try {

                var client_s3 = new S3Client({
                    region: bucketRegion,
                    credentials: fromCognitoIdentityPool({
                        clientConfig: { region: bucketRegion },
                        identityPoolId: IdentityPoolId,
                    })
                });
                let isTruncated = true;

                console.log("Your bucket contains the following objects:\n")
                let contents = [];
                // console.log('date is  last-modified' + (this.last_modified_date));
                while (isTruncated) {
                    this.loading = true;
                    const { Contents, IsTruncated, NextContinuationToken } = await client_s3.send(command);
                    var contentsList = { 'filename': Contents.map((c) => `${c.Key}`), 'last-modified': Contents.map((c) => `${c.LastModified}`) };
                    if (new Date(contentsList['last-modified'][0]).getTime() > this.last_modified_date.getTime()) {
                        contents.push(contentsList);
                    }
                    isTruncated = IsTruncated;
                    command.input.ContinuationToken = NextContinuationToken;
                }
                // console.log(JSON.stringify(contents));
                this.loading = false;
                this.s3_data = contents;
                this.total_files = this.s3_data.length; 
                if (this.s3_data.length > 0) {
                    this.download_disabled = false;
                }

            } catch (err) {
                console.error(err);
            }
        },
        downloadObjectAsJson: function (exportObj, exportName) {
            console.log('downloadObjectsAsJson');
            var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
            var downloadAnchorNode = document.createElement('a');
            downloadAnchorNode.setAttribute("href", dataStr);
            downloadAnchorNode.setAttribute("download", exportName);
            document.body.appendChild(downloadAnchorNode); // required for firefox
            downloadAnchorNode.click();
            downloadAnchorNode.remove();
        },
        async downloads3Files(my_list, my_bucket) {
            console.log('my_list ' + JSON.stringify(my_list));
            var bucketRegion = "us-west-2";
            var IdentityPoolId = "us-west-2:77d2e523-774d-4782-a18b-90c1158a0906";
            var s3_list = [];
            var client_s3 = new S3Client({
                region: bucketRegion,
                credentials: fromCognitoIdentityPool({
                    clientConfig: { region: bucketRegion },
                    identityPoolId: IdentityPoolId,
                })
            });
            for (let i = 0; i < my_list.length; i++) {
                const command = new GetObjectCommand({
                    Bucket: my_bucket,
                    Key: my_list[i].filename[0]
                });
                try {
                    const response = await client_s3.send(command);
                    // The Body object also has 'transformToByteArray' and 'transformToWebStream' methods.
                    const str = await response.Body.transformToString();
                    s3_list.push(str);

                } catch (err) {
                    console.error(err);
                }
            }
                if (s3_list.length > 0) {
                    console.log('s3_list ' + s3_list);
                    console.log('saved_filename ' + this.saved_filename);
                    console.log(this.saved_filename.endsWith('json'));
                    if (this.saved_filename != "") {
                        if (this.saved_filename.endsWith("json")) {
                            console.log('ends in .json')
                            this.downloadObjectAsJson(s3_list, this.saved_filename);
                        } else {
                            console.log('does not end with json')
                            var s_filename = this.saved_filename + ".json";
                            this.downloadObjectAsJson(s3_list, s_filename);
                        }
                    }
                }
            }
    },
};
</script>