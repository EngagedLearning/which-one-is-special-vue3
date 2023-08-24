<template>
    <div>
      <el-dialog
                  v-model="show_feedback_modal"
                  title="Question Feedback"
                  width="30%"
                  @closed="modalCloseEvent"
                  id="feedback_modal"
                  :close-on-click-modal = 'false'
                  :close-on-press-escape = 'false'
                  :show-close="false"
                  center
                  style="margin-top:25%;margin-right:1%;"
                  dark
                >
                <hr />
                  <p v-html="question_feedback_message"></p>
                  <hr />
                  <el-button @click="show_feedback_modal = false" type="primary" style="margin-left:80%;">OK</el-button>
      </el-dialog>
        <div style="background-color: teal;">                
        <h1 style="margin-top:5px;margin-bottom:5px;color:ivory">{{ this.wois_title }}</h1>
        </div>
        <div >
          <el-row>
            <el-col v-if = "((image_deck[0] != null && group_choice < this.image_exp_max) 
            || (image_deck[0] != null && group_choice >= this.image_exp_max && penn_exp_prop))" 
                  :span="8" :offset="1.0" style="margin-bottom:2%;">
                  <div
                      :class="image_overlay_computed[0]"
                      style="margin-top: 0%;"
                      @click="selectImage(0)"
                      >
                 <figure class="figure-img img-fluid select_cursor">
                  <figcaption
                  class="figure-caption text-center" 
                    style="
                  width: 100%;
                  margin-top: -10px;
                  font-weight: bold;
                "
                    v-html="image_caption_1[0]"
                  ></figcaption>
                  <img v-if="group_choice < this.image_exp_max"
                    :src="getImageUrl(this.image_0_computed)"
                    class="image-center"
                    style = "margin-top:1%;margin-left:25%;"
                 
                  />
                  <p v-html = "this.image_0_computed" v-if="group_choice >= this.image_exp_max && penn_exp_prop" style="font-size:24px;"> 
                  </p>
                </figure>
                </div>
            </el-col>          
              <el-col
                :span="9" :offset="1"
                class="justify-content-center"
                v-if="((image_deck[1] != null && group_choice < this.image_exp_max)
                || (image_deck[1] != null && group_choice >= this.image_exp_max && penn_exp_prop))"
              >
              <div
                      :class="image_overlay_computed[1]"
                      style="margin-top: 0%;margin-bottom:5%;"
                      @click="selectImage(1)"
                    >
                <figure class="figure-img img-fluid select_cursor" style="width: 75%">
                  
                  <figcaption
                   class="figure-caption text-center" 
                    style="
                  width: 100%;
                  margin-left:3%;
                  margin-top: -10px;
                  font-weight: bold;
                  text-align:center;
                "
                    v-html="image_caption_1[1]"
                  ></figcaption>
                  <img v-if = "group_choice < this.image_exp_max"
                    :src="getImageUrl(this.image_1_computed)"
                    class="image-center"
                    style = "margin-top:1%;margin-left:25%;"
                  />
                  <p v-html ="this.image_1_computed" v-if="group_choice >= this.image_exp_max && penn_exp_prop" style="font-size:24px;">
                  </p>
                </figure>
                </div>
              </el-col>
            <el-col :span="5">
              <el-row>
                <el-col :span = "24">
                  <div v-if="(question_type == 0 && first_question) ||
                  (question_type == 1 && first_question && penn_exp_prop)">
                  <el-row>
                      <p style="margin-left: 5%; margin-right: 7.5%; font-size: 1.0em">
                        Select every image
                        <b><i>{{ this.wois_feature[this.group_choice] }}</i></b>
                      </p>
                  </el-row>
                  </div>
                  <div v-if="(second_question && this.question_type == 0) ||
                  (second_question && this.question_type == 1 && penn_exp_prop)">
                    <el-row >
                      <el-col :span="24">
                        <p v-html="second_question_text"
                          style="margin-left: 5%; margin-right: 2%; font-size: 1.0em"
                        ></p>
                      </el-col>
                    </el-row>
                    <el-row style="margin-left: 5%;border:1px solid blue;">
                      <el-col :span="24">
                      <div id="second_question_id" class="mb-2 flex items-center text-sm">
                        <label for="false_second_question">False</label>
                        <input id ="false_second_question" type="radio" value=0  name='second_question' v-model="this.second_question_answer" @change="submitEnabled"/>
                       </div>
                       </el-col>
                       <el-col :span="24">
                        <div id="second_question_id" class="mb-2 flex items-center text-sm"> 
                        <label for="true_second_question">True</label>
                        <input id ="true_second_question" type="radio" value=1 name = 'second_question' v-model="this.second_question_answer" @change="submitEnabled" />
                      </div>
                      </el-col>
                    </el-row>
                  </div>
                </el-col>
              </el-row>
                
               <el-row style="margin-top: 20px" v-if="(question_type == 0) ||
               (question_type == 1 && penn_exp_prop)">
                <el-col :span = "2" :offset  = "8">
                  <div  v-if="!continue_mode">
                  <el-button
                    type ="primary"
                    plain
                    size="large"
                    @click="recordWois"
                    :disabled="submit_disabled"
                  >
                    Submit
                  </el-button>
                  </div>
                  <div v-if="continue_mode">
                    <el-button
                      type="primary"
                      size="large"
                      @click="clickContinue"
                      :disabled="continue_disabled"
                      class="justify-content-center"
                      style="margin-bottom: 0.5em"
                    >
                      Continue
                    </el-button>
                  </div>
                </el-col>
                </el-row>
                </el-col>
                <el-col :span="7" :offset="11" v-if="question_type == 1 && !penn_exp_prop" >
                  <el-row>
                    <el-col :span = "24">
                    <div v-if="question_type == 1 && first_question">
                      <el-row>
                        <p style="margin-left: 10%; margin-right: 7.5%; font-size: 1.0em">
                        Select every statement
                          <b><i>{{ this.wois_feature[this.group_choice] }}</i></b>
                        </p>
                      </el-row>
                    </div>
                    </el-col>
                  </el-row>
                  <div v-if="second_question && this.question_type == 1  && !penn_exp_prop">
                      <el-row >
                        <el-col :span="24">
                          <p v-html="second_question_text"
                            style="margin-left: 20%; margin-right: 2%; font-size: 1.1em"
                          ></p>
                        </el-col>
                      </el-row>
                      <el-row style="margin-left: 20%;border:1px solid blue;">
                        <el-col :span="24">
                          <div id="second_question_id" class="mb-2 flex items-center text-sm">
                            <label for="false_second_question">False</label>
                            <input id ="false_second_question" type="radio" value=0  name='second_question' v-model="this.second_question_answer" @change="submitEnabled"/>
                          </div>
                        </el-col>
                        <el-col :span="24">
                          <div id="second_question_id" class="mb-2 flex items-center text-sm"> 
                            <label for="true_second_question">True</label>
                            <input id ="true_second_question" type="radio" value = 1 name = 'second_question' v-model="this.second_question_answer" @change="submitEnabled" />
                          </div>
                        </el-col>
                      </el-row>
                    </div>
                    <div style="margin-left: 5%"
                        v-if="question_type == 1 && !penn_exp_prop">
                        <div>
                          <h4 v-if="second_question" style="margin-bottom:0px;">
                            <b>Correct Answer:</b>
                          </h4>
                        </div>
                        <el-row>
                          <el-col :span="12">
                            <h6
                              v-html="image_caption_1[0]"
                              style="
                              margin-bottom: 7px;
                              line-height: 0.75em;
                              margin-top: 1%;
                              text-align: right;
                            "
                            ></h6>
                          </el-col>
                          <el-col :span="2" style="padding-right: 0px">
                            <h6 style="margin-top: 0.66em; margin-bottom: 5px">A.</h6>
                          </el-col>
                          <el-col :span="10" style="padding-left: 0px">
                              <el-checkbox-group
                                  id="wois-select"
                                  v-model="wois_selected"
                                  name="radio_wois_select"
                                  :disabled="woisDisabled"
                                  @change="submitEnabled"
                                  style="text-align: left"
                                >
                                <el-checkbox :label = this.image_0_computed />
                              </el-checkbox-group>
                          </el-col>
                        </el-row>
                        <el-row>
                          <el-col :span="12">
                            <h6
                              v-html="image_caption_1[1]"
                              style="
                              margin-bottom: 7px;
                              line-height: 0.75em;
                              margin-top: 1%;
                              text-align: right;
                            "
                            ></h6>
                          </el-col>
                          <el-col :span="2" style="padding-right:0px;margin-top:-5%;">
                            <h6 style="margin-bottom: 1px">B.</h6>
                          </el-col>
                          <el-col :span="10" style="padding-left: 0px">
                                <el-checkbox-group
                                    id="wois-select"
                                    v-model="wois_selected"
                                    name="radio_wois_select"
                                    :disabled="woisDisabled"
                                    @change="submitEnabled"
                                    style="text-align: left"
                                  >
                                  <el-checkbox :label = this.image_1_computed />
                                </el-checkbox-group>
                          </el-col>
                        </el-row>
                        <el-row>
                          <el-col :span="12">
                            <h6
                              v-html="image_caption_1[2]"
                              style="
                              margin-bottom: 7px;
                              line-height: 0.75em;
                              margin-top: 1%;
                            text-align: right;
                            "
                            ></h6>
                          </el-col>
                          <el-col :span="2" style="padding-right:0px;margin-top:-5%;">
                            <h6 style="margin-bottom: 5px">C.</h6>
                          </el-col>
                          <el-col :span="10" style="padding-left: 0px">
                                <el-checkbox-group
                                    id="wois-select"
                                    v-model="wois_selected"
                                    name="radio_wois_select"
                                    :disabled="woisDisabled"
                                    @change="submitEnabled"
                                    style="text-align: left"
                                  >
                                  <el-checkbox :label = this.image_2_computed />
                                </el-checkbox-group>
                          </el-col>
                        </el-row>
                        <el-row>
                          <el-col :span="12">
                            <h6
                              v-html="image_caption_1[3]"
                              style="
                            margin-bottom: 7px;
                            line-height: 0.75em;
                            margin-top: 1%;
                            text-align: right;
                            "
                            ></h6>
                          </el-col>
                          <el-col :span="2" style="padding-right:0px;margin-top:-5%;">
                            <h6 style="margin-bottom: 5px">D.</h6>
                          </el-col>
                          <el-col :span="10" style="padding-left: 0px">
                                <el-checkbox-group
                                    id="wois-select"
                                    v-model="wois_selected"
                                    name="radio_wois_select"
                                    :disabled="woisDisabled"
                                    @change="submitEnabled"
                                    style="text-align: left"
                                  >
                                  <el-checkbox :label = this.image_3_computed />
                                </el-checkbox-group>
                          </el-col>
                        </el-row>
                    </div>
                   <el-row style="margin-left: 5%; margin-right: 2%; margin-top:3%;">
                    <div v-if="continue_mode">
                      <el-col
                        :span="24"
                        style="border: 1px solid black; margin-right: 5%;"
                      >
                        <div
                          v-if="this.feedback_counter <= 1 && this.answer_incorrect && this.group_choice >= this.image_exp_max">
                          <p style="text-align:left;margin-left: 5px;">Note the feedback next to each answer.</p>
                          <p style="text-align:left;margin-left: 5px;">
                            Press <b>'Continue'</b> to try again on a shuffled set of
                            statements.
                          </p>
                        </div>
                      </el-col>
                  </div>
                </el-row> 
                  <el-row style="margin-top: 20px" v-if="question_type == 1 && !penn_exp_prop">
                    <el-col :span = "2" :offset  = "8">
                      <div  v-if="!continue_mode">
                      <el-button
                        type ="primary"
                        plain
                        size="large"
                        @click="recordWois"
                        :disabled="submit_disabled"
                      >
                        Submit
                      </el-button>
                      </div>
                      <div v-if="continue_mode">
                      <el-button
                        type="primary"
                        size="large"
                        @click="clickContinue"
                        :disabled="continue_disabled"
                        class="justify-content-center"
                        style="margin-bottom: 0.5em"
                      >
                        Continue
                      </el-button>
                      </div>
                    </el-col>
                  </el-row>
               </el-col>
      </el-row>
    </div>
        <div>
          <el-row>
              <el-col v-if = "((image_deck[2] != null && group_choice < this.image_exp_max)
              || (image_deck[2] != null && group_choice >= this.image_exp_max && penn_exp_prop))" 
              :span="8" :offset="1.0" class="justify-content-center">
                <div
                        :class="image_overlay_computed[2]"
                        @click="selectImage(2)"
                >
                <figure class="figure-img img-fluid select_cursor" style="width: 75%"> 
                  <figcaption
                    class="figure-caption text-center" 
                      style="
                          width: 100%;
                          margin-left: 5%;
                          margin-top: -10px;
                          font-weight: bold;
                        "
                      v-html="image_caption_1[2]"
                  ></figcaption>
                  <img v-if="group_choice < this.image_exp_max"
                      :src="getImageUrl(this.image_2_computed)" 
                      class="image-center"
                      style = "margin-top:1%;margin-left:25%;"
                  />
                   <p v-html = "this.image_2_computed" v-if="group_choice >= this.image_exp_max && penn_exp_prop" style="font-size:24px;"> 
                   </p>
                </figure>
                </div>
              </el-col>
              <el-col
                  :span="9" :offset="1"
                  class="justify-content-center"
                  v-if="((image_deck[3] != null && group_choice < this.image_exp_max) 
                  || (image_deck[3] != null && group_choice >= this.image_exp_max && penn_exp_prop))"
              >
                <div
                        :class="image_overlay_computed[3]"
                        @click="selectImage(3)"
                >
                  <figure class="figure-img img-fluid select_cursor" style="width: 75%">   
                    <figcaption
                      class="figure-caption text-center" 
                      style="
                        width: 100%;
                        margin-top: -10px;
                        font-weight: bold;
                        margin-left:5%;
                      "
                      v-html="image_caption_1[3]"
                    >
                    </figcaption>
                    <img v-if="group_choice < this.image_exp_max"
                      :src="getImageUrl(this.image_3_computed)"
                      class="image-center"
                      style = "margin-top:1%;margin-left:25%;" 
                    />
                     <p v-html = "this.image_3_computed" v-if="group_choice >= this.image_exp_max && penn_exp_prop" style="font-size:24px;">
                     </p>
                  </figure>
                </div>
            </el-col>
                <el-col v-if="(continue_mode && question_type == 0)
                 || (continue_mode && question_type == 1 && penn_exp_prop)"
                  :span="5" :offset="19"
                  style="border: 1px solid black; margin-right: 5%;margin-top:11%;"
                >
                  <div
                      v-if="this.feedback_counter <= 1 && this.answer_incorrect && ((this.group_choice >= this.image_exp_max && this.penn_exp_prop) || (this.group_choice < this.image_exp_max))">
                      <p style="text-align:left;margin-left: 5px;">
                          Note the feedback for your answer near the top of each image.
                      </p>
                      <p style="text-align:left;margin-left: 5px;">
                          Press <b>'Continue'</b> to try again on a shuffled set of
                          images.
                      </p>
                  </div>
            </el-col>
          </el-row>
          </div>
    </div>
