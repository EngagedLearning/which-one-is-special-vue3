<template>
    <el-container class="wrap justify-content-md-center">
        <el-alert type="success" center show>
            <el-row>
                <el-col :span="24">
                    <h1 class="likert-header justify-content-md-center">
                        What Makes This One Unique Activity Survey.
                    </h1>
                    <br />
                </el-col>
            </el-row>
            <el-form action="">
                <el-row>
                    <el-col :span="20" :offset="4">
                        <el-form-item>
                            <el-input type = "textarea" id="activity_about_text" v-model="activity_text"
                            placeholder="In your own words, what do you think this activity ask you to do?" rows="3"
                            max-rows="6" style="margin-bottom: 1em;">
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="20" :offset="4">
                        <el-form-item>
                        <el-input type="textarea" id="variance_def_text" v-model="unique_text"
                            placeholder="In your own words, please give a definition for the term 'unique' as it was used in this activity?"
                            rows="3" max-rows="6" style="margin-bottom: 1em;">
                        </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="22" :offset="4">
                        <h2 style="text-align: left">
                            <b>Please rate your agreement with the following statements: </b>
                        </h2>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="20" :offset="4">
                        <el-form-item class="statement" label="The directions were clear and easy to understand.">
                            <el-radio-group id="radio-group-2" v-model="instruction_rating"
                                name="radio_instruction_rating" class="likert">
                                <el-row>
                                    <el-col :span="6">
                                        <el-radio class="likert-margin-style" :label="2">Strongly Agree
                                        </el-radio>
                                    </el-col>
                                    <el-col :span="4">
                                        <el-radio class="likert-margin-style" :label="1">Agree
                                        </el-radio>
                                    </el-col>
                                    <el-col :span="4">
                                        <el-radio class="likert-margin-style" :label="0">Neutral
                                        </el-radio>
                                    </el-col>
                                    <el-col :span="4">
                                        <el-radio class="likert-margin-style" :label="-1">Disagree
                                        </el-radio>
                                    </el-col>
                                    <el-col :span="3">
                                        <el-radio class="likert-margin-style" :label="-2">Strongly Disagree
                                        </el-radio>
                                    </el-col>
                                </el-row>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item class="statement" label="The interface was intuitive and easy to use.">
                            <el-radio-group id="radio-group-3" v-model="interface_rating" name="radio_interface_rating"
                                class="likert">
                                <el-row>
                                    <el-col :span="6">
                                        <el-radio class="likert-margin-style" :label="2">Strongly Agree
                                        </el-radio>
                                    </el-col>
                                    <el-col :span="4">
                                        <el-radio class="likert-margin-style" :label="1">Agree
                                        </el-radio>
                                    </el-col>
                                    <el-col :span="4">
                                        <el-radio class="likert-margin-style" :label="0">Neutral
                                        </el-radio>
                                    </el-col>
                                    <el-col :span="4">
                                        <el-radio class="likert-margin-style" :label="-1">Disagree
                                        </el-radio>
                                    </el-col>
                                    <el-col :span="3">
                                        <el-radio class="likert-margin-style" :label="-2">Strongly Disagree
                                        </el-radio>
                                    </el-col>
                                </el-row>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item class="statement" label="The activity was difficult.">
                            <el-radio-group id="radio-group-4" v-model="activity_rating" name="radio_activity_rating"
                                class="likert">
                                <el-row>
                                    <el-col :span="6">
                                        <el-radio class="likert-margin-style" :label="2">Strongly Agree
                                        </el-radio>
                                    </el-col>
                                    <el-col :span="4">
                                        <el-radio class="likert-margin-style" :label="1">Agree
                                        </el-radio>
                                    </el-col>
                                    <el-col :span="4">
                                        <el-radio class="likert-margin-style" :label="0">Neutral
                                        </el-radio>
                                    </el-col>
                                    <el-col :span="4">
                                        <el-radio class="likert-margin-style" :label="-1">Disagree
                                        </el-radio>
                                    </el-col>
                                    <el-col :span="3">
                                        <el-radio class="likert-margin-style" :label="-2">Strongly Disagree
                                        </el-radio>
                                    </el-col>
                                </el-row>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item class="statement" label="I feel the words used in each question were easy to understand.">
                            <el-radio-group id="radio-group-5" v-model="understanding_rating"
                                name="radio_understanding_rating" class="likert">
                                <el-row>
                                    <el-col :span="6">
                                        <el-radio class="likert-margin-style" :label="2">Strongly Agree
                                        </el-radio>
                                    </el-col>
                                    <el-col :span="4">
                                        <el-radio class="likert-margin-style" :label="1">Agree
                                        </el-radio>
                                    </el-col>
                                    <el-col :span="4">
                                        <el-radio class="likert-margin-style" :label="0">Neutral
                                        </el-radio>
                                    </el-col>
                                    <el-col :span="4">
                                        <el-radio class="likert-margin-style" :label="-1">Disagree
                                        </el-radio>
                                    </el-col>
                                    <el-col :span="3">
                                        <el-radio class="likert-margin-style" :label="-2">Strongly Disagree
                                        </el-radio>
                                    </el-col>
                                </el-row>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item class="statement" label="I feel the feedback after each answer was helpful.">
                            <el-radio-group id="radio-group-7" v-model="feedback_rating" name="radio_feedback_rating"
                                class="likert">
                                <el-row>
                                    <el-col :span="6">
                                        <el-radio class="likert-margin-style" :label="2">Strongly Agree
                                        </el-radio>
                                    </el-col>
                                    <el-col :span="4">
                                        <el-radio class="likert-margin-style" :label="1">Agree
                                        </el-radio>
                                    </el-col>
                                    <el-col :span="4">
                                        <el-radio class="likert-margin-style" :label="0">Neutral
                                        </el-radio>
                                    </el-col>
                                    <el-col :span="4">
                                        <el-radio class="likert-margin-style" :label="-1">Disagree
                                        </el-radio>
                                    </el-col>
                                    <el-col :span="3">
                                        <el-radio class="likert-margin-style" :label="-2">Strongly Disagree
                                        </el-radio>
                                    </el-col>
                                </el-row>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="20" :offset="4">
                        <el-input type="textarea" id="comment_text" v-model="comment_text"
                            placeholder="Do you have another comments/criticisms or wonderings on this activity?" rows="3"
                            max-rows="6" style="margin-bottom: 1em;">
                        </el-input>
                    </el-col>
                </el-row>
                <div class="buttons">
                    <el-button class="clear" type ="primary" @click="clearEntries">Clear</el-button>
                    <el-button class="submit" type="primary" @click="submitEntries">Submit</el-button>
                </div>
            </el-form>
        </el-alert>
    </el-container>
