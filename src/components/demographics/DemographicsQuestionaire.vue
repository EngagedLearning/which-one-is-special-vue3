<template>
    <el-container bv-example-row>
        <el-main show type = "info" center :span="12" :offset="6">
            <el-row>
                <el-col>
                    <h2>Demographic Survey</h2>
                </el-col>
                <el-divider />
            </el-row>
            <el-row class="justify-content-center">
                <el-col :span="12" :offset="6">
                    <el-form  
                    ref="demographicsRef" 
                    :model="form" 
                    label-width="100px" 
                    :label-position="'top'">
                        <el-form-item label = "Age">
                            <el-input-number class = "m-2" placeholder="Your Age?" clearable aria-label = "Age"
                            v-model.number = "form.age" type="number" autocomplete="off" :min="18" :max="100">
                            </el-input-number>
                        </el-form-item>
                        <el-form-item label = "Gender">
                            <el-select id="input-2" class="m-2" v-model="form.gender" :options="genders" placeholder="Your Gender?">
                                <el-option
                                v-for="item in genders" :key="item.value" :label="item.label" :value="item.value"
                                >
                                    
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label = "Math Anxiety" >
                            <el-select id="input-3" class="m-2" v-model="form.mathAnxiety" :options="mathAnxieties" placeholder="Math Anxiety Level?">
                                <el-option
                                    v-for="item in mathAnxieties" :key="item.value" :label="item.label" :value="item.value"
                                    >
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label = "Statistics Anxiety">
                            <el-select id="input-4" class="m-2" v-model="form.statAnxiety" :options="statAnxieties" placeholder="Statistics Anxiety Level?">
                                 <el-option
                                        v-for="item in statAnxieties" :key="item.value" :label="item.label" :value="item.value"
                                        >
                                </el-option>
                             </el-select>
                        </el-form-item>
                        <el-form-item label = "Math Level" >
                            <el-select id="input-5" class="m-2" v-model="form.mathLevel" :options="mathLevels" placeholder="Math Education Level?">
                                <el-option
                                    v-for="item in mathLevels" :key="item.value" :label="item.label" :value="item.value"
                                    >
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label = "Education" >
                            <el-select id="input-6" class="m-2" v-model="form.education" :options="educations" placeholder="Education Level?">
                                <el-option
                                    v-for="item in educations" :key="item.value" :label="item.label" :value="item.value"
                                    >
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label = "Major Field of Study">
                                <el-input id = "input-7" class="m-2" placeholder="Major Field of Study?" clearable aria-label = "Major Field of Study"
                                v-model = "form.major" type="text" autocomplete="off">
                                </el-input>
                        </el-form-item>
                        <el-form-item label = "Ethnicity" >
                                <el-select id="input-8" class="m-2" v-model="form.ethnicity" :options="ethnicities" placeholder="Ethnicity?">
                                    <el-option
                                        v-for="item in ethnicities" :key="item.value" :label="item.label" :value="item.value"
                                        >
                                    </el-option>
                                </el-select>
                        </el-form-item>
                        <el-form-item label = "Main Language">
                                    <el-select id="input-9" class="m-2" v-model="form.language" :options="languages" placeholder="Main language spoken at home?">
                                        <el-option
                                            v-for="item in languages" :key="item.value" :label="item.label" :value="item.value"
                                            >
                                        </el-option>
                                    </el-select>
                            </el-form-item>
				        <el-form-item label = "Mechanical Turk Worker Id">
                            <el-input id="input-10" placeholder="Worker Id?" clearable aria-label = "Worker Id"
                                    v-model = "form.workerId" type="text" autocomplete="off">
                             </el-input>
                        </el-form-item>
                        <el-row>
                            <el-col :span="6" :offset="18">
                            <el-button type="primary" plain @click="onSubmit"> Submit </el-button>
                            </el-col>
                        </el-row>
                    </el-form>
                </el-col>
            </el-row>
       
            <el-row class="justify-content-md-center">
                <el-col>
                    <h4>{{ saveSuccessMessage }}</h4>
                </el-col>
            </el-row>
            <el-row >
                <el-col :span="4" :offset="12">
                    <div class="m-4" v-if="showProblem1Button">
                        <el-button type="primary" plain variant="info" @click="startActivity()" >
                            Start the activity!
                        </el-button>
                    </div>
                </el-col>
            </el-row>
        </el-main>
    </el-container>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent ({
    name: "DemographicQuestionnaire",
    props: {
        experiment_id_prop: {
            type: Number,
            required: true,
        },
    },
    data() {
        return {
            // Figure out the rules later 
            /* rules: {
                 age: [
                     { required: true, message: 'Please enter your age', trigger: 'blur' }
                     
                 ]
                 email: "",
                 gender: null,
                 mathAnxiety: null,
                 statAnxiety: null,
                 mathLevel: null,
                 education: null,
                 major: "",
                 ethnicity: null,
                 workerId: "",
             }*/

            pageName: "DemographicQuestionnaire",
            // To keep all the form data together.
            form: {
                age: null,
                //	email: "",
                gender: null,
                mathAnxiety: null,
                statAnxiety: null,
                mathLevel: null,
                education: null,
                major: "",
                ethnicity: null,
                languages:null,
                workerId: "",
            },
            // Options for form selects.
            genders: [
                {
                    value: "Woman",
                    label: "Woman",
                },
                {
                    value: "Man",
                    label: "Man"
                },
                {
                    value: "Transgender",
                    label: "Transgender"
                },
                {
                    value: "Non-binary/non-conforming",
                    label: "Non-binary/non-conforming"
                },
                {
                    value: "Prefer not to respond",
                    label: "Prefer not to respond",
                }
            ],
            mathAnxieties: [
                {
                    value: "Very Comfortable",
                    label: "Very Comfortable",
                },
                {
                    value: "Somewhat Comfortable",
                    label: "Somewhat Comfortable",
                },
                {
                    value: "Neutral",
                    label: "Neutral",
                },
                {
                    value: "Somewhat Uncomfortable",
                    label: "Somewhat Uncomfortable",
                },
                {
                    value: "Very Uncomfortable",
                    label: "Very Uncomfortable",
                }
            ],
            statAnxieties: [
                {
                    value: "Very Comfortable",
                    label: "Very Comfortable",
                },
                {
                    value: "Somewhat Comfortable",
                    label: "Somewhat Comfortable",
                },
                {
                    value: "Neutral",
                    label: "Neutral",
                },
                {
                    value: "Somewhat Uncomfortable",
                    label: "Somewhat Uncomfortable",
                },
                {
                    value: "Very Uncomfortable",
                    label: "Very Uncomfortable",
                }
            ],
            mathLevels: [
                {
                    value: "Elementary School",
                    label: "Elementary School",
                },
                {
                    value: "Algebra 1",
                    label: "Algebra 1",
                },
                {
                    value: "Algebra 2",
                    label: "Algebra 2",
                },
                {
                    value: "Geometry",
                    label: "Geometry",
                },
                {
                    value: "Calculus",
                    label: "Calculus",
                },
                {
                    value: "Other",
                    label: "Other",
                }
            ],
            educations: [
                {
                    value: "In Primary School",
                    label: "In Primary School",
                },
                {
                    value: "Primary School",
                    label: "Primary School",
                },
                {
                    value: "Middle School or equivalent",
                    label: "Middle School or equivalent",
                },
                {
                    value: "High School or equivalent",
                    label: "High School or equivalent",
                },
                {
                    value: "Community College or equivalent",
                    label: "Community College or equivalent",
                },
                {
                    value: "University undergraduate program",
                    label: "University undergraduate program",
                },
                {
                    value: "University post-graduate program",
                    label: "University post-graduate program",
                },
                {
                    value: "Doctoral degree",
                    label: "Doctoral degree",
                }
            ],
            ethnicities: [
                {
                    value: "Hispanic or Latino",
                    label: "Hispanic or Latino",
                },
                {
                    value: "Black or African American",
                    label: "Black or African American",
                },
                {
                    value: "Native American or American Indian",
                    label: "Native American or American Indian",
                },
                {
                    value: "Asian / Pacific Islander",
                    label: "Asian / Pacific Islander",
                },
                {
                    value: "White",
                    label: "White",
                },
                {
                    value: "Other",
                    label: "Other",
                }
            ],
            languages: [
                {
                    value: "American Sign Language",
                    label: "American Sign Language",
                },
                {
                    value: "Chinese",
                    label: "Chinese",
                },
                {
                    value: "English",
                    label: "English",
                },
                {
                    value: "French",
                    label: "French",
                },
                {
                    value: "Other",
                    label: "Other",
                },
                {
                    value: "Spanish",
                    label: "Spanish",
                },
                {
                    value: "Tagalog",
                    label: "Tagalog",
                },
                {
                    value: "Vietnamese",
                    label: "Vietnamese",
                }
            ],
            showProblem1Button: false,
            saveSuccessMessage: "",
            sessionStorage:{},
        };
    },
    mounted: function () {
        this.experiment_id = this.experiment_id_prop;
        this.showProblem1Button = false; 
        this.sessionStorage = window.sessionStorage; 
    },
    methods: {
        onSubmit(event) {
            event.preventDefault();
            //alert(JSON.stringify(this.form));
            // Display the next problem button now.
            this.showProblem1Button = true;
            let logData = {
                eventName: "DemographicInformation",
                type: "demographic",
                timestamp: Date.now(),
                ...this.form,
            };
            // set the session_id to the worker_id

            // store the demographic data in the problemSpecificData
            
            console.log("pushing demographic data");
            this.$emit("saveData", logData);
            this.saveSuccessMessage =
                "Thank you! Please click on 'Start the activity!' button to proceed.";
        },
        startActivity: function () {
            //console.log("experiment_id " + this.experiment_id);
            // starting with 20 so it doesn't conflict with a previous version
            if (this.experiment_id == 20) this.$router.push("/WhichOneIsSpecial_0");
            else if (this.experiment_id == 21)
                this.$router.push("/WhichOneIsSpecialPrep_1");
            else console.log("bad experiment id");
        },
    },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