</template>

<script>
import { defineComponent } from "vue"
import wois_options_file from '../../assets/data/wois_options.json'
import wois_data_file from '../../assets/data/wois_data.json'
import image_data_file from '../../assets/data/image_data.json';
import 'element-plus/dist/index.css'

export default defineComponent({
    name: "WhichOneIsSpecialPrep",
    props: {
        which_one_is_special_prep_id_prop: {
            type: Number,
            required: true,
            default: 1,
      },
      penn_exp_prop: {
        type: Boolean,
        required: true,
        default:false,       
      }       
    },
  data() {
    return {
      image_exp_max:12,
      num_groups: 6,
      wois_title: "Find the Property",
      group_choice: 10,
      computed_image_array: [],
      image_overlay_computed: [],
      image_caption_1: [],
      wois_data: [],
      image_overlay_selection: -1,
      second_question: false,
      image_overlay_selected: [],
      wois_options: [],
      wois_data: [],
      image_data: [],
      image_symbols: [],
      green_check: "&#x2705;",
      red_x: "&#10060;",
      green_x: "&#10062;",
      inverted_question_mark: "&#191;",
      question_mark: "&#10067;",
      wois_feature: [],
      scramble_image_array: [],
      show_feedback_modal: false,
      submit_disabled: true,
      continue_disabled: true,
      select_mode_0: true,
      select_mode_1: false,
      continue_mode: false,
      correct_answer_array: [],
      wois_unique_feature: [],
      wois_feature_unique: [],
      wois_saved_data: [{}],
      feedback_counter: 0,
      wois_selected: [],
      woisDisabled: false,
      first_question:true,
      second_questiosn_disabled: false,
      second_question_text:"test message",
      answer_incorrect: false,
      any_answer_correct: false,
      group_choice_array: [],
      operation_number: 0,
      answer_data: [],
      problem_data: {},
      show_length_short_feedback: false,
      show_length_long_feedback: false,
      length_short_feedback:
        "Your answer did not choose all of the elements with the correct property.  Be sure to look for all of the images with the indicated property.",
      length_long_feedback:
        "Your answer chose too many of the images as having the correct property.  Be sure to choose only those images with the indicated property.",
      new_data: {
        student_id: "",
        type: "which_one_is_special_prep_0",
        group_id: -1,
        selection_num: -1,
        correct_ans: -1,
        timestamp: Date.now(),
        operation: "",
        question_number: "",
        feedback_counter: -1,
        second_question_answer: -1,
        second_question_disabled:false,
      },
    };      
  },
  computed: {
    question_type: function () {
      console.log('getting question_type computed 533');
      console.log('group_choice ' + this.group_choice);
      console.log('wois_data ' + JSON.stringify(this.wois_data[this.group_choice]))
      return(this.wois_data[this.group_choice].type_data);
    },
    image_deck: function () {
      let start = this.group_choice * 4;
      let end = start + 4;
      return(this.image_data.slice(start, end));
    },
    wois_computed: function () {
      // console.log('wois options computed ' + this.wois_options);
      let start = this.group_choice * 4;
      let end = start + 4;
      return this.wois_options.slice(start, end);
    },
    image_0_computed: {
      get() {
        console.log('calculating image_0_computed')
        let start = this.group_choice * 4;
        console.log('start is ' + start)
        let image = this.image_data[start].image_name;
        console.log('image name is ' + image);
        return (image);
      },
      set(inputValue) {
        let start = this.group_choice * 4;
        this.image_data[start].image_name = inputValue;
      },
    },
    image_1_computed: {
      get() {
        let start = this.group_choice * 4 + 1;
        let image = this.image_data[start].image_name;
        return (image);
      },
      set(inputValue) {
        let start = this.group_choice * 4 + 1;
        this.image_data[start].image_name = inputValue;
      },
    },
    image_2_computed: {
      get() {
        let start = this.group_choice * 4 + 2;
        let image = this.image_data[start].image_name;
        return (image);
      },
      set(inputValue) {
        let start = this.group_choice * 4 + 2;
        this.image_data[start].image_name = inputValue;
      },
    },
    image_3_computed: {
      get() {
        let start = this.group_choice * 4 + 3;
        let image = this.image_data[start].image_name;
        return (image);
      },
      set(inputValue) {
        let start = this.group_choice * 4 + 3;
        this.image_data[start].image_name = inputValue;
      },
    },
  },
  created: function () {
    this.image_data = image_data_file;
    this.wois_options = wois_options_file;
    this.wois_data = wois_data_file;
  },
  mounted: function () {
    //this.image_data = image_data_file;
    //this.wois_options = wois_options_file;
    //this.wois_data = wois_data_file;
    
    this.image_exp_max = 12;
    this.computed_image_array[0] = this.image_0_computed;
    this.computed_image_array[1] = this.image_1_computed;
    this.computed_image_array[2] = this.image_2_computed;
    this.computed_image_array[3] = this.image_3_computed;
    this.image_overlay_computed[0] = "image-overlay";
    this.image_overlay_computed[1] = "image-overlay";
    this.image_overlay_computed[2] = "image-overlay-second-row";
    this.image_overlay_computed[3] = "image-overlay-second-row";
    this.group_choice = 7;
    this.group_choice_array.push(this.group_choice);
    if ((this.group_choice < this.image_exp_max) || 
    (this.group_choice >= this.image_exp_max && this.penn_exp_prop)) {
      this.image_0_text = this.image_deck[0].image_name;
      this.image_1_text = this.image_deck[1].image_name;
      this.image_2_text = this.image_deck[2].image_name;
      this.image_3_text = this.image_deck[3].image_name;
    } else {
      this.image_0_text = "";
      this.image_1_text = "";
      this.image_2_text = "";
      this.image_3_text = "";
    }
    this.image_overlay_selected = ((this.group_choice < this.image_exp_max) || (this.group_choice >= this.image_exp_max && this.penn_exp_prop))? [0,0,0,0] : ["","","",""] 
    this.image_caption_1[0] = ((this.group_choice < this.image_exp_max) || (this.group_choice >= this.image_exp_max && this.penn_exp_prop)) ? "Image A:" : "";
    this.image_caption_1[1] = ((this.group_choice < this.image_exp_max) || (this.group_choice >= this.image_exp_max && this.penn_exp_prop)) ? "Image B:" : "";
    this.image_caption_1[2] = ((this.group_choice < this.image_exp_max) || (this.group_choice >= this.image_exp_max && this.penn_exp_prop)) ? "Image C:" : "";
    this.image_caption_1[3] = ((this.group_choice < this.image_exp_max) || (this.group_choice >= this.image_exp_max && this.penn_exp_prop)) ? "Image D:" : "";
      
    
    this.which_one_is_special_prep_id = this.which_one_is_special_prep_id_prop;
    this.num_groups = this.which_one_is_special_prep_id == 0 ? 6 : 12;
    // either do 0 to 5 or 6 to 11
   /* this.group_choice = this.which_one_is_special_prep_id == 0
        ? Math.floor(Math.random() * this.num_groups)
        : Math.floor(Math.random() * this.num_groups) + 6;*/
   /* console.log(this.which_one_is_special_prep_id);
    console.log('wois_options' + JSON.stringify(this.wois_options[1]));
    console.log('wois_data' + JSON.stringify(this.wois_data[1]));
    console.log('image_data ' + JSON.stringify(this.image_data[1]));*/
    this.wois_feature = [
        "labeled with the top caption 'Image A:'",
        "which show(s) chocolate chips?",
        "of money which show(s) a value greather than 1200?",
        "that does not show the color red?",
        "where the value of the money is equal to 10 cents",
        "with an odd number of coins.",
        "which shows an image of an apple",
        "which shows a depiction of fruit",
        "that does not show the color red",
        "which shows more than 10 circles",
        "which shows an image of one or more squares",
        "which shows an even number of circles",
        "which does not contain the letter 'e'",
        "which contains a number",
        ... !this.penn_exp_prop ? ["labeled with a 'B'"]: ["labeled with 'Image B'"],
        "which contains a name for a mammal",
        "which contains a name of a bird",
        "which contains an English language word",
      ];
    this.wois_unique_feature = [
          "a top caption labeled 'Image A:'",
          "having chocolate chips",
          "showing a value greater than 1200",
          "that not showing the color red",
          "the value of the money equal to 10 cents",
          "that having an odd number of coins",
          "every image of an apple",
          "every image which depicts fruit",
          "no red color",
          "more than 10 circles",
          "every image of a square",
          "an even number of circles",
          "every statement which does not contain the letter 'e'",
          "a number",
          ... !this.penn_exp_prop ? ["every statement labeled with a 'B'"] : ["every image labeled 'Image B'"],
          "a word for a mammal",
          "a word for a bird",
          "an English language word",
        ];
    this.wois_feature_unique = [
        false, false, true, true, false, false, true, true, false,
        true, true, false, true, true, true, false, false, false
    ];
   // console.log('scrambling the first set of data')
   // this.wois_data[11].scrambled_order = this.scrambleImageArray(this.wois_data[11].original_order);
   // console.log('scrambled the first set of data ' + JSON.stringify(this.wois_data[11]));  
    console.log('wois_data before scramble ' + JSON.stringify(this.wois_data[14])); 
    for (let k = 0; k < this.wois_data.length; k++) {
      //scramble them before scrambling the answers. 
      this.wois_data[k].scrambled_order = this.scrambleImageArray(this.wois_data[k].original_order)      
      this.wois_data[k].first_question_second_answer = this.scrambleAnswerArray(
      this.wois_data[k].scrambled_order,
      this.wois_data[k].special_image_ans_id
      );
     }
   console.log('scramble order after ' + JSON.stringify(this.wois_data)); 
    this.first_question = true; 
    this.second_question_answer = -1;
    this.second_question = false;
    this.second_question_disabled = false; 
    console.log("props " + this.which_one_is_special_prep_id_prop + ':' + this.penn_exp_prop);
    console.log('group_choice ' + this.group_choice);
    console.log('question_type ' + this.question_type);
  },
    
  methods: {
    setImageOverlaySelected: function (index) {
      console.log('setting image overlay');
      if ((this.group_choice < this.image_exp_max) ||
      (this.group_choice >= this.image_exp_max && this.penn_exp_prop)) {
        this.image_overlay_selected[index] = 1;
      } else {
        this.image_overlay_selected[index] = "";
      }
    },
    clearImageOverlaySelected: function (index) {
      console.log('clearing Image Overlay');
      if ((this.group_choice < this.image_exp_max) ||
      this.group_choice >= this.image_exp_max && this.penn_exp_prop) {
        this.image_overlay_selected[index] = 0;
      } else {
        this.image_overlay_selected[index] = "";
      }
    },
    setSelectedFigCaption: function (index) {
      console.log("setting selected FigCaption");
    //  if (!this.image_caption_1[index].includes("&#x2611;")) {
    //    this.image_caption_1[index] = this.image_caption_1[index] 
      //    "<br/><span style='color:blue;font-size:18px;'>&#x2611;</span><span style='font-size:10px;text-align:left;'> Selected</span>";
    //  }
      if (this.image_overlay_selected[index] == 0) {
        this.setImageOverlaySelected(index);
      } else {
        this.clearImageOverlaySelected(index); 
      } 
      this.computeSubmitDisabled();
    },
     clearSelectedFigCaption: function (index) {
      if ((this.group_choice < this.image_exp_max) || (this.group_choice >= this.image_exp_max && this.penn_exp_prop)) {
        if (this.image_caption_1[index].includes("&#x2611;")) {
          if (index == 0) {
            this.image_caption_1[index] = "<b>Image A:</b>";
          } else if (index == 1) {
            this.image_caption_1[index] = "<b>Image B:</b>";
          } else if (index == 2) {
            this.image_caption_1[index] = "<b>Image C:</b>";
          } else if (index == 3) {
            this.image_caption_1[index] = "<b>Image D:</b>";
          }
        }
      } else {
        if (this.image_caption_1[index].includes("&#x2611;")) {
          if (index == 0) {
            this.image_caption_1[index] = "";
          } else if (index == 1) {
            this.image_caption_1[index] = "";
          } else if (index == 2) {
            this.image_caption_1[index] = "";
          } else if (index == 3) {
            this.image_caption_1[index] = "";
          }
        }
      }
       this.clearImageOverlaySelected(index);
       this.computeSubmitDisabled(); 
    },
    setSelectedCorrectFigCaption: function (index) {
      if (!this.image_caption_1[index].includes("Correct")) {
        this.image_caption_1[index] =
          this.image_caption_1[index] +
          "<span style='color:green;font-size:20px;'>&#x2611;</span>" +
          "<span style='font-size:12px;text-align:left;'><b>Selected and Correct</b></span>";
      }
    },
    setNotSelectedCorrectFigCaption: function (index) {
      if (!this.image_caption_1[index].includes("&#x2610;")) {
        this.image_caption_1[index] =
          this.image_caption_1[index] +
          "<span style='color:green;font-size:20px;'>&#x2611;</span>" +
          "<span style='font-size:12px;text-align:left;'><b>Not Selected and Correct</b></span>";
      }
    },
    setSelectedIncorrectFigCaption: function (index) {
      if (!this.image_caption_1[index].includes("&#x2612;")) {
        // red x
        this.image_caption_1[index] =
          this.image_caption_1[index] +
          "<span style='color:red;font-size:20px;'>&#x2612;</span>" +
          "<span style='font-size:12px;text-align:left;'><b>Selected and Incorrect</b></span>";
      }
    },
    setNotSelectedIncorrectFigCaption: function (index) {
      if (!this.image_caption_1[index].includes("&#2610;")) {
        // red x
        this.image_caption_1[index] =
          this.image_caption_1[index] +
          "<span style='color:red;font-size:20px;'>&#x2612;</span>" +
          "<span style='font-size:12px;text-align:left;'>Not Selected and Incorrect</span>";
      }
    },
    setNonSelectedFigCaption: function (index) {
      if (!this.image_caption_1[index].includes("&#10067;")) {
        // question mark
        this.image_caption_1[index] =
          "<span style='color:red'><b>&#10067;</b></span>" +
          this.image_caption_1[index];
      }
    },
    computeSubmitDisabled: function () {
      let sum = this.image_overlay_selected.reduce(
        (partialSum, a) => partialSum + a,
        0
      );
      if (sum > 0) {
        this.submit_disabled = false;
      } else {
        this.submit_disabled = true;
      }
    },
    selectImage: function (event) {
      console.log('Selected Image number :' + event);
      this.image_overlay_selection = -1;
      if (!this.second_question  && !this.continue_mode) {
        this.image_overlay_selection = event;

        if (!this.image_caption_1[event].includes("Selected")) {
          this.setSelectedFigCaption(event);
        } else {
          this.clearSelectedFigCaption(event);
        }
        this.computeImageOverlay(event);
      }  
    },
    computeImageOverlay: function (index) { // index is current action index
      let image_overlay_c = this.image_overlay_computed.slice();
      console.log('computingImageOverlay')
      console.log('select mode 0 ' + this.select_mode_0);
      console.log('select mode 1 ' + this.select_mode_1);
      console.log('continue_mode ' + this.continue_mode);
      console.log('input index ' + index);
      console.log('image_overlay_computed ' + this.image_overlay_computed);
      console.log('image_overlay_selected ' + this.image_overlay_selected);
      console.log('image_overlay_selection ' + this.image_overlay_selection);
      if (this.image_overlay_selection != -1) {
        if (this.select_mode_0 && !this.continue_mode) {
          console.log('inside select_mode_0 and not continue mode')
          this.image_overlay_selection = -1; //reset to stop back to back events. 
          if (index != -1) {
            for (let i = 0; i < this.image_overlay_computed.length; i++) {
             // console.log('i is ' + i);
             // console.log('index is ' + index);
             // console.log('image_overlay_c ' + image_overlay_c);
              if (i == index) {
                // toggle the answer
                console.log('i == index ');
                if (index == 0) {
                  console.log('resetting index = 0 ')
                  if (this.image_overlay_selected[i] == 1) {
                  //  image_overlay_c[index] =
                  //    "image-overlay-select";
                 //   console.log('image_overlay_selected ' + this.image_overlay_selected);
                 //   console.log('image_overlay_c before ' + image_overlay_c);

                    if (i < 2) {
                      image_overlay_c[i] =
                        "image-overlay-select";
                    } else {
                      image_overlay_c[i] =
                        "image-overlay-select-second-row";
                    }
                    // this.clearSelectedFigCaption(i);
                    // this.clearImageOverlaySelected(i);
               //     console.log('image_overlay_selected ' + this.image_overlay_selected);
               //      console.log('image_overlay_c after ' + image_overlay_c);

                  } else if (this.image_overlay_selected[i] == 0) {
                    if (i < 2) {
                      image_overlay_c[i] =
                        "image-overlay";
                    } else {
                      image_overlay_c[i] = "image-overlay-second-row"
                    }
                    //image_overlay_c[index] =
                    //  "image-overlay";
                    // this.setImageOverlaySelected(i);
                  }
                } else {
                  // image_overlay_selected has already been set elsewhere
                  // just update image_overlay_c
                  if (this.image_overlay_selected[i] == 1) {
                //    console.log('image_overlay_selected is a 1');
                    if (i < 2) {
                      image_overlay_c[i] =
                        "image-overlay-select";
                    } else {
                      image_overlay_c[i] =
                        "image-overlay-select-second-row";
                    }
                    // this.clearSelectedFigCaption(i);
                    // this.clearImageOverlaySelected(i);
                  } else if (this.image_overlay_selected[i] == 0) {
                    //console.log('image_overlay_select is 0');
                    if (i < 2) {
                      image_overlay_c[i] =
                        "image-overlay";
                    } else {
                      image_overlay_c[i] = "image-overlay-second-row"
                    }
                    // this.setImageOverlaySelected(i);
                  }
                }
              } else {
                // all others reset them to their previous values.
             //   console.log("resetting overlay to previous values");
                if (this.image_overlay_selected[i] == 1) {
              //    console.log('image_overlay_select is a 1 resetting')
                  if (i < 2) {
                    image_overlay_c[i] =
                      "image-overlay-select";
                  } else {
                    image_overlay_c[i] =
                      "image-overlay-select-second-row";
                  }
           //       image_overlay_c[i] = "image-overlay-select";
                } else {
               //   console.log('setting previous value 0')
                  if (i < 2) {
                    image_overlay_c[i] =
                      "image-overlay";
                  } else {
                    image_overlay_c[i] = "image-overlay-second-row"
                  }
                 // image_overlay_c[i] = "image-overlay";
                  //  this.clearSelectedFigCaption(i);
                }
              }
            }
          }
        } else if (
            this.continue_mode &&
            !this.select_mode_0 &&
            !this.select_mode_1
        )
        {
            //console.log("computed overlay continue_mode");
            this.image_overlay_selection = -1; //reset to stop back to back events. 
            for (let i = 0; i < this.correct_answer_array.length; i++) {
              //correct selected.
              if (this.correct_answer_array[i] == 1) {
                if (i < 2) {
                image_overlay_c[i] =
                  "image-overlay";
              } else {
                image_overlay_c[i] = "image-overlay-second-row"
              }
              //  image_overlay_c[i] = "image-overlay";
                this.setSelectedCorrectFigCaption(i);
              } else if (this.correct_answer_array[i] == 0) {
                // incorrect selected
                if (i < 2) {
                image_overlay_c[i] =
                  "image-overlay";
              } else {
                image_overlay_c[i] = "image-overlay-second-row"
              }
               // image_overlay_c[i] = "image-overlay";
                this.setSelectedIncorrectFigCaption(i);
              } else if (this.correct_answer_array[i] == -2) {
                //incorrect unselected
                if (i < 2) {
                image_overlay_c[i] =
                  "image-overlay";
              } else {
                image_overlay_c[i] = "image-overlay-second-row"
              }
              //  image_overlay_c[i] = "image-overlay";
                this.setNotSelectedIncorrectFigCaption(i);
              } else if (this.correct_answer_array[i] == -1) {
                //correct unselected
                if (i < 2) {
                image_overlay_c[i] =
                  "image-overlay";
              } else {
                image_overlay_c[i] = "image-overlay-second-row"
              }
                //image_overlay_c[i] = "image-overlay";
                this.setNotSelectedCorrectFigCaption(i);
              }
            }
          } else if (
            this.select_mode_1 &&
            !this.select_mode_0 &&
            !this.continue_mode
          ) {
           // console.log("select after continue");
           // console.log("correct_answer_array " + this.correct_answer_array);
            this.image_overlay_selection = -1; //reset to stop back to back events. 
            if (index != -1) {
              for (let i = 0; i < this.image_overlay_computed.length; i++) {
                if (i == index) {
                  // toggle the answer
                  if (this.image_overlay_selection == 0) {
                    if (this.image_overlay_selected[i] == 1) {
                      if (i < 2) {
                      image_overlay_c[i] =
                        "image-overlay-select";
                    } else {
                      image_overlay_c[i] =
                        "image-overlay-select-second-row";
                    }
                   //   image_overlay_c[i] =
                   //     "image-overlay-select";
                    //  this.setImageOverlaySelected(i);
                    //  this.setSelectedFigCaption(i);
                    } else if (this.image_overlay_selected[i] == 0) {
                      if (i < 2) {
                      image_overlay_c[i] =
                        "image-overlay";
                    } else {
                      image_overlay_c[i] = "image-overlay-second-row"
                    }
                     // image_overlay_c[index] =
                     //   "image-overlay";
                    //  this.clearImageOverlaySelected(i);
                    //  this.clearSelectedFigCaption(i);
                    }
                  } else {
                    if (this.image_overlay_selected[i] == 1) {
                      if (i < 2) {
                      image_overlay_c[i] =
                        "image-overlay-select";
                    } else {
                      image_overlay_c[i] =
                        "image-overlay-select-second-row";
                    }
                   //   image_overlay_c[index] =
                   //     "image-overlay-select";
                   //   this.setImageOverlaySelected(i);
                   //   this.setSelectedFigCaption(i);
                    } else if (this.image_overlay_selected[i] == 0) {
                      if (i < 2) {
                      image_overlay_c[i] =
                        "image-overlay";
                    } else {
                      image_overlay_c[i] = "image-overlay-second-row"
                    }
                     // image_overlay_c[index] =
                     //   "image-overlay";
                  //    this.clearImageOverlaySelected(i);
                  //    this.clearSelectedFigCaption(i);
                    }
                  }
                } else {
                  // all others reset them to their previous values.
                  //("resetting overlay to previous values");
                  if (this.image_overlay_selected[i] == 1) {
                    if (i < 2) {
                    image_overlay_c[i] =
                      "image-overlay-select";
                  } else {
                    image_overlay_c[i] =
                      "image-overlay-select-second-row";
                  }
           //         image_overlay_c[i] = "image-overlay-select";
                 //   this.setImageOverlaySelected(i);
                  } else {
                    if (i < 2) {
                    image_overlay_c[i] =
                      "image-overlay";
                  } else {
                    image_overlay_c[i] = "image-overlay-second-row"
                  }
         //           image_overlay_c[i] = "image-overlay";
         //           this.clearSelectedFigCaption(i);
                  }
                }
              }
          }
        }
        console.log('image_overlay_c bottom ' + image_overlay_c); 
          this.image_overlay_computed = image_overlay_c;
          console.log('image_overlay_computed new ' + this.image_overlay_computed)
      }
    },
    setInputAnswerArray: function () {
    console.log("setInputAnswerArray")
      this.image_symbols = [
        this.question_mark,
        this.question_mark,
        this.question_mark,
        this.question_mark,
      ];
      let arr = this.wois_selected;
      let arr0 = [];
      for (
        let i = 0;
        i < this.wois_data[this.group_choice].special_image_ans_id.length;
        i++
      ) {
        arr0.push(
          this.wois_data[this.group_choice].special_image_ans_id[i].value
        );
      }
      for (var i = 0; i < arr.length; i++) {
        let index = arr[i] % 4;
        if (arr0.includes(arr[i])) {
          this.image_symbols[index] = this.green_check;
        } else {
          this.image_symbols[index] = this.red_x;
        }
      }
      console.log('image_symbols ' + this.image_symbols)
    },
   
    scrambleAnswerArray: function (scrambledImageArray, originalAnswerArray) {
      console.log('SCRAMBLE ANSWER ARRAY')
      console.log('original answer array ' + JSON.stringify(originalAnswerArray));
      console.log('scrambled answer array ' + JSON.stringify(scrambledImageArray));
      let arr = []; // output array
      let val = "";
      let text = "";
      let max = Math.max(...scrambledImageArray);
      let g_choice = Math.floor(max / 4);
      if ( // group choice 0
        originalAnswerArray.length == 1 &&
        originalAnswerArray[0].image == "A" &&
        originalAnswerArray[0].value == 0
      ) {
        arr[0] = originalAnswerArray[0]; // no matter the images shuffled Image A is always the right answer for this question.
      } else if ( // this is group_choice 14
        originalAnswerArray.length == 1 &&
        originalAnswerArray[0].image == "Seven geese" &&
        originalAnswerArray[0].value == 57
      ) {
        //console.log("Setting the Only Statement B value")
        if (!this.penn_exp_prop) {  // text only
          arr[0] = {
            image: this.image_data[scrambledImageArray[1]].image_name,
            value: scrambledImageArray[1],
            text: this.image_data[scrambledImageArray[1]].image_name,
          };
        } else if (this.penn_exp_prop) { //text based images
          arr[0] = {
            image: this.image_data[scrambledImageArray[1]].image_name, //Image B is always the right answer
            value: scrambledImageArray[1],
            text: "B",
          };
        }
      } else {
        for (let i = 0; i < scrambledImageArray.length; i++) {
          for (let j = 0; j < originalAnswerArray.length; j++) {
            //console.log('i:j ' + i + ':' + j);
            if (originalAnswerArray[j].value == scrambledImageArray[i]) {
              if (i == 0) {
                if (g_choice < this.image_exp_max) {
                  val = "A";
                  text = "A";
                } else if (g_choice >= this.image_exp_max && !this.penn_exp_prop){
                  val = originalAnswerArray[j].image;
                  text = originalAnswerArray[j].image;
                } else if (g_choice >= this.image_exp_max && this.penn_exp_prop) {
                  val = originalAnswerArray[j].image;
                  text = "A";
                }
              } else if (i == 1) {
                if (g_choice < this.image_exp_max) {
                  val = "B";
                  text = "B"
                } else if (g_choice >= this.image_exp_max && !this.penn_exp_prop) {
                  val = originalAnswerArray[j].image;
                  text = originalAnswerArray[j].image;
                } else if (g_choice >= this.image_exp_max && this.penn_exp_prop) {
                  val = originalAnswerArray[j].image;
                  text = "B";
                }
              } else if (i == 2) {
                if (g_choice < this.image_exp_max) {
                  val = "C";
                  text = "C";
                } else if (g_choice >= this.image_exp_max && !this.penn_exp_prop) {
                  val = originalAnswerArray[j].image;
                  text = originalAnswerArray[j].image;
                } else if (g_choice >= this.image_exp_max && this.penn_exp_prop) {
                  val = originalAnswerArray[j].image;
                  text = "C";
                }
              } else if (i == 3) {
                if (g_choice < this.image_exp_max) {
                  val = "D";
                  text = "D";
                } else if (g_choice >= this.image_exp_max && !this.penn_exp_prop) {
                  val = originalAnswerArray[j].image;
                  text = originalAnswerArray[j].image;
                } else if (g_choice >= this.image_exp_max && this.penn_exp_prop) {
                  val = originalAnswerArray[j].image;
                  text = "D";
                }
              }
              arr.splice(i, 0, {
                image: val,
                value: originalAnswerArray[j].value,
                text:text,
              });
              break;
            }
          }
        }
      }
      console.log('scrambleImages output array ' + JSON.stringify(arr));
      return arr;
    },
    setFigureCaptionOnSubmit: function () {
      console.log('SetFigureCaptionOnSubmit')
      console.log('continue_mode ' + this.continue_mode);
      console.log('select_mode_0 ' + this.select_mode_0)
      console.log('select_mode_1 ' + this.select_mode_1)
      console.log('correct_answer_array ' + this.correct_answer_array);
      if (this.continue_mode && !this.select_mode_0 && !this.select_mode_1) {
  //console.log("computed overlay continue_mode");
      this.image_overlay_selection = -1; //reset to stop back to back events. 
      for (let i = 0; i < this.correct_answer_array.length; i++) {
        //correct selected.
        if (this.correct_answer_array[i] == 1) {
          this.setSelectedCorrectFigCaption(i);
        } else if (this.correct_answer_array[i] == 0) {
          // incorrect selected
          this.setSelectedIncorrectFigCaption(i);
        } else if (this.correct_answer_array[i] == -2) {
          //incorrect unselected
          this.setNotSelectedIncorrectFigCaption(i);
        } else if (this.correct_answer_array[i] == -1) {
          //correct unselected
          this.setNotSelectedCorrectFigCaption(i);
        }
      }
    }
    },
    recordWois: function () {
      // submit button
      console.log("RECORDING WOIS");
      // set the values based upon what is selected
      if ((this.group_choice < this.image_exp_max) || (this.group_choice >= this.image_exp_max && this.penn_exp_prop)) {
        this.wois_selected = this.image_overlay_selected;
      }
      console.log('group_choice ' + this.group_choice);
      console.log('wois_selected ' + this.wois_selected);
      console.log('first_question ' + this.first_question);
      console.log('second_question ' + this.second_question);
      var new_data = {};
      if (this.first_question) {
        if (this.wois_selected.length > 0) {
          // stop extra timing event.
          this.setInputAnswerArray(); // set the feedback.
          this.operation_number++;
          let c_answer = null;
          if (this.feedback_counter < 1) {
            c_answer = this.wois_data[this.group_choice].special_image_ans_id;
            // wois_selected matches unscrambled answers
          } else {  // 2nd answers and 2nd questions
            c_answer =
              this.wois_data[this.group_choice].first_question_second_answer;
          }
          console.log('c_answer in RECORDING WOIS' + JSON.stringify(c_answer)); 
          var answer_is_correct = null;
          if (this.group_choice < this.image_exp_max) {
            answer_is_correct = this.isImageAnswerCorrect(
              c_answer,
              this.wois_selected
            );
          } else if (this.group_choice >= this.image_exp_max && !this.penn_exp_prop) {
            answer_is_correct = this.isTextAnswerCorrect(
              c_answer,
              this.wois_selected
            );
            console.log('called isTextAnswerCorrect and got ' + answer_is_correct);
          } else if (this.group_choice >= this.image_exp_max && this.penn_exp_prop) { // not sure about this
            console.log('Pennasota text image');
            console.log('c_answer ' + JSON.stringify(c_answer)); 
            console.log('wois_selected ' + this.wois_selected); 
            answer_is_correct = this.isTextAnswerCorrect( 
              c_answer,
              this.wois_selected
            );
          }
          console.log('answer is correct ' + answer_is_correct);
          console.log('c_answer is ' + JSON.stringify(c_answer));
          console.log('wois_selected ' + this.wois_selected);
          // change the classes on the images by finding which answer is correct
          let correctAnswerArray = this.whichAnswerIsCorrect(
            c_answer,
            this.wois_selected
          );
          console.log('correctAnswerArray ' + JSON.stringify(correctAnswerArray));
          this.correct_answer_array = correctAnswerArray;
          this.answer_incorrect = !answer_is_correct;
          this.anyAnswerCorrect = this.isAnyAnswerCorrect(
            c_answer,
            this.wois_selected
          );
          let typ = "";
          if (this.which_one_is_special_prep_id == 0) {
            typ = "which_one_is_special_prep_0";
          } else if (this.which_one_is_special_prep_id == 1 && !this.penn_exp_prop) {
            typ = "which_one_is_special_prep_1";
          } else if (this.which_one_is_special_prep_id == 1 && this.penn_exp_prop) {
            typ = "which_one_is_special_prep_2";
          }
          new_data = {
            student_id: this.student_id,
            type_data: typ,
            group_id: this.group_choice,
            operation_number: this.operation_number,
            selection_array: this.wois_selected,
            correct_ans_first_round:
              this.wois_data[this.group_choice].special_image_ans_id,
            correct_ans_second_round:
              this.wois_data[this.group_choice].first_question_second_answer,
            timestamp: Date.now(),
            operation: answer_is_correct
              ? "wois_store_answer_correct"
              : "wois_store_answer_incorrect",
            question_number: this.first_question
              ? "first_question"
              : "second_question",
            feedback_counter: this.feedback_counter,
          };
          let fqsa =
            this.wois_data[this.group_choice].first_question_second_answer; // Format is {image: "A", value:'0'}
          console.log('wois_data ' + JSON.stringify(this.wois_data[this.group_choice]));
          console.log('fqsa ' + JSON.stringify(fqsa));
          // get the images and sort them alphabetically
          let fqsa_i = [];
          for (let i = 0; i < fqsa.length; i++) {
            fqsa_i.push(fqsa[i].image);
          }
          console.log('fqsa_i before sorting ' + JSON.stringify(fqsa_i));
          //sort when using images but only images not text inside images. 
          if (this.group_choice < this.image_exp_max) {
            fqsa_i.sort();
            console.log('fqsa_i after sorting ' + JSON.stringify(fqsa_i));
          }
          
          let st_arr = [];
          // update computed_image_array 
          this.computed_image_array[0] = this.image_0_computed;
          this.computed_image_array[1] = this.image_1_computed;
          this.computed_image_array[2] = this.image_2_computed;
          this.computed_image_array[3] = this.image_3_computed;
          console.log('computed_image_array ' + this.computed_image_array);
          for (let i = 0; i < this.computed_image_array.length; i++) {
            for (let j = 0; j < fqsa_i.length; j++) {
              if (this.group_choice == 14) {
                st_arr.push("B");
                break;
              } else if (fqsa_i[j] == this.computed_image_array[i]) {
                if (i == 0) {
                  st_arr.push("A");
                } else if (i == 1) {
                  st_arr.push("B");
                } else if (i == 2) {
                  st_arr.push("C");
                } else if (i == 3) {
                  st_arr.push("D");
                } else {
                  console.log("Bad Input");
                }
              }
            }
          }
          console.log('st_arr ' + st_arr);
          let qfm = "";
          if (this.group_choice == 0) {
            qfm = "The correct answer is <b>Image A</b>";
          } else {
            if (!answer_is_correct) {
              qfm = "Not Quite. " + qfm;
            }
            if ((this.group_choice < this.image_exp_max)) {
              qfm = "The correct answer is <b>Image " + fqsa_i[0] + "</b>";
            } else if (this.group_choice >= this.image_exp_max && !this.penn_exp_prop) {
              qfm =
                "The correct answer is <b>Statement " +
                st_arr[0] +
                ":(" +
                fqsa_i[0] +
                ")</b>";
            } else if (this.group_choice >= this.image_exp_max && this.penn_exp_prop) {
              qfm =
                "The correct answer is <b>Image " +
                st_arr[0] +
                ":(" +
                fqsa_i[0] +
                ")</b>";
            }
            for (let i = 1; i < fqsa.length; i++) {
              if ((this.group_choice < this.image_exp_max)) {
                qfm = qfm + " and <b>Image " + fqsa_i[i] + "</b>";
              } else if (this.group_choice >= this.image_exp_max && !this.penn_exp_prop) {
                qfm =
                  qfm +
                  " and <b>Statement " +
                  st_arr[i] +
                  ":(" +
                  fqsa_i[i] +
                  ")</b>";
              } else if (this.group_choice >= this.image_exp_max && this.penn_exp_prop) {
                  qfm = qfm + 
                    " and <b>Image " +
                    st_arr[i] +
                    ":(" +
                    fqsa_i[i] +
                    ")</b>";
                }
            }
          }
          qfm = qfm + "."
          if ((this.group_choice < this.image_exp_max)) {
            qfm =
              qfm +
              " The image(s) contain <b>" +
              this.wois_unique_feature[this.group_choice] +
              "</b>.";
          } else if (this.group_choice >= this.image_exp_max && !this.penn_exp_prop){
            qfm =
              qfm +
              ". The statement(s) contain <b>" +
              this.wois_unique_feature[this.group_choice] +
              "</b>.";
          } else if (this.group_choice >= this.image_exp_max && this.penn_exp_prop) {
            qfm =
              qfm +
              " The image(s) contain <b>" +
              this.wois_unique_feature[this.group_choice] +
              "</b>.";
          }
          console.log('qfm ' + qfm);
          console.log('feedback_counter ' + this.feedback_counter);
          console.log('first question ' + this.first_question)
          console.log('second question ' + this.second_question);
          console.log('answer_is_correct ' + answer_is_correct);
          // check for the need for feedback.
         
          if (answer_is_correct) {
            qfm = "Congratulations! " + qfm;
            this.show_feedback_modal = true;
            if (this.feedback_counter < 1) {
              var index =
                this.wois_data[this.group_choice].special_image_ans_id[0].value;
              if (!this.penn_exp_prop) {
                this.question_feedback_message =
                  this.wois_options[index].feedback_1;
              } else {
                let fb = this.wois_options[index].feedback_1.replaceAll('Statement', 'Image');
                let fb0 = fb.replaceAll('statement', 'image');
                this.question_feedback_message = fb0 ; 
              }
            } else {
              this.question_feedback_message = qfm;
              this.image_overlay_selected = [0, 0, 0, 0];
            }
            this.feedback_counter++;
            this.answer_data.push(new_data);
            if ((this.group_choice < this.image_exp_max) || (this.group_choice >= this.image_exp_max && this.penn_exp_prop)) {
              this.second_question_text =
                "<b>True</b> or <b>False</b>: the highlighted image (<b>Image A</b>) is the only one <b>" +
                this.wois_feature[this.group_choice] +
                "</b>";
            } else {
              this.second_question_text =
                "<b>True</b> or <b>False</b>: <b>Statement A</b> in the <b>Correct Answer</b> is the only statement <b>" +
                this.wois_feature[this.group_choice] +
                "</b>";
            }
          } else {
            // answer is incorrect
            console.log('answer is incorrect');
            if (this.feedback_counter < 1) {
              console.log('feedback counter is ' + this.feedback_counter);
              this.answer_data.push(new_data);
              this.submit_disabled = true;
             // this.show_feedback_modal = true;
              this.submit_disabled = true;
              if ((this.group_choice < this.image_exp_max) || (this.group_choice >= this.image_exp_max && this.penn_exp_prop)) {
                this.question_feedback_message =
                  this.wois_options[this.wois_selected[0]].feedback_0;
                //console.log('image feedback ' + this.wois_options[this.wois_selected[0]].feedback_0);
              } else { // statements
                let start = this.group_choice * 4;
                let end = start + 4;
                let index = -1;
                for (let i = 0; i < end; i++) {
                  if (
                    this.image_data[start + i].image_name ==
                    this.wois_selected[0]
                  ) {
                    index = this.image_data[start + i].row_id;
                    break;
                  }
                }
                if (index > -1) {
                  this.question_feedback_message =
                    this.wois_options[index].feedback_0;
                } else {
                  this.question_feedback_message = "";
                }
                this.calculateStatementFeedback();
              }
              this.feedback_counter++;
              this.computeHighlights(); // highlight on the first try only
              this.continue_mode = true; // show feedback.
              this.select_mode_0 = false; // turn off select_mode_0
               this.setFigureCaptionOnSubmit(); // set the figure caption on each submit
            } else if (this.feedback_counter == 1) {
              // given one set of feedback store the data and move on.

              this.show_feedback_modal = true;
              this.question_feedback_message = qfm;
              this.answer_data.push(new_data);
              this.feedback_counter++;
              this.correctProp = false; // resetting correctProp
              this.answer_incorrect = false;

              if ((this.group_choice < this.image_exp_max) || (this.group_choice >= this.image_exp_max && this.penn_exp_prop)) {
                this.second_question_text =
                  "<b>True</b> or <b>False</b>: the highlighted image (<b>Image A</b>) is the only one <b>" +
                  this.wois_feature[this.group_choice] +
                  "</b>";
              } else {http://localhost:3000/which-one-is-special-vue3/#/WhichOneIsSpecialPrep_1
                this.second_question_text =
                  "<b>True</b> or <b>False</b>: <b>Statement A</b> in the <b> Correct Answer</b> is the only statement <b>" +
                  this.wois_feature[this.group_choice] +
                  "</b>";
              }
            }
            console.log('continue_mode ' + this.continue_mode);
            console.log('show feedback modal ' + this.show_feedback_modal);
            console.log('feedback_counter end ' + this.feedback_counter);
            console.log('answer_incorrect ' + this.answer_incorrect); 
          }
        }
      } else if (this.second_question) {
        var second_answer_is_correct =
          this.wois_data[this.group_choice].second_question_answer ==
          this.second_question_answer;
        this.second_answer_correct = second_answer_is_correct;
        console.log('second_answer_correct is ' + this.second_answer_correct);
        this.operation_number++; // increment the operation number
        if (!second_answer_is_correct) {
          this.show_feedback_modal = true;
          this.question_feedback_message =
            this.wois_data[this.group_choice].feedback_0;
        } else {
          // correct answer
          this.show_feedback_modal = true;
          let prp = "Image";
          if ((this.group_choice < this.image_exp_max) || (this.group_choice >= this.image_exp_max && this.penn_exp_prop)) {
            prp = "Image";
          } else {
            prp = "Statement";
          }
          if (this.wois_data[this.group_choice].second_question_answer == 0) {
            this.question_feedback_message =
              "Congratulations! You are correct. The correct answer <b>does not</b> reflect a property of <b>" +
              prp +
              " A</b> and only <b>" +
              prp +
              " A</b>.";
          } else {
            this.question_feedback_message =
              "Congratulations! You are correct.  The correct answer is a unique property of <b>" +
              prp +
              " A</b>.";
          }
        }
      }
      console.log('show_feedback_modal ' + this.show_feedback_modal);
      console.log('question_feedback_message ' + this.question_feedback_message);
    },
    isImageAnswerCorrect: function (correctAnswer, inputAnswer) {
      // arrays are the same type
      console.log('isImageAnswerCorrect ')
          console.log("correct_answer before sort" + JSON.stringify(correctAnswer));
          console.log("input answer before sort " + inputAnswer); // need to convert this to correct form.
      //get the data from wois_options
      let ans = "";
      if ((this.group_choice < this.image_exp_max)) {
        ans = this.translateImageAnswer(inputAnswer);
      } else if ((this.group_choice >= this.image_exp_max) && !this.penn_exp_prop){
        ans = this.translateTextAnswer(inputAnswer); // need new translate code
      } else if ((this.group_choice >= this.image_exp_max && this.penn_exp_prop)) {
        ans = this.translateTextImageAnswer(inputAnswer); 
      } else {
        console.log('Bad Choice IsImageAnswerCorrect');
      }
      console.log('ans is ' + JSON.stringify(ans));
      let arr = [];
      for (let i = 0; i < correctAnswer.length; i++) {
        arr.push(correctAnswer[i].value);
      }
      console.log('arr is ' + arr);
      if (this.first_question) {
        if (arr.length > ans.length) this.show_length_short_feedback = true;
        else if (arr.length < ans.length) this.show_length_long_feedback = true;
        else {
          this.show_length_long_feedback = false;
          this.show_length_short_feedback = false;
        }
        if (arr.length !== ans.length) return false;
        if ((this.group_choice < this.image_exp_max)) { // only sort on pure images
          arr.sort();
        }
        console.log('arr after sort ' + arr);
        for (var i = 0; i < arr.length; i++) {
          if (arr[i] !== ans[i].value) return false;
        }
        return true;
      } else if (this.second_question) {
        // not giving feedback at the moment
        // just return true

        return true;
      }
    },
    isTextAnswerCorrect: function (correctAnswer, inputAnswer) {
      // arrays are the same type
      let ans = []
      if (this.group_choice >= this.image_exp_max && !this.penn_exp_prop) {
        ans = this.translateTextAnswer(inputAnswer); // need new input translator from [Abc,def] to [48, 49]
      } else if (this.group_choice >= this.image_exp_max && this.penn_exp_prop) {
        ans = this.translateTextImageAnswer(inputAnswer); 
      }
      console.log('translateTextAnswer ans ' + JSON.stringify(ans));
      console.log('input correct answer ' + JSON.stringify(correctAnswer)); 
      let arr = [];
      if ((this.group_choice < this.image_exp_max) || (this.group_choice >= this.image_exp_max && this.penn_exp_prop)) {
        for (let i = 0; i < correctAnswer.length; i++) {
          arr.push(correctAnswer[i].image);
        }
      } else { // don't need to translate for statement answers. 
        arr = correctAnswer; 
      }
      console.log('isTextAnswerCorrect arr ' + JSON.stringify(arr));
      console.log('first_question ' + this.first_question);
      console.log('ans length ' + ans.length);
      console.log('arr length ' + arr.length);
      if (this.first_question) {
        console.log('first question is true');
        if (arr.length > ans.length) {
          this.show_length_short_feedback = true;
        } else if (arr.length < ans.length) {
          this.show_length_long_feedback = true;
        } else {
          this.show_length_long_feedback = false;
          this.show_length_short_feedback = false;
        }
        console.log('comparing lengths'); 
        if (arr.length !== ans.length) {
          console.log("lengths are not equal returning false");
          return false;
        } 
        // only sort on images not statement.
        if ((this.group_choice < this.image_exp_max)) { // only sort on pure images 
          console.log('sorting the answer ');
          arr.sort();
        }
        // need to correct order of answers.
        console.log('arr is ' + JSON.stringify(arr));
        console.log('ans is ' + JSON.stringify(ans));
        if ((this.group_choice < this.image_exp_max)) {
          for (var i = 0; i < arr.length; i++) {
            if (arr[i] !== ans[i].value)
              return false;
          }
        } else if ((this.group_choice >= this.image_exp_max && this.penn_exp_prop)) {
          for (var i = 0; i < arr.length; i++) {
            if (arr[i] !== ans[i].image)
              return false;
          }
        } else {
          for (var i = 0; i < arr.length; i++) {
            if ((arr[i].image != ans[i].image) && (arr[i].value != ans[i].value)) {
              console.log('returning false match i value ' + i);
              return false;
            }
          }
        }
        console.log('returning true because all answers matched');
        return true;
      } else if (this.second_question) {
        // not giving feedback at the moment
        // just return true

        return true;
      }
      console.log('No return paths found; Returning true');
      return true;
    },
    isAnyAnswerCorrect: function (correctAnswer, inputAnswer) {
      //("any answer correct method");
      //console.log("correctAnswer " + JSON.stringify(correctAnswer));
      //console.log("inputAnswer " + inputAnswer);
      let ans = "";
      if ((this.group_choice < this.image_exp_max)) {
        ans = this.translateImageAnswer(inputAnswer);
      } else if (this.group_choice >= this.image_exp_max && !this.penn_exp_prop){
        ans = this.translateTextAnswer(inputAnswer); // need new translation
      } else if (this.group_choice >= this.image_exp_max && this.penn_exp_prop) {
        ans = this.translateTextImageAnswer(inputAnswer);  
      }
      let arr = [];
      let ans_value = [];
      if (this.feedback_counter < 1) {
        for (let i = 0; i < correctAnswer.length; i++) {
          arr.push(correctAnswer[i].value);
        }
      } else {
        for (let i = 0; i < correctAnswer.length; i++) {
          arr.push(correctAnswer[i].value);
        }
      }
      for (let i = 0; i < ans.length; i++) {
        ans_value.push(ans[i].value);
      }
      if (this.first_question) {
        if ((this.group_choice < this.image_exp_max)) { // only sort on pure images
          arr.sort();
        }
        const found = arr.some((r) => ans_value.indexOf(r) >= 0);
        //console.log("found is " + found);
        return found;
      } else if (this.second_question) {
        return true;
      }
    },
    translateTextAnswer: function (inputAnswer) {
      console.log('translateTextAnswer input ' + JSON.stringify(inputAnswer));
      let group = this.group_choice;
      let start = group * 4;
      let ans = [];
      for (let i = 0; i < 4; i++) {
        for (let j = start; j < start + 4; j++) {
          if (inputAnswer[i] == this.image_data[j].image_name) {
            let image_string = this.image_data[j].image_name;
            ans.push({
              image: image_string,
              value: j,
            });
          }
        }
      }
      console.log('output text answer ' + JSON.stringify(ans));
      return ans;
    },
    translateTextImageAnswer: function (inputAnswer) {
      console.log('translateTextImageAnswer input ' + JSON.stringify(inputAnswer));
      let group = this.group_choice;
      let start = group * 4;
      let ans = [];
      let j = start; 
      for (let i = 0; i < 4; i++) {
        j = start + i
          if (inputAnswer[i] == 1) {
            let image_string = this.image_data[j].image_name;
            let t1 = "";
            if (i == 0) t1 = "A";
            else if (i == 1) t1 = "B";
            else if (i == 2) t1 = "C";
            else if (i == 3) t1 = "D";
            else console.log('Bad input translate text image')
            ans.push({
              image: image_string,
              value: this.image_data[j].row_id,
              text: t1
            });
        }
      }
      console.log('output textImage answer ' + JSON.stringify(ans));
      return ans;
    },
    translateImageAnswer: function (inputAnswer) {
      console.log('translateImageAnswer input ' + JSON.stringify(inputAnswer));
      console.log("type of value in array " + typeof(inputAnswer[0]))
      let group = this.group_choice;
      let start = group * 4;
      let ans = [];
      for (let i = 0; i < 4; i++) {
        if (inputAnswer[i] == 1) {
          let image_string = this.wois_options[start + i].text.split(" ")[1];
          console.log('image_string is ' + image_string);
          ans.push({
            image: image_string,
            value: this.wois_options[start + i].value,
          });
        }
      }
      return ans;
    },
    whichAnswerIsCorrect: function (correctAnswer, inputAnswer) {
      let correctAnsArray = [-1, -1, -1, -1]; //  -2 unselected incorrect -1 unselected correct, 0 selected incorrect, 1 selected correct
      let ans = "";
      if (this.group_choice < this.image_exp_max) {
        ans = this.translateImageAnswer(inputAnswer); // e.g. [4,5,6]
      } else if (this.group_choice >= this.image_exp_max && !this.penn_exp_prop){
        ans = this.translateTextAnswer(inputAnswer); // need new translate answer
      } else if ((this.group_choice >= this.image_exp_max && this.penn_exp_prop)) {
        ans = this.translateTextImageAnswer(inputAnswer); 
      }
      console.log('whichAnswerIsCorrect correct_answer' + JSON.stringify(correctAnswer));
      console.log('whichAnswerIsCorrect input_answer ' + inputAnswer);
      console.log('translated answer ans' + JSON.stringify(ans));
      let start = this.group_choice * 4;
      let arr = [];
      let ansArr = [];
      let image_arr = [];
      let image_ans_arr = [];
      for (let i = 0; i < correctAnswer.length; i++) {
        arr.push(correctAnswer[i].value);
        image_arr.push(correctAnswer[i].image);
      } //e.g. [5,6]
      for (let i = 0; i < ans.length; i++) {
        ansArr.push(ans[i].value);
        image_ans_arr.push(ans[i].image);
      }
      if ((this.group_choice < this.image_exp_max)) { // only sort on pure images
        arr.sort();
      }
      console.log('arr is ' + arr);
      console.log('ansArr is ' + ansArr);
      console.log('image_ans_array ' + image_ans_arr);
      console.log('image array ' + image_arr); 
      let match = false;
      for (var i = 0; i < ansArr.length; i++) {
        // input Answers  selected answers
        match = false;
        for (let j = 0; j < arr.length; j++) {
          console.log('i and j ' + i + ':' + j);
          if (arr[j] === ansArr[i]) {
            // its selected and correct
            //console.log("match");
            // make sure using image tags.
            if (image_arr[j] == image_ans_arr[i]) {
              console.log("exact match");
              if (ansArr[i] == start) {
                correctAnsArray[start % 4] = 1;
                match = true;
              } else if (ansArr[i] == start + 1) {
                correctAnsArray[(start + 1) % 4] = 1;
                match = true;
              } else if (ansArr[i] == start + 2) {
                correctAnsArray[(start + 2) % 4] = 1;
                match = true;
              } else if (ansArr[i] == start + 3) {
                correctAnsArray[(start + 3) % 4] = 1;
                match = true;
              }
            }
          }
        }
        if (match == false) {
          // no match to correct answwer
          console.log("correctAnswerArray top false match " + correctAnsArray);
          if (ansArr[i] == start) {
            correctAnsArray[start % 4] = 0; // selected but incorrect.
          } else if (ansArr[i] == start + 1) {
            correctAnsArray[(start + 1) % 4] = 0;
          } else if (ansArr[i] == start + 2) {
            correctAnsArray[(start + 2) % 4] = 0;
          } else if (ansArr[i] == start + 3) {
            correctAnsArray[(start + 3) % 4] = 0;
          }
          //      console.log("correctAnswerArray false match " + correctAnsArray);
        }
      }
      // now get the unselected answers and compare them to the correct answers
      //    console.log("setting unselected answers");
      for (let k = 0; k < correctAnsArray.length; k++) {
        if (correctAnsArray[k] == -1) {
          // unselected
          for (let j = 0; j < arr.length; j++) {
            //correctAnswers
            let ans_index = arr[j] % 4;
            if (ans_index == k) {
              // it should have been selected but wasn't set
              //        console.log("setting unselected incorrect ");
              correctAnsArray[k] = -2;
              break; //break out of inner loop
            }
          }
        }
      }
      console.log('correctAnsArray bottom ' + correctAnsArray);
      return correctAnsArray;
    },
    computeHighlights: function () {
      // if the answer is correct highlight image 0
      //   console.log("Computing Highlights");
      this.image_caption_0 = "";
      if ((this.group_choice < this.image_exp_max) || (this.group_choice >= this.image_exp_max && this.penn_exp_prop)) {
        this.image_overlay_selected = [0, 0, 0, 0]; // reset the selections on the 2nd attempt
        this.image_caption_1 = [
          "<b>Image A:</b>",
          "<b>Image B:</b>",
          "<b>Image C:</b>",
          "<b>Image D:</b>",
        ];
      } else {
        this.image_caption_1 = ["", "", "", ""];
        this.image_overlay_selected = ["", "", "", ""];
      }
      this.b_color_0 = "yellow-background";
      this.b_color_1 = "no-background";
      this.b_color_2 = "no-background";
      this.b_color_3 = "no-background";
      this.blue_image_phrase = "";
      this.blue_images = [];
      // now change the ones that need changing.
      //  console.log("wois_selected " + this.wois_selected);
      // var cf_0 = "Your Answer:"
      this.uniqueProp = false;
      this.correctProp = false;
      for (var i = 0; i < this.wois_selected.length; i++) {
        let ind = this.wois_selected[i];
        this.uniqueProp &&= this.image_data[ind].uniqueProp;
        this.correctProp &&= this.image_data[ind].correctProp;
      }
      this.continue_disabled = this.correctProp;
    },
    clickContinue: function () {
      console.log("Continue Button");
      console.log("select mode 0 " + this.select_mode_0);
      console.log("continue mode " + this.continue_mode);
      console.log("select_mode_1 " + this.select_mdoe_1);
      this.wois_selected = []; // erase answer
      if ((this.group_choice < this.image_exp_max) || (this.group_choice >= this.image_exp_max && this.penn_exp_prop)) {
        this.image_overlay_selected = [0, 0, 0, 0]; // reset the selections on the 2nd attempt
        this.image_caption_1 = [
          "<b>Image A:</b>",
          "<b>Image B:</b>",
          "<b>Image C:</b>",
          "<b>Image D:</b>",
        ];
        //reset the colors on the images 
        this.image_overlay_computed[0] = "image-overlay";
        this.image_overlay_computed[1] = "image-overlay";
        this.image_overlay_computed[2] = "image-overlay-second-row";
        this.image_overlay_computed[3] = "image-overlay-second-row";
        this.image_overlay_selection = -1;
        this.correct_answer_array = [-1, -1, -1, -1];
      } else {
        this.image_overlay_selected = ["", "", "", ""]; // reset the selections on the 2nd attempt
        this.image_caption_1 = ["", "", "", ""]; // clearing out the image caption for the statements. 
      }
      this.submit_disabled = true;
      this.show_feedback_modal = false; // remove the feedback once they have hit continue
      // need to scramble the picture array here for use later...
      // update the computed image array with the values from the actual GUI
      this.computed_image_array[0] = this.image_0_computed;
      this.computed_image_array[1] = this.image_1_computed;
      this.computed_image_array[2] = this.image_2_computed;
      this.computed_image_array[3] = this.image_3_computed;
      console.log('computed_image_array ' + this.computed_image_array)
      
      //this.wois_data[this.group_choice].scrambled_order = this.scrambleImageArray(this.wois_data[this.group_choice].original_order)
      //console.log('wois_data after scramble ' + JSON.stringify(this.wois_data[this.group_choice]));
      this.scramble_image_array = this.scrambleImages(this.computed_image_array);
      console.log("scramble_image_array after scramble " + this.scramble_image_array);
     // this.computed_image_array = this.scramble_image_array;
      this.image_0_computed = this.scramble_image_array[0];
      this.image_1_computed = this.scramble_image_array[1];
      this.image_2_computed = this.scramble_image_array[2];
      this.image_3_computed = this.scramble_image_array[3];

      // scramble the answers as well.  This should be scrambling them twice
    //  this.wois_data[this.group_choice].first_question_second_answer = this.scrambleAnswerArray(
    //  this.wois_data[this.group_choice].scrambled_order,
    //  this.wois_data[this.group_choice].special_image_ans_id
    //  );
      
      this.continue_disabled = true; // disable it for the next answer.
      this.select_mode_0 = false;
      this.image_overlay_selection = -1;
      this.correct_answer_array = [-1, -1, -1, -1];
      this.continue_mode = false;
      this.select_mode_1 = true;
    },
    modalCloseEvent: function () {
      console.log("modal close event");
      console.log("first question " + this.first_question);
      console.log("2nd_question " + this.second_question);
      this.show_feedback_modal = false;
      // clear out the image captions
      if (this.first_question) {
        //console.log("Inside first question loop");
        if ((this.group_choice < this.image_exp_max) || (this.group_choice >= this.image_exp_max && this.penn_exp_prop)) {
          this.image_caption_0 = "";
          this.image_caption_1 = [
            "<b>Image A:</b>",
            "<b>Image B:</b>",
            "<b>Image C:</b>",
            "<b>Image D:</b>",
          ];
          this.image_overlay_selected = [0, 0, 0, 0];
          this.image_overlay_computed[0] = "image-overlay";
          this.image_overlay_computed[1] = "image-overlay";
          this.image_overlay_computed[2] = "image-overlay-second-row";
          this.image_overlay_computed[3] = "image-overlay-second-row";
          this.image_overlay_selection = -1;
          this.correct_answer_array = [-1, -1, -1, -1];
        } else {
          //statements
          this.image_overlay_selected = ["", "", "", ""]; // reset the selections on the 2nd attempt
          this.image_caption_1 = ["", "", "", ""];
        }
        this.select_mode_0 = false;
        this.continue_mode = false;
        this.select_mode_1 = true;
      }
      if (this.second_question) {
        // after closing the modal on the 2nd question go to the next operation.
        console.log('second_question_answer 2027 ' + this.second_question_answer);
        console.log('wois data second_question answer ' + this.wois_data[this.group_choice].second_question_answer);
        let typ = "";
        if (this.which_one_is_special_prep_id == 0) {
          typ = "which_one_is_special_prep_0"
        } else if (this.which_one_is_special_prep_id == 1 && !this.penn_exp_prop) {
          typ = "which_one_is_special_prep_1";
        } else if (this.which_one_is_special_prep_id == 2 && this.penn_exp_prop) {
          typ = "which_one_is_special_prep_2"
        }   
        var new_data = {
          student_id: this.student_id,
          type_data: typ,
          group_id: this.group_choice,
          operation_number: this.operation_number,
          selection_array: [this.second_question_answer], // array of size one.
          correct_ans: this.wois_data[this.group_choice].second_question_answer,
          timestamp: Date.now(),
          operation: this.second_answer_correct
            ? "wois_prep_store_second_answer_correct"
            : "wois_prep_store_second_answer_incorrect",
          question_number: this.first_question
            ? "first_question"
            : "second_question",
          feedback_counter: this.feedback_counter,
        };
        this.anyAnswerCorrect = false;
        this.feedback_counter++;
        this.answer_data.push(new_data);
        console.log('group_choice_array ' + this.group_choice_array);
        if (this.group_choice_array.length < this.num_groups) {
          this.group_choice = this.chooseGroupChoice();
          console.log('new group_choice ' + this.group_choice);
          this.group_choice_array.push(this.group_choice);
          
          // reset the images
          //new question disable the submit button
          this.submit_disabled = true;
          this.wois_selected = []; //clear out the answser
          this.first_question = true;
          this.second_question = false;
          this.woisDisabled = false; // reset for the next question.
          this.second_question_answer = -1; // reset the the true/false.
          this.continue_disabled = true;
          this.feedback_counter = 0;
          this.image_overlay_selected = [0, 0, 0, 0];
          this.correct_answer_array = [-1, -1, -1, -1];
          this.select_mode_0 = true; // go back to the initial state to start over.
          this.continue_mode = false;
          this.select_mode_1 = false;
          console.log('group_choice_array after new choice ' + this.group_choice_array);
          console.log('image_0_computed ' + this.image_0_computed);
          console.log('question_type ' + this.question_type);
          console.log('first_question ' + this.first_question);
          console.log('wois_feature: ' + this.wois_feature[this.group_choice])

          if ((this.group_choice < this.image_exp_max) || (this.group_choice >= this.image_exp_max && this.penn_exp_prop)) {
            this.image_overlay_selected = [0, 0, 0, 0]; // reset the selections on the 2nd attempt
            this.image_caption_1 = [
              "<b>Image A:</b>",
              "<b>Image B:</b>",
              "<b>Image C:</b>",
              "<b>Image D:</b>",
            ];
            this.image_overlay_computed[0] = "image-overlay";
            this.image_overlay_computed[1] = "image-overlay";
            this.image_overlay_computed[2] = "image-overlay-second-row";
            this.image_overlay_computed[3] = "image-overlay-second-row";
          } else {
            this.image_overlay_selected = ["", "", "", ""]; // reset the selections on the 2nd attempt
            this.image_caption_1 = ["", "", "", ""];
          }
        } else {
          // push the data and move to the survey
          console.log("pushing_data to amazon");

          this.problem_data = {
            student_id: this.student_id,
            experiment_id: this.which_one_is_special_id,
            type: "submit_answers",
            problem_data: this.answer_data,
          };

          // done all of the problems.
          console.log('emiting event')
          this.$emit("save-data", this.problem_data);
          // go to the Survey page page
          this.$router.push("/Survey");
        }
      }
      // this is where I want to change from first question to second.
      //console.log("feedback counter modal " + this.feedback_counter);
      if (
        this.feedback_counter == 2 ||
        (!this.answer_incorrect && this.feedback_counter >= 1)
      ) {
        console.log('setting second question to true'); 
        this.second_question = true;
        this.first_question = false;
        this.woisDisabled = true; // disable the checkboxes on the second question.
        // need to set them to the correct answer  Answer is 'first_question_second_answer'
        // order is computed_image_array;  Checked boxes are wois_selected
        if (this.feedback_counter == 2 && this.group_choice >= this.image_exp_max && !this.penn_exp_prop) {
          // reset wois_selected
          this.wois_selected = [];
          for (
            let i = 0;
            i <
            this.wois_data[this.group_choice].first_question_second_answer
              .length;
            i++
          ) {
            let ans =
              this.wois_data[this.group_choice].first_question_second_answer[i];
            for (let j = 0; j < this.computed_image_array.length; j++) {
              if (this.computed_image_array[j] == ans.image) {
                //set the checked value
                this.wois_selected.push(ans.image);
                //console.log('answer equals computed_image_array.')
                break;
              }
            }
          }
        }

        // set the caption on the image(s) which are correct using the check mark etc.
        console.log('checking if statement in modal close event' + this.feedback_counter + ':' + this.group_choice + ':' + this.penn_exp_prop);
        if (this.feedback_counter == 2 && ((this.group_choice < this.image_exp_max) || (this.group_choice >= this.image_exp_max && this.penn_exp_prop)))
        {
          console.log('inside first if calculating several_images')
          this.image_overlay_computed[0] = "image-overlay-highlight";
          this.image_overlay_computed[1] = "image-overlay";
          this.image_overlay_computed[2] = "image-overlay-second-row-second-question";
          this.image_overlay_computed[3] = "image-overlay-second-row-second-question";
          for (
            let i = 0;
            i <
            this.wois_data[this.group_choice].first_question_second_answer
              .length;
            i++
          ) {
            if (
              this.wois_data[this.group_choice].first_question_second_answer[i]
                .text == "A"
            ) {
              this.setSelectedCorrectFigCaption(0);
            } else if (
              this.wois_data[this.group_choice].first_question_second_answer[i]
                .text == "B"
            ) {
              this.setSelectedCorrectFigCaption(1);
            } else if (
              this.wois_data[this.group_choice].first_question_second_answer[i]
                .text == "C"
            ) {
              this.setSelectedCorrectFigCaption(2);
            } else if (
              this.wois_data[this.group_choice].first_question_second_answer[i]
                .text == "D"
            ) {
              this.setSelectedCorrectFigCaption(3);
            }
          }

          if (
            this.wois_data[this.group_choice].first_question_second_answer
              .length > 1
          ) {
            console.log('setting second_question_answer to zero 2195');
            this.wois_data[this.group_choice].second_question_answer = 0;

            let several_images = "<b>Image ";
            for (
              let i = 0;
              i <
              this.wois_data[this.group_choice].first_question_second_answer
                .length - 1;
              i++
            ) {
              console.log('i is ' + i);
              let p1 = this.group_choice < this.image_exp_max ? this.wois_data[this.group_choice].first_question_second_answer[i].image :
                this.wois_data[this.group_choice].first_question_second_answer[i].text
              let p2 = this.group_choice < this.image_exp_max ? "" :
                ":(" + this.wois_data[this.group_choice].first_question_second_answer[i].image + ")";
              console.log('p1 first question is ' + p1);
              console.log('p2 first question is ' + p2);
              several_images =
                several_images + p1 + p2 
                 +
                "</b> and <b>Image ";
            }
            let p3 = this.group_choice < this.image_exp_max ? this.wois_data[this.group_choice].first_question_second_answer[this.wois_data[this.group_choice].first_question_second_answer.length - 1].image :
              this.wois_data[this.group_choice].first_question_second_answer[this.wois_data[this.group_choice].first_question_second_answer.length - 1].text
             let p4 = this.group_choice < this.image_exp_max ? "" :
              ":(" + this.wois_data[this.group_choice].first_question_second_answer[this.wois_data[this.group_choice].first_question_second_answer.length - 1].image + ")";
              console.log('p3 is ' + p3);
            console.log('p4 is ' + p3);    
            several_images =
              several_images +
              p3 + p4 +
              "</b>";
            console.log('several images before use image section ' + several_images);
            this.wois_data[this.group_choice].feedback_0 =
              "Not Quite. " +
              several_images +
              " demonstrate <b>" +
              this.wois_unique_feature[this.group_choice] +
              "</b> so <b>" +
              this.wois_unique_feature[this.group_choice] +
              "</b> cannot be <b><i>unique</i></b> to only <b>Image A</b>.";
          } else if (
            this.wois_data[this.group_choice].first_question_second_answer[0]["text"] != "A" 
            // text will always label the image in these cases. 
          ) {
            // length is 1 so only one answer to check
            console.log('setting second_question_answer to zero 2242');
            this.wois_data[this.group_choice].second_question_answer = 0;
            let p1 = this.group_choice < this.image_exp_max ? this.wois_data[this.group_choice].first_question_second_answer[0].image :
              this.wois_data[this.group_choice].first_question_second_answer[0].text
            let p2 = this.group_choice < this.image_exp_max ? "" :
              ":(" + this.wois_data[this.group_choice].first_question_second_answer[0].image + ")";
            this.wois_data[this.group_choice].feedback_0 =
              "The correct answer is <b>Image " + p1 + p2 + 
             // this.wois_data[this.group_choice].first_question_second_answer[0]["image"] +
              "</b> so <b>" +
              this.wois_unique_feature[this.group_choice] +
              "</b> cannot be a unique property of <b>Image A</b>.";
          } else {
            console.log('setting second_question_answer to one 2255');
            this.wois_data[this.group_choice].second_question_answer = 1;
            this.wois_data[this.group_choice].feedback_0 =
              "The correct answer is <b>Image A</b> and only <b>Image A</b> so <b>" +
              this.wois_unique_feature[this.group_choice] +
              "</b> must be a <b><i>unique</i></b> property of <b>Image A</b>.";
          }
        } else if (
          !this.answer_incorrect &&
          this.feedback_counter >= 1 &&
          ((this.group_choice < this.image_exp_max))
        ) {
          console.log('inside second if correct answer ' + this.answer_incorrect); 
          this.image_overlay_computed[0] = "image-overlay-highlight";
          this.image_overlay_computed[1] = "image-overlay";
          this.image_overlay_computed[2] = "image-overlay-second-row-second-question";
          this.image_overlay_computed[3] = "image-overlay-second-row-second-question";
          for (
            let i = 0;
            i < this.wois_data[this.group_choice].special_image_ans_id.length;
            i++
          ) {
            if (
              this.wois_data[this.group_choice].special_image_ans_id[i].text ==
              "A"
            ) {
              this.setSelectedCorrectFigCaption(0);
            } else if (
              this.wois_data[this.group_choice].special_image_ans_id[i].text ==
              "B"
            ) {
              this.setSelectedCorrectFigCaption(1);
            } else if (
              this.wois_data[this.group_choice].special_image_ans_id[i].text ==
              "C"
            ) {
              this.setSelectedCorrectFigCaption(2);
            } else if (
              this.wois_data[this.group_choice].special_image_ans_id[i].text ==
              "D"
            ) {
              this.setSelectedCorrectFigCaption(3);
            }
          }
          if (
            this.wois_data[this.group_choice].special_image_ans_id.length > 1
          ) {
            console.log('setting second_question_answer to zero 2302');
            this.wois_data[this.group_choice].second_question_answer = 0;
            let several_images = "<b>Image ";
            for (
              let i = 0;
              i <
              this.wois_data[this.group_choice].special_image_ans_id.length - 1;
              i++
            ) {
              let p1 = this.group_choice < this.image_exp_max ? this.wois_data[this.group_choice].special_image_ans_id[i].image :
                this.wois_data[this.group_choice].special_image_ans_id[i].text
              let p2 = this.group_choice < this.image_exp_max ? "" :
                (":(" + this.wois_data[this.group_choice].special_image_ans_id[i].image + ")");
              several_images =
                several_images + p1 + p2 +
                //this.wois_data[this.group_choice].special_image_ans_id[i].image +
                "</b> and <b>Image ";
            }
             let p3 = this.group_choice < this.image_exp_max ? this.wois_data[this.group_choice].special_image_ans_id[this.wois_data[this.group_choice].special_image_ans_id.length - 1].image :
              this.wois_data[this.group_choice].special_image_ans_id[this.wois_data[this.group_choice].special_image_ans_id.length - 1].text
            let p4 = this.group_choice < this.image_exp_max ? "" :
              "(" + this.wois_data[this.group_choice].first_question_second_answer[special_image_ans_id.length - 1].image + ")";
            several_images =
              several_images + p3 + p4 +
              //this.wois_data[this.group_choice].special_image_ans_id[
              //  this.wois_data[this.group_choice].special_image_ans_id.length -
              //  1
              //].image +
              "</b>";
            console.log('several images before use image section 2' + several_images);
            this.wois_data[this.group_choice].feedback_0 =
              "Not Quite. " +
              several_images +
              " demonstrate <b>" +
              this.wois_unique_feature[this.group_choice] +
              "</b> so <b>" +
              this.wois_unique_feature[this.group_choice] +
              "</b> cannot be a unique property of only <b>Image A</b>.";
          } else if (
            this.wois_data[this.group_choice].special_image_ans_id[0]["text"] != "A"
          ) {
            // length is 1 so only one answer to check
            let p1 = this.group_choice < this.image_exp_max ? this.wois_data[this.group_choice].special_image_ans_id[0].image :
              this.wois_data[this.group_choice].special_image_ans_id[0].text
            let p2 = this.group_choice < this.image_exp_max ? "" :
              ":(" + this.wois_data[this.group_choice].special_image_ans_id[0].image + ")";
              console.log('setting second_question_answer to zero 2347');
            this.wois_data[this.group_choice].second_question_answer = 0;
            this.wois_data[this.group_choice].feedback_0 =
              "The correct answer is <b>Image " + p1 + p2 +
              //this.wois_data[this.group_choice].special_image_ans_id[0]["image"] +
              "</b> so <b>" +
              this.wois_unique_feature[this.group_choice] +
              "</b> cannot be a <b><i>unique</i></b> property of <b>Image A</b>.";
          } else {
            this.wois_data[this.group_choice].special_image_ans_id = 1;
            this.wois_data[this.group_choice].feedback_0 =
              "The correct answer is <b>Image A</b> and only <b>Image A</b> so <b>" +
              this.wois_unique_feature[this.group_choice] +
              "</b> is a unique property of <b>Image A</b>.";
          }
        }
      }
      console.log('feedback_counter 2365 ' + this.feedback_counter)
      console.log('answer_incorrect ' + this.answer_incorrect);
      if (
        this.feedback_counter == 2 ||
        (!this.answer_incorrect && this.feedback_counter >= 1)
      ) {
        this.second_question = true;
        this.first_question = false;
        this.second_question_disabled = false; 
        this.woisDisabled = true; // disable the checkboxes on the second question.
        // need to set them to the correct answer  Answer is 'first_question_second_answer'
        // when they did not get it correct the first time.  Answer is special_image_ans_id when
        // feedback counter is 1 
        // order is computed_image_array;  Checked boxes are wois_selected
        // statements not as images. 
        if (this.feedback_counter == 2 && ((this.group_choice >= this.image_exp_max && !this.penn_exp_prop)))
        {
          // reset wois_selected
          this.wois_selected = [];
          for (
            let i = 0;
            i <
            this.wois_data[this.group_choice].first_question_second_answer
              .length;
            i++
          ) {
            let ans =
              this.wois_data[this.group_choice].first_question_second_answer[i];
            for (let j = 0; j < this.computed_image_array.length; j++) {
              if (this.computed_image_array[j] == ans.image) {
                //set the checked value
                this.wois_selected.push(ans.image);
                //console.log('answer equals computed_image_array.')
                break;
              }
            }
          }
        }
        console.log('statment loop 2403')
        // set the caption on the image(s) which are correct using the check mark etc.
        let fqsa =
          this.wois_data[this.group_choice].first_question_second_answer; // Format is {image: "A", value:'0'}
        let fqsa_i = [];
        for (let i = 0; i < fqsa.length; i++) {
          fqsa_i.push(fqsa[i].image);
        }
        if (this.group_choice < this.image_exp_max) { // only sort on pure images
          fqsa_i.sort();
        }
        let st_arr = [];
        for (let i = 0; i < this.computed_image_array.length; i++) {
          for (let j = 0; j < fqsa_i.length; j++) {
            if (fqsa_i[j] == this.computed_image_array[i]) {
              if (this.group_choice == 14) {
                st_arr.push("B");
                break;
              } else if (i == 0) {
                st_arr.push("A");
              } else if (i == 1) {
                st_arr.push("B");
              } else if (i == 2) {
                st_arr.push("C");
              } else if (i == 3) {
                st_arr.push("D");
              } else {
                console.log("Bad Input");
              }
            }
          }
        }
        if (this.feedback_counter == 2 && this.group_choice >= this.image_exp_max && !this.penn_exp_prop)
        {  // statements
          console.log('feedback counter == 2 2437')
          if (
            this.wois_data[this.group_choice].first_question_second_answer
              .length > 1
          ) {
            console.log('setting second_question_answer to zero 2438');
            this.wois_data[this.group_choice].second_question_answer = 0;

            let several_images = "<b>Statement ";
            for (
              let i = 0;
              i <
              this.wois_data[this.group_choice].first_question_second_answer
                .length -
              1;
              i++
            ) {
              several_images =
                several_images +
                st_arr[i] +
                ":(" +
                this.wois_data[this.group_choice].first_question_second_answer[
                  i
                ].image +
                ") " +
                "</b> and <b>Statement ";
            }
            several_images =
              several_images +
              st_arr[st_arr.length - 1] +
              ":(" +
              this.wois_data[this.group_choice].first_question_second_answer[
                this.wois_data[this.group_choice].first_question_second_answer
                  .length - 1
              ].image +
              ") </b>";
              console.log('several_images statement section 1 ' + several_images)
            this.wois_data[this.group_choice].feedback_0 =
              "Not Quite. " +
              several_images +
              " demonstrate <b>" +
              this.wois_unique_feature[this.group_choice] +
              "</b> so <b>" +
              this.wois_unique_feature[this.group_choice] +
              "</b> cannot be <b><i>unique</i></b> to only <b>Statement A</b>.";
          } else if (
            this.wois_data[this.group_choice].first_question_second_answer[0][
            "image"
            ] != this.computed_image_array[0]
          ) {
            // length is 1 so only one answer to check
            console.log('setting second_question_answer to zero 2485');
            this.wois_data[this.group_choice].second_question_answer = 0;
            this.wois_data[this.group_choice].feedback_0 =
              "The correct answer is <b>Statement " +
              st_arr +
              ":(" +
              this.wois_data[this.group_choice].first_question_second_answer[0][
              "image"
              ] +
              ")</b> so <b>" +
              this.wois_unique_feature[this.group_choice] +
              "</b> cannot be a unique property of <b>Statement A</b>.";
          } else {
            // correct selection of statement A
            console.log('setting second_question_answer to one 2498');
            this.wois_data[this.group_choice].second_question_answer = 1;
            this.wois_data[this.group_choice].feedback_0 =
              "Congratulations! You are correct. The correct answer is <b>Statement A</b> and only <b>Statement A</b> so <b>" +
              this.wois_unique_feature[this.group_choice] +
              "</b> must be a <b><i>unique</i></b> property of <b>Statement A</b>.";
          }
        } else if (
          !this.answer_incorrect &&  // correct answer 
          this.feedback_counter >= 1 &&
          this.group_choice >= this.image_exp_max && !this.penn_exp_prop
        ) {
          // statements
          console.log('inside several images using statements 2515')
          if (
            this.wois_data[this.group_choice].special_image_ans_id.length > 1
          ) {
            console.log('setting second_question_answer to zero 2516');
            this.wois_data[this.group_choice].second_question_answer = 0;
            let several_images = "<b>Statement ";
            for (
              let i = 0;
              i <
              this.wois_data[this.group_choice].special_image_ans_id.length - 1;
              i++
            ) {
              several_images =
                several_images +
                st_arr[i] +
                ":(" +
                this.wois_data[this.group_choice].special_image_ans_id[i]
                  .image +
                ")</b> and <b>Statement ";
            }
            several_images =
              several_images +
              st_arr[st_arr.length - 1] +
              ":(" +
              this.wois_data[this.group_choice].special_image_ans_id[
                this.wois_data[this.group_choice].special_image_ans_id.length -
                1
              ].image +
              ")</b> ";
            console.log('several images statement section 2 ' + several_images);
            this.wois_data[this.group_choice].feedback_0 =
              "Not Quite. <b>" +
              several_images +
              "</b> demonstrate <b>" +
              this.wois_unique_feature[this.group_choice] +
              "</b> so <b>" +
              this.wois_unique_feature[this.group_choice] +
              "</b> cannot be a unique property of only <b>Statement A</b>.";
          } else if (
            this.wois_data[this.group_choice].special_image_ans_id[0][
            "image"
            ] != this.computed_image_array[0]
          ) {
            // length is 1 so only one answer to check
            console.log('setting second_question_answer to zero 2556');
            this.wois_data[this.group_choice].second_question_answer = 0;
            this.wois_data[this.group_choice].feedback_0 =
              "Not Quite! The correct answer is <b>Statement" + st_arr[0] + ":(" +
            this.wois_data[this.group_choice].special_image_ans_id[0]["image"] +
              ")</b> so <b>" +
              this.wois_unique_feature[this.group_choice] +
              "</b> cannot be a <b><i>unique</i></b> property of <b>Statement A</b>.";
          } else {
            this.wois_data[this.group_choice].special_image_ans_id = 1;
            this.wois_data[this.group_choice].feedback_0 =
              "Congratulations! You are correct. The correct answer is <b>Statement A</b> and only <b>Statement A</b> so <b>" +
              this.wois_unique_feature[this.group_choice] +
              "</b> is a unique property of <b>Statement A</b>.";
          }
        }  else if (
          !this.answer_incorrect &&  // correct answer 
          this.feedback_counter >= 1 &&
          this.group_choice >= this.image_exp_max && this.penn_exp_prop
        ) {
          // images
          this.image_overlay_computed[0] = "image-overlay-highlight";
          this.image_overlay_computed[1] = "image-overlay";
          this.image_overlay_computed[2] = "image-overlay-second-row-second-question";
          this.image_overlay_computed[3] = "image-overlay-second-row-second-question";
          console.log('setting correct fig caption for 2nd answer')
          for (
            let i = 0;
            i < this.wois_data[this.group_choice].special_image_ans_id.length;
            i++
          ) {
            if (
              this.wois_data[this.group_choice].special_image_ans_id[i].text ==
              "A"
            ) {
              this.setSelectedCorrectFigCaption(0);
            } else if (
              this.wois_data[this.group_choice].special_image_ans_id[i].text ==
              "B"
            ) {
              this.setSelectedCorrectFigCaption(1);
            } else if (
              this.wois_data[this.group_choice].special_image_ans_id[i].text ==
              "C"
            ) {
              this.setSelectedCorrectFigCaption(2);
            } else if (
              this.wois_data[this.group_choice].special_image_ans_id[i].text ==
              "D"
            ) {
              this.setSelectedCorrectFigCaption(3);
            }
          }
          console.log('inside several images using images 2581')
          console.log('computed_image_array[0] ' + this.computed_image_array[0]);
          if (
            this.wois_data[this.group_choice].special_image_ans_id.length > 1
          ) {
            console.log('setting second_question_answer to zero 2584');
            this.wois_data[this.group_choice].second_question_answer = 0;
            let several_images = "<b>Image ";
            for (
              let i = 0;
              i <
              this.wois_data[this.group_choice].special_image_ans_id.length - 1;
              i++
            ) {
              several_images =
                several_images +
                st_arr[i] +
                ":(" +
                this.wois_data[this.group_choice].special_image_ans_id[i]
                  .image +
                ")</b> and <b>Image ";
            }
            several_images =
              several_images +
              st_arr[st_arr.length - 1] +
              ":(" +
              this.wois_data[this.group_choice].special_image_ans_id[
                this.wois_data[this.group_choice].special_image_ans_id.length -
                1
              ].image +
              ")</b> ";
            console.log('several images statement section 2 ' + several_images);
            this.wois_data[this.group_choice].feedback_0 =
              "Not Quite. <b>" +
              several_images +
              "</b> demonstrate <b>" +
              this.wois_unique_feature[this.group_choice] +
              "</b> so <b>" +
              this.wois_unique_feature[this.group_choice] +
              "</b> cannot be a unique property of only <b>Image A</b>.";
          } else if (
            this.wois_data[this.group_choice].special_image_ans_id[0]["image"] != this.computed_image_array[0]
          ) {
            // length is 1 so only one answer to check
            console.log('setting second_question_answer to zero 2624');
            this.wois_data[this.group_choice].second_question_answer = 0;
            this.wois_data[this.group_choice].feedback_0 =
              "Not Quite! The correct answer is <b>Image " + st_arr[0] + ":(" +
            this.wois_data[this.group_choice].special_image_ans_id[0]["image"] +
              ")</b> so <b>" +
              this.wois_unique_feature[this.group_choice] +
              "</b> cannot be a <b><i>unique</i></b> property of <b>Image A</b>.";
          } else {
            this.wois_data[this.group_choice].second_question_answer = 1;
            console.log('second_answer_correct ' + this.second_answer_correct);
            if (this.second_answer_correct) {
              this.wois_data[this.group_choice].feedback_0 =
                "Congratulations! You are correct. The correct answer is <b>Image A</b> and only <b>Image A</b> so <b>" +
                this.wois_unique_feature[this.group_choice] +
                "</b> is a unique property of <b>Image A</b>.";
            } else { // incorrect second answer after first correct answer
                this.wois_data[this.group_choice].feedback_0 =
                "Not Quite! The correct answer is only <b>Image " + st_arr[0] + ":(" +
                  this.wois_data[this.group_choice].special_image_ans_id[0]["image"] +
                  ")</b> so <b>" +
                  this.wois_unique_feature[this.group_choice] +
                  "</b> must be a <b><i>unique</i></b> property of <b>Image A</b>.";
            }
          }
        }
      }
    },
     calculateStatementFeedback: function () {
      //console.log('statement feedback wois_selected' + JSON.stringify(this.wois_selected));
      //console.log('correct answers first question' + JSON.stringify(this.wois_data[this.group_choice].special_image_ans_id));
      //console.log('correct answer 2nd chance ' + JSON.stringify(this.wois_data[this.group_choice].first_question_second_answer));
      //console.log('correct answer 2nd question ' + JSON.stringify(this.wois_data[this.group_choice].second_question_answer));
      //console.log('feedback counter ' + this.feedback_counter);
      // compare the answers to the correct answers
      // 4 cases
      // 1) correct selected
      // 2) correct not selected
      // 3) incorrect selected
      // 4) incorrect not selected
      let correct = [false, false, false, false];
      let selected = [false, false, false, false];
      let answers = [];
      let correct_answers = [];
      let start = this.group_choice * 4;
      let end = start + 4;
      if (this.feedback_counter < 1) {
        // first set of answers.
        // correct selected  first set of answers
        start = this.group_choice * 4;
        for (let i = 0; i < this.wois_selected.length; i++) {
          // inputs
          for (
            let j = 0;
            j < this.wois_data[this.group_choice].special_image_ans_id.length;
            j++
          ) {
            if (
              this.wois_selected[i] ==
              this.wois_data[this.group_choice].special_image_ans_id[j].image
            ) {
              answers.push(
                this.wois_data[this.group_choice].special_image_ans_id[j].image
              );
              let index = -1;
              for (let k = start; k < start + 4; k++) {
                if (
                  this.image_data[k].image_name ==
                  this.wois_data[this.group_choice].special_image_ans_id[j]
                    .image
                ) {
                  index = this.image_data[k].id;
                  break;
                }
              }
              correct[index] = true;
              selected[index] = true;
            }
          }
        }
        // selected
        for (let i = start; i < end; i++) {
          let choice = this.image_data[i].image_name;
          for (let j = 0; j < this.wois_selected.length; j++) {
            // inputs
            if (choice == this.wois_selected[j]) {
              let ind = i % 4;
              selected[ind] = true;
            }
          }
        }
        for (
          let i = 0;
          i < this.wois_data[this.group_choice].special_image_ans_id.length;
          i++
        ) {
          correct_answers.push(
            this.wois_data[this.group_choice].special_image_ans_id[i].image
          );
        }
        // not selected correct (selected is false and choice is not part of correct answer)
        for (let i = 0; i < selected.length; i++) {
          let choice = this.image_data[start + i].image_name;
          if (!selected[i] && !correct_answers.includes(choice)) {
            correct[i] = true;
          }
        }
        for (let i = 0; i < correct.length; i++) {
          if (correct[i] && selected[i]) {
            this.setSelectedCorrectFigCaption(i);
          } else if (correct[i] && !selected[i]) {
            this.setNotSelectedCorrectFigCaption(i);
          } else if (!correct[i] && selected[i]) {
            this.setSelectedIncorrectFigCaption(i);
          } else if (!correct[i] && !selected[i]) {
            this.setNotSelectedIncorrectFigCaption(i);
          } else {
            console.log("No match. Something is wrong.");
          }
        }
      }
    },
    chooseGroupChoice: function () {
      //   console.log("choosing group_choice");
      var new_group_choice = this.group_choice_array[0];
      var counter = 0;
      while (
        this.group_choice_array.includes(new_group_choice) &&
        counter < 100
      ) {
        // prevent infinite loop.
        if (this.which_one_is_special_prep_id == 0) {
          new_group_choice = Math.floor(Math.random() * this.num_groups);
        } else {
          new_group_choice = Math.floor(Math.random() * this.num_groups) + 6;
        }
        counter++;
      }
      if (counter < 100) {
        return new_group_choice;
      } else {
        // unable to get new random value after 100 tries so just pick one
        // since there are only 5 choices just pick one with a for loop
        if (this.which_one_is_special_prep_id == 0) {
          if (!this.group_choice_array.includes(0)) {
            return 0;
          } else if (!this.group_choice_array.includes(1)) {
            return 1;
          } else if (!this.group_choice_array.includes(2)) {
            return 2;
          } else if (!this.group_choice_array.includes(3)) {
            return 3;
          } else if (!this.group_choice_array.includes(4)) {
            return 4;
          } else if (!this.group_choice_array.includes(5)) {
            return 5;
          } else {
            console.log("unable to pick a new choice. 0-5");
          }
        } else {
          if (!this.group_choice_array.includes(6)) {
            return 6;
          } else if (!this.group_choice_array.includes(7)) {
            return 7;
          } else if (!this.group_choice_array.includes(8)) {
            return 8;
          } else if (!this.group_choice_array.includes(9)) {
            return 9;
          } else if (!this.group_choice_array.includes(10)) {
            return 10;
          } else if (!this.group_choice_array.includes(11)) {
            return 11;
          } else if (!this.group_choice_array.includes(12)) {
            return 12;
          } else if (!this.group_choice_array.includes(13)) {
            return 13;
          } else if (!this.group_choice_array.includes(14)) {
            return 14;
          } else if (!this.group_choice_array.includes(15)) {
            return 15;
          } else if (!this.group_choice_array.includes(16)) {
            return 16;
          } else if (!this.group_choice_array.includes(17)) {
            return 17;
          } else {
            console.log("unable to pick a new choice. 6-17");
          }
        }
      }
    },
     submitEnabled: function (e) {
       console.log("submit enabled");
       console.log("submit enabled answer: " + JSON.stringify(e));
      if (this.first_question) {
        if (e.length >= 0) {
          this.submit_disabled = false;
        } else {
          this.submit_disabled = true;
        }
        this.wois_selected = e;
        if (this.group_choice > 11) {
          this.image_overlay_selection = e; // text based answer
          //  console.log('text selection image_overlay_selection ' + this.image_overlay_selection);
        }
      } else if (this.second_question) {
        this.submit_disabled = false;
        console.log('second_question_answer 2821' + JSON.stringify(this.second_question_answer))
       // this.second_question_answer = e;
       // console.log('second_question_answer after ' + JSON.stringify(this.second_question_answer));
      }
    },
    scrambleImages: function (computed_image_array) {
      console.log("SCRAMBLE IMAGES");
      var output_array = ["", "", "", ""];
      var o_array = this.wois_data[this.group_choice].original_order;
      var s_array = this.wois_data[this.group_choice].scrambled_order;
      //console.log('wois_data ' + JSON.stringify(this.wois_data[this.group_choice]))
      //console.log('s_array ' + s_array);
      //console.log('group choice ' + this.group_choice);
      for (var i = 0; i < o_array.length; i++) {
        var old_index = o_array[i];
        //console.log("old_index " + old_index);
        for (var j = 0; j < s_array.length; j++) {
          //  console.log('s_array[j] ' + s_array[j])
          //  console.log('i and j ' + i + ':' + j);
          if (old_index === s_array[j]) {
            var new_index = j;
            //  console.log('new index scramble images ' + new_index);
            output_array.splice(new_index, 1, computed_image_array[i]); // i should work because they are in order
            //  console.log('scrambled image array in progress' + JSON.stringify(output_array));
            break;
          }
        }
      }
      // use the scrambled order to change wois_options values not text
      // have to change feedback_1 as well to match the scrambled order.
      let wois_options_filter = this.wois_options.filter(
        (wois) => wois.group_id == this.group_choice
      );
      //console.log('wois_options_filter before' + JSON.stringify(wois_options_filter))
      for (let i = 0; i < wois_options_filter.length; i++) {
        wois_options_filter[i].value = s_array[i];
      }
      for (let i = 0; i < this.wois_options.length; i++) {
        if (this.wois_options.group_id == this.group_choice) {
          for (let j = 0; j < wois_options_filter.length; j++) {
            if (wois_options_filter[j].text == this.wois_options[i].text) {
              this.wois_options[i].value = wois_options_filter[j].value;
            }
          }
        }
      }
      //console.log('wois_options_filter after' + JSON.stringify(wois_options_filter))
      // console.log('wois_options after ' + JSON.stringify(this.wois_options));
      // console.log('scrambled image array ' + JSON.stringify(output_array));
      return output_array;
    },
    scrambleImageArray: function (input_array) {
      console.log('scrambleImageArray input_array' + JSON.stringify(input_array));
      let copy_a = [...input_array];
      var tmp,
        current,
        top = copy_a.length;
      while (JSON.stringify(copy_a) == JSON.stringify(input_array)) {
        if (top)
          while (--top) {
            current = Math.floor(Math.random() * (top + 1));
            tmp = copy_a[current];
            copy_a[current] = copy_a[top];
            copy_a[top] = tmp;
          }
      }
      console.log('output from scrambleImageArray' + JSON.stringify(copy_a));
      return copy_a;
    },
    getImageUrl: function (filename) {
     //vue 3 version. 
      return new URL(`../../assets/images/${filename}`, import.meta.url).href

    },
    loadImagedata: function () {
      console.log('loading JSON Image data')
    }
        
    }
});
</script>