</template>
<script>
import { defineComponent } from "vue";


export default defineComponent({
    name: "SurveyQuestions",
    components: {},
    props: {},
    data: function () {
        return {
            activity_text: "",
            comment_text: "",
            unique_text: "",
            instruction_rating: -3,
            activity_rating: -3,
            interface_rating: -3,
            understanding_rating: -3,
            feedback_rating: -3,
            survey_data: {},
            sessionStorage: {},
        };
    },
    methods: {
        /*
        Reset the survey entries 
        Entries are:
        activity_text: purpose of activity (free form text)
        comment_text: comments or criticisms of the activity (free form text)
        unique_text: definition of unique (free-form text)
        instruction_rating: Likert scale: on direction clarity
        activity_rating: Likert scale: activity difficulty rating
        interface_rating: Likert scale: ease of use of interface
        understanding_rating: Likert scale: How easy was each question to understand
        feedback_rating: Likert scale: How helpful was the feedback on each answer. 
        */
        clearEntries: function () {
            this.activity_text = "";  
            this.comment_text = "";
            this.unique_text = "";
            this.instruction_rating = -3;
            this.activity_rating = -3;
            this.interface_rating = -3;
            this.understanding_rating = -3;
            this.feedback_rating = -3;
        },
        /*
            Submit the entries to the top level App.vue so they can be written to Amazon S3.
        */
        submitEntries: function () {
            console.log("submitting entries");
            this.sessionStorage = window.sessionStorage;
            let user = this.sessionStorage.getItem("user_id");
            let new_state = {
                student_id: user,
                type: "survey",
                timestamp: Date.now(),
                activity_text: this.activity_text,
                unique_text: this.unique_text,
                instruction_rating: this.instruction_rating,
                interface_rating: this.interface_rating,
                activity_rating: this.activity_rating,
                understanding_rating: this.understanding_rating,
                feedback_rating: this.feedback_rating,
                comment_text: this.comment_text,
            };
            this.survey_data = new_state;
            console.log("survey data " + JSON.stringify(this.survey_data));
            this.$emit("saveData", this.survey_data);
            this.$router.push("/ThankYou_1");
        },
    },
});
</script>
<style scoped>
html,
body {
    padding: 0;
    margin: 0;
}

.wrap {
    font: 12px Arial, san-serif;
}

h1.likert-header {
    padding-left: 4.25%;
    margin: 20px 0 20px 20px;
}
.likert-margin-style {
    margin-right:2em; 
}

form .statement {
    display: block;
    font-size: 14px;
    font-weight: bold;
    padding: 30px 0 0 4.25%;
    margin-bottom: 10px;
}

form .likert {
    list-style: none;
    width: 100%;
    margin: 0;
    padding: 1em;
    display: block;
    border-bottom: 2px solid #efefef;
    margin-right: 2em; 
}

form .likert:last-of-type {
    border-bottom: 0;
}

form .likert:before {
    content: "";
    position: relative;
    top: 11px;
    left: 9.5%;
    display: block;
    background-color: #efefef;
    height: 4px;
    width: 78%;
}

form .likert li {
    display: inline-block;
    width: 19%;
    text-align: center;
    vertical-align: top;
}

form .likert li input[type="radio"] {
    display: block;
    position: relative;
    top: 0;
    left: 50%;
    margin-left: -6px;
}

form .likert li label {
    width: 100%;
}

form .buttons {
    margin: 30px 10px;
    padding: 0 4.25%;
    text-align: right;
}

form .buttons button {
    padding: 5px 10px;
    margin-right: 0.5em;
    background-color: #67ab49;
    border: 0;
    border-radius: 3px;
}

form .buttons .clear {
    background-color: #e9e9e9;
}

form .buttons .submit {
    background-color: #67ab49;
}

form .buttons .clear:hover {
    background-color: #ccc;
}

form .buttons .submit:hover {
    background-color: #14892c;
}
</style>