<style scoped>
table,
th,
td {
  border: 1px solid black;
  margin-left: 40%;
}

.yellow-background {
  background-color: #f4cd4080;
  border: 1px solid black;
}

.blue-background {
  background-color: rgba(58, 66, 220, 0.5);
  border: 1px solid black;
}

.blue-with-yellow-background {
  background-color: rgba(58, 66, 220, 0.5);
  border: 3px solid #f4cd40a0;
}

.no-background {
  background-color: transparent;
  border: 1px solid black;
}

.image-overlay-highlight {
  width: 325px;
  height: 225px;
  position: absolute;
  background-color: #f4cd40;
  opacity: 0.7;
  border: 10px solid blue;
}
.image-overlay-correct {
  width: 325px;
  height: 225px;
  position: absolute;
  background-color: #43f440;
  opacity: 0.2;
  border: 10px solid blue;
}
.image-overlay-select {
  width: 325px;
  height: 225px;
  position: absolute;
  background-color: #dd88ea;
  opacity: 0.70;
  border: 10px solid blue;
}
.image-overlay-select-second-row {
  width: 325px;
  height: 225px;
  position: absolute;
  background-color: #dd88ea;
  opacity: 0.70;
  border: 10px solid blue;
  margin-top:11%;
}
.image-overlay-incorrect {
  width: 325px;
  height: 225px;
  position: absolute;
  background-color: #e42817;
  opacity: 0.3;
  border: 10px solid blue;
}
.image-overlay-non-select {
  width: 325px;
  height: 225px;
  position: absolute;
  background-color: #4848e6;
  opacity: 0.3;
  border: 10px solid blue;
}
.image-overlay {
  width: 325px;
  height: 225px;
  position: absolute;
  background-color: lightslategray;
  opacity: 0.7;
  border: 3px solid green;
}
.image-overlay-second-row {
  width: 325px;
  height: 225px;
  position: absolute;
  background-color: lightslategray;
  opacity: 0.7;
  border: 3px solid green;
  margin-top:11%;
}
.image-overlay-second-row-second-question {
  width: 325px;
  height: 225px;
  position: absolute;
  background-color: lightslategray;
  opacity: 0.7;
  border: 3px solid green;
  margin-top:5%;
}
.image-overlay-feedback {
  width: 325px;
  height: 225px;
  position: absolute;
  background-color: rgb(58, 66, 220);
  opacity: 0.7;
}

.image-overlay-feedback-special {
  width: 325px;
  height: 225px;
  position: absolute;
  background-color: rgb(58, 66, 220);
  opacity: 0.7;
  border: 15px solid #f4cd40;
}
.image-center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 55%;
}
.select_cursor {
  cursor:pointer;
}
.dialog-left {
  margin-top:50% !important;
  margin-right:2%
  
}
</style>
