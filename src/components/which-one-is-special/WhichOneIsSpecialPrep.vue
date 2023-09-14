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
            <el-col v-if = "((image_deck_0 != null && group_choice < this.image_exp_max) 
            || (image_deck_0 != null && group_choice >= this.image_exp_max && penn_exp_var))" 
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
                    alt = "image_0_computed"
                    class="image-center"
                    style = "margin-top:1%;margin-left:25%;"
                 
                  />
                  <p v-html = "this.image_0_computed" v-if="group_choice >= this.image_exp_max && penn_exp_var" style="font-size:24px;"> 
                  </p>
                </figure>
                </div>
            </el-col>          
              <el-col
                :span="9" :offset="1"
                class="justify-content-center"
                v-if="((image_deck_1 != null && group_choice < this.image_exp_max)
                || (image_deck_1 != null && group_choice >= this.image_exp_max && penn_exp_var))"
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
                    alt = "image_1_computed"
                    class="image-center"
                    style = "margin-top:1%;margin-left:25%;"
                  />
                  <p v-html ="this.image_1_computed" v-if="group_choice >= this.image_exp_max && penn_exp_var" style="font-size:24px;">
                  </p>
                </figure>
                </div>
              </el-col>
            <el-col :span="5">
              <el-row>
                <el-col :span = "24">
                  <div v-if="(first_question && this.penn_exp_var)">
                  <el-row>
                      <p v-if = "question_type == 0" style="margin-left: 5%; margin-right: 7.5%; font-size: 1.0em">
                        Select every image
                        <b><i>{{ this.wois_feature[this.group_choice] }}</i></b>
                      </p>
                      <p v-if = "question_type == 1" style="margin-left: 5%; margin-right: 7.5%; font-size: 1.0em">
                        Select every statement
                        <b><i>{{ this.wois_feature[this.group_choice] }}</i></b>
                      </p>
                  </el-row>
                  </div>
                  <div v-if="(second_question && this.question_type == 0) ||
                  (second_question && this.question_type == 1 && penn_exp_var)">
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
               (question_type == 1 && penn_exp_var)">
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
                <el-col :span="7" :offset="11" v-if="question_type == 1 && !penn_exp_var" >
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
                  <div v-if="second_question && this.question_type == 1  && !penn_exp_var">
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
                        v-if="question_type == 1 && !penn_exp_var">
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
                  <el-row style="margin-top: 20px" v-if="question_type == 1 && !penn_exp_var">
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
              <el-col v-if = "((image_deck_2 != null && group_choice < this.image_exp_max)
              || (image_deck_2 != null && group_choice >= this.image_exp_max && penn_exp_var))" 
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
                      alt = "image_2_computed"
                      class="image-center"
                      style = "margin-top:1%;margin-left:25%;"
                  />
                   <p v-html = "this.image_2_computed" v-if="group_choice >= this.image_exp_max && penn_exp_var" style="font-size:24px;"> 
                   </p>
                </figure>
                </div>
              </el-col>
              <el-col
                  :span="9" :offset="1"
                  class="justify-content-center"
                  v-if="((image_deck_3 != null && group_choice < this.image_exp_max) 
                  || (image_deck_3 != null && group_choice >= this.image_exp_max && penn_exp_var))"
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
                      alt = "image_3_computed"
                      class="image-center"
                      style = "margin-top:1%;margin-left:25%;" 
                    />
                     <p v-html = "this.image_3_computed" v-if="group_choice >= this.image_exp_max && penn_exp_var" style="font-size:24px;">
                     </p>
                  </figure>
                </div>
            </el-col>
                <el-col v-if="(continue_mode && question_type == 0)
                 || (continue_mode && question_type == 1 && penn_exp_var)"
                  :span="5" :offset="19"
                  style="border: 1px solid black; margin-right: 5%;margin-top:11%;"
                >
                  <div
                      v-if="this.feedback_counter <= 1 && this.answer_incorrect && ((this.group_choice >= this.image_exp_max && this.penn_exp_var) || (this.group_choice < this.image_exp_max))">
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

//import 'element-plus/dist/index.css'

export default defineComponent({
  name: "WhichOneIsSpecialPrep",
  emits: {
    saveData:null
  },
  props: {
    which_one_is_special_prep_id_prop: {
      type: Number,
      required: true,
      default: 1,
    },
    penn_exp_prop: {
      type: Boolean,
      required: true,
      default: false,
    }
  },
  data() {
    return {
      image_exp_max: 12,
    //  num_groups: 6,
      image_caption_0:"",
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
      first_question: true,
      second_questiosn_disabled: false,
      second_question_text: "test message",
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
        type: "which_one_is_special_prep_2",
        group_id: -1,
        selection_array: [],
        correct_ans: -1,
        timestamp: Date.now(),
        operation: "",
        question_number: "",
        feedback_counter: -1,
        second_question_answer: -1,
        second_question_disabled: false,
      },
      penn_exp_var:this.penn_exp_prop,
    };
  },
  computed: {
    question_type: function () {
      return (this.wois_data[this.group_choice].type_data);
    },
    num_groups: function() {
      return (this.which_one_is_special_prep_id == 0 ? 6 : 12);
    },
    image_deck_0: function () {
      console.log('computing image_deck_0')
      let start = this.group_choice * 4;
      return (this.image_data[start]);
    },
    image_deck_1: function () {
      console.log('computing image_deck_1')
      let start = this.group_choice * 4 + 1;
      return (this.image_data[start]);
    },
    image_deck_2: function () {
      console.log('computing image_deck_2')
      let start = this.group_choice * 4 + 2;
      return (this.image_data[start]);
    },
    image_deck_3: function () {
      console.log('computing image_deck_3')
      let start = this.group_choice * 4 + 3;
      return (this.image_data[start]);
    },
    wois_computed: function () {
      console.log('computing wois_computed')
      let start = this.group_choice * 4;
      let end = start + 4;
      return this.wois_options.slice(start, end);
    },
    image_0_computed: {
      get() {
        console.log('calculating image_0_computed')
        let start = this.group_choice * 4;
        //console.log('start is ' + start)
        let image = this.image_data[start].image_name;
        //console.log('image name is ' + image);
        return (image);
      },
      set(inputValue) {
        console.log('setting image_0_computed')
        let start = this.group_choice * 4;
        this.image_data[start].image_name = inputValue;
      },
    },
    image_1_computed: {
      get() {
        console.log('computing image_1_computed')
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
        console.log('computing image_2_computed')
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
        console.log('computing image_3_computed')
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
    this.penn_exp_var=this.penn_exp_prop;
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
      (this.group_choice >= this.image_exp_max && this.penn_exp_var)) {
      this.image_0_text = this.image_deck_0.image_name;
      this.image_1_text = this.image_deck_1.image_name;
      this.image_2_text = this.image_deck_2.image_name;
      this.image_3_text = this.image_deck_3.image_name;
    } else {
      this.image_0_text = "";
      this.image_1_text = "";
      this.image_2_text = "";
      this.image_3_text = "";
    }
    this.image_overlay_selected = ((this.group_choice < this.image_exp_max) || (this.group_choice >= this.image_exp_max && this.penn_exp_var)) ? [0, 0, 0, 0] : ["", "", "", ""]
    this.image_caption_1[0] = ((this.group_choice < this.image_exp_max) ? "Image A:" : "Statement A:");
    this.image_caption_1[1] = ((this.group_choice < this.image_exp_max) ? "Image B:" : "Statement B:");
    this.image_caption_1[2] = ((this.group_choice < this.image_exp_max) ? "Image C:" : "Statement C:");
    this.image_caption_1[3] = ((this.group_choice < this.image_exp_max) ? "Image D:" : "Statement D:");

    this.which_one_is_special_prep_id = this.which_one_is_special_prep_id_prop;
   // this.num_groups = this.which_one_is_special_prep_id == 0 ? 6 : 12;
    // either do 0 to 5 or 6 to 11
    this.wois_feature = [
      "labeled with the top caption 'Image A:'",
      "which show(s) chocolate chips?",
      "of money which show(s) a value greather than 1200?",
      "that contains a basket?",
      "where the value of the money is equal to 10 cents",
      "with an odd number of coins.",
      "which shows an image of an apple",
      "which shows a depiction of fruit",
      "that contains a basket",
      "which shows more than 10 circles",
      "which shows an image of one or more squares",
      "which shows an even number of circles",
      "which does NOT contain the letter 'e'",
      "which contains a number",
      ... !this.penn_exp_var ? ["labeled with a 'B'"] : ["labeled with 'Statement B'"],
      "which contains a name for a mammal",
      "which contains a name of a bird",
      "which contains an English language word",
    ];
    this.wois_unique_feature = [
      "a top caption labeled 'Image A:'",
      "having chocolate chips",
      "showing a value greater than 1200",
      "that contains a basket",
      "the value of the money equal to 10 cents",
      "that having an odd number of coins",
      " contains an image of an apple",
      "all images which depict fruit",
      " contains a basket",
      " contains more than 10 circles",
      "all images of a square",
      "an even number of circles",
      "the statement which does NOT contain the letter 'e'",
      "a number",
      ... !this.penn_exp_var ? ["the statement labeled with a 'B'"] : ["the statement labeled 'Statement B'"],
      "a word for a mammal",
      "a word for a bird",
      "an English language word",
    ];
    this.wois_feature_unique = [
      false, false, true, true, false, false, true, true, false,
      true, true, false, true, true, true, false, false, false
    ];
    for (let k = 0; k < this.wois_data.length; k++) {
      //scramble them before scrambling the answers. 
      this.wois_data[k].scrambled_order = this.scrambleImageArray(this.wois_data[k].original_order)
      this.wois_data[k].first_question_second_answer = this.scrambleAnswerArray(
        this.wois_data[k].scrambled_order,
        this.wois_data[k].special_image_ans_id
      );
    }
    this.first_question = true;
    this.second_question_answer = -1;
    this.second_question = false;
    this.second_question_disabled = false;
    this.select_mode_0 = true;
    this.select_mode_1 = false;
    this.continue_mode = false;
   /* console.log("props " + this.which_one_is_special_prep_id_prop + ':' + this.penn_exp_var);
    console.log('group_choice ' + this.group_choice);
    console.log('question_type ' + this.question_type);*/
  },

  methods: {
    setImageOverlaySelected: function (index) {
      if ((this.group_choice < this.image_exp_max) ||
        (this.group_choice >= this.image_exp_max && this.penn_exp_var)) {
        this.image_overlay_selected[index] = 1;
      } else {
        this.image_overlay_selected[index] = "";
      }
    },
    clearImageOverlaySelected: function (index) {
      if ((this.group_choice < this.image_exp_max) ||
        this.group_choice >= this.image_exp_max && this.penn_exp_var) {
        this.image_overlay_selected[index] = 0;
      } else {
        this.image_overlay_selected[index] = "";
      }
    },
    setSelectedFigCaption: function (index) {
      if (this.image_overlay_selected[index] == 0) {
        this.setImageOverlaySelected(index);
      } else {
        this.clearImageOverlaySelected(index);
      }
      this.computeSubmitDisabled();
    },
    clearSelectedFigCaption: function (index) {
      if ((this.group_choice < this.image_exp_max)) {
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
      } else if ((this.group_choice >= this.image_exp_max && this.penn_exp_var)) {
        if (this.image_caption_1[index].includes("&#x2611;")) {
          if (index == 0) {
            this.image_caption_1[index] = "<b>Statement A:</b>";
          } else if (index == 1) {
            this.image_caption_1[index] = "<b>Statement B:</b>";
          } else if (index == 2) {
            this.image_caption_1[index] = "<b>Statement C:</b>";
          } else if (index == 3) {
            this.image_caption_1[index] = "<b>Statement D:</b>";
          }
        }
      }
      else {
        if (this.image_caption_1[index].includes("&#x2611;")) {
          this.image_caption_1[index] = "";
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
      //console.log('computing sumbit disabled')
      if (this.first_question) {
        let sum = this.image_overlay_selected.reduce(
          (partialSum, a) => partialSum + a,
          0
        );
        if (sum > 0) {
          this.submit_disabled = false;
        } else {
          this.submit_disabled = true;
        }
      } else if (this.second_question) {
        if (this.second_question == -1) {
          this.submit_disabled = true;
        } else {
          this.submit_disabled = false;
        }
      }
    },
    selectImage: function (event) {
      //console.log('Selected Image number :' + event);
      this.image_overlay_selection = -1;
      if (!this.second_question && !this.continue_mode) {
        this.image_overlay_selection = event;
        var select_image_command = "unallowed_selection";  // sometimes you can click but not get a response. 
        if (!this.image_caption_1[event].includes("Selected")) {
          this.setSelectedFigCaption(event);
        } else {
          this.clearSelectedFigCaption(event);
        }
        var selection_status = this.computeImageOverlay(event);
        if (selection_status == 1) {
          select_image_command = 'select_image';
        } else if (selection_status == 0) {
          select_image_command = 'deselect_image';
        } else {
          select_image_command = 'unallowed_selection'
        }
        console.log('select_image_command ' + select_image_command);
        // need to record data
        var new_data = {};
        let typ = this.setTyp();
        new_data = {
          student_id: this.student_id,
          type_data: typ, // which experiment
          group_id: this.group_choice,
          operation_number: this.operation_number,
          selection_array: [event], // which image see command for select/deselect. 
          correct_ans_first_round:
            this.wois_data[this.group_choice].special_image_ans_id,
          correct_ans_second_round:
            this.wois_data[this.group_choice].first_question_second_answer,
          timestamp: Date.now(),
          operation: select_image_command,
          question_number: this.first_question // first half of the question or second 
            ? "first_question"
            : "second_question",
          feedback_counter: this.feedback_counter,  // before or after feedback 
        };
        this.answer_data.push(new_data);  // push the data on the stack store it at the end.
        this.operation_number++; // increment the operation number after storing the data away.
      }
    },
    setImageOverlay: function (i) {
      if (i < 2) {
        return ("image-overlay-select");
      } else {
        return ("image-overlay-select-second-row");
      }
    },
    clearImageOverlay: function (i) {
      if (i < 2) {
        return ("image-overlay");
      } else {
        return ("image-overlay-second-row");
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
      var return_value = -1 // select = 1, deselect = 0 no entry is -1; 
      if (this.image_overlay_selection != -1) {
        if (this.select_mode_0 && !this.continue_mode) {
          this.image_overlay_selection = -1; //reset to stop back to back events. 
          if (index != -1) {
            for (let i = 0; i < this.image_overlay_computed.length; i++) {
              if (i == index) {
                // toggle the answer
                console.log('i == index ');
                if (index == 0) {  // index 0 is special because of the highlight. 
                  if (this.image_overlay_selected[i] == 1) {
                    image_overlay_c[i] = this.setImageOverlay(i)
                    return_value = 1
                  } else if (this.image_overlay_selected[i] == 0) {
                      image_overlay_c[i] = this.clearImageOverlay(i);
                      return_value = 0;
                  }
                } else {
                  // image_overlay_selected has already been set elsewhere
                  // just update image_overlay_c
                  if (this.image_overlay_selected[i] == 1) {
                    image_overlay_c[i] = this.setImageOverlay(i)
                    return_value = 1
                  } else if (this.image_overlay_selected[i] == 0) {
                    image_overlay_c[i] = this.clearImageOverlay(i);
                    return_value = 0;
                  }
                }
              } else {
                // all others reset them to their previous values.
                if (this.image_overlay_selected[i] == 1) {
                  image_overlay_c[i] = this.setImageOverlay(i)
                } else {
                  image_overlay_c[i] = this.clearImageOverlay(i);
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
                image_overlay_c[i] = this.clearImageOverlay(i);
                this.setSelectedCorrectFigCaption(i);
              } else if (this.correct_answer_array[i] == 0) {
                // incorrect selected
                image_overlay_c[i] = this.clearImageOverlay(i);
                this.setSelectedIncorrectFigCaption(i);
              } else if (this.correct_answer_array[i] == -2) {
                //incorrect unselected
                image_overlay_c[i] = this.clearImageOverlay(i);
                this.setNotSelectedIncorrectFigCaption(i);
              } else if (this.correct_answer_array[i] == -1) {
                //correct unselected
                image_overlay_c[i] = this.clearImageOverlay(i);
                this.setNotSelectedCorrectFigCaption(i);
              }
            }
          } else if (
            this.select_mode_1 &&
            !this.select_mode_0 &&
            !this.continue_mode
          ) {
            this.image_overlay_selection = -1; //reset to stop back to back events. 
            if (index != -1) {
              for (let i = 0; i < this.image_overlay_computed.length; i++) {
                if (i == index) {
                  // toggle the answer
                  if (this.image_overlay_selection == 0) {
                    if (this.image_overlay_selected[i] == 1) {
                      image_overlay_c[i] = this.setImageOverlay(i)
                      return_value = 1
                    } else if (this.image_overlay_selected[i] == 0) {
                      image_overlay_c[i] = this.clearImageOverlay(i);
                      return_value = 0;
                    }
                  } else {
                    if (this.image_overlay_selected[i] == 1) {
                      image_overlay_c[i] = this.setImageOverlay(i)
                    return_value = 1
                    } else if (this.image_overlay_selected[i] == 0) {
                      image_overlay_c[i] = this.clearImageOverlay(i);
                      return_value = 0;
                    }
                  }
                } else {
                  // all others reset them to their previous values.
                  //("resetting overlay to previous values");
                  if (this.image_overlay_selected[i] == 1) {
                    image_overlay_c[i] = this.setImageOverlay(i)
                  } else {
                    image_overlay_c[i] = this.clearImageOverlay(i);
                  }
                }
              }
          }
        }
        //console.log('image_overlay_c bottom ' + image_overlay_c); 
          this.image_overlay_computed = image_overlay_c;
        //console.log('image_overlay_computed new ' + this.image_overlay_computed)
      }
      return return_value; 
    },
    setInputAnswerArray: function () {
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
     // console.log('original answer array ' + JSON.stringify(originalAnswerArray));
     // console.log('scrambled answer array ' + JSON.stringify(scrambledImageArray));
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
        originalAnswerArray[0].text == "B" && 
        originalAnswerArray[0].value == 57
      ) {
        //console.log("Setting the Only Statement B value")
        if (!this.penn_exp_var) {  // text only
          arr[0] = {
            image: this.image_data[scrambledImageArray[1]].image_name,
            value: scrambledImageArray[1],
            text: this.image_data[scrambledImageArray[1]].image_name,
          };
        } else if (this.penn_exp_var) { //text based images
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
                } else if (g_choice >= this.image_exp_max && !this.penn_exp_var){
                  val = originalAnswerArray[j].image;
                  text = originalAnswerArray[j].image;
                } else if (g_choice >= this.image_exp_max && this.penn_exp_var) {
                  val = originalAnswerArray[j].image;
                  text = "A";
                }
              } else if (i == 1) {
                if (g_choice < this.image_exp_max) {
                  val = "B";
                  text = "B"
                } else if (g_choice >= this.image_exp_max && !this.penn_exp_var) {
                  val = originalAnswerArray[j].image;
                  text = originalAnswerArray[j].image;
                } else if (g_choice >= this.image_exp_max && this.penn_exp_var) {
                  val = originalAnswerArray[j].image;
                  text = "B";
                }
              } else if (i == 2) {
                if (g_choice < this.image_exp_max) {
                  val = "C";
                  text = "C";
                } else if (g_choice >= this.image_exp_max && !this.penn_exp_var) {
                  val = originalAnswerArray[j].image;
                  text = originalAnswerArray[j].image;
                } else if (g_choice >= this.image_exp_max && this.penn_exp_var) {
                  val = originalAnswerArray[j].image;
                  text = "C";
                }
              } else if (i == 3) {
                if (g_choice < this.image_exp_max) {
                  val = "D";
                  text = "D";
                } else if (g_choice >= this.image_exp_max && !this.penn_exp_var) {
                  val = originalAnswerArray[j].image;
                  text = originalAnswerArray[j].image;
                } else if (g_choice >= this.image_exp_max && this.penn_exp_var) {
                  val = originalAnswerArray[j].image;
                  text = "D";
                }
              }
              arr.splice(j, 0, {
                image: val,
                value: originalAnswerArray[j].value,
                text:text,
              });
              break;
            }
          }
        }
        // when I am done I think I need to sort them by 'text' in this case. 
        arr.sort((a,b) => (a.text > b.text) ? 1 : -1); 
      }
    //  console.log('scrambleImages output array ' + JSON.stringify(arr));
      return arr;
    },
    setFigureCaptionOnSubmit: function () {
      console.log('SetFigureCaptionOnSubmit')
      console.log('continue_mode ' + this.continue_mode);
      console.log('select_mode_0 ' + this.select_mode_0)
      console.log('select_mode_1 ' + this.select_mode_1)
      console.log('correct_answer_array ' + this.correct_answer_array);
      if (this.continue_mode && !this.select_mode_0 && !this.select_mode_1) {
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
    setTyp: function () {
      let typ = "";
      if (this.which_one_is_special_prep_id == 0) {
        typ = "which_one_is_special_prep_0";
      } else if (this.which_one_is_special_prep_id == 1 && !this.penn_exp_var) {
        typ = "which_one_is_special_prep_1";
      } else if (this.which_one_is_special_prep_id == 2 && this.penn_exp_var) {
        typ = "which_one_is_special_prep_2";
      }
      return (typ);
    },
    recordWois: function () {
      // submit button
      console.log("Clicking Submit Button");
      // set the values based upon what is selected
      if ((this.group_choice < this.image_exp_max) || (this.group_choice >= this.image_exp_max && this.penn_exp_var)) {
        this.wois_selected = this.image_overlay_selected;
      }
      console.log('group_choice ' + this.group_choice);
      console.log('wois_selected ' + this.wois_selected);
      console.log('first_question ' + this.first_question);
      console.log('second_question ' + this.second_question);
      console.log('feedback_counter ' + this.feedback_counter); 
      console.log('first answer first question ' + JSON.stringify(this.wois_data[this.group_choice].special_image_ans_id));
      console.log('second answer first question ' + JSON.stringify(this.wois_data[this.group_choice].first_question_second_answer));
      var new_data = {};
      if (this.first_question) {
        if (this.wois_selected.length > 0) {
          // stop extra timing event.
          this.setInputAnswerArray(); // set the feedback.
          this.operation_number++;
          let c_answer = null;
          if (this.feedback_counter <= 1 && this.select_mode_0) {
            c_answer = this.wois_data[this.group_choice].special_image_ans_id;
            // wois_selected matches unscrambled answers
          } else if (this.select_mode_1){  // 2nd answers and 2nd questions
            c_answer =
              this.wois_data[this.group_choice].first_question_second_answer;
          } else {
            console.error('c_answer not set: error')
          }
          console.log('c_answer in RECORDING WOIS' + JSON.stringify(c_answer)); 
          var answer_is_correct = null;
          if (this.group_choice < this.image_exp_max) {
            console.log('calling isImageAnswerCorrect')
            answer_is_correct = this.isImageAnswerCorrect(
              c_answer,
              this.wois_selected
            );
          } else if (this.group_choice >= this.image_exp_max && !this.penn_exp_var) {
            answer_is_correct = this.isTextAnswerCorrect(
              c_answer,
              this.wois_selected
            );
            console.log('called isTextAnswerCorrect and got ' + answer_is_correct);
          } else if (this.group_choice >= this.image_exp_max && this.penn_exp_var) { // not sure about this
            console.log('Pennasota text image');
          //  console.log('c_answer ' + JSON.stringify(c_answer)); 
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
   //       console.log('correctAnswerArray ' + JSON.stringify(correctAnswerArray));
          this.correct_answer_array = correctAnswerArray;
          this.answer_incorrect = !answer_is_correct;
          this.anyAnswerCorrect = this.isAnyAnswerCorrect(
            c_answer,
            this.wois_selected
          );
          let typ = this.setTyp();
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
              ? "wois_prep_store_answer_correct"
              : "wois_prep_store_answer_incorrect",
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
          console.log('computed image array ' + JSON.stringify(this.computed_image_array));
          console.log('fqsa_i ' + JSON.stringify(fqsa_i));
          for (let i = 0; i < this.computed_image_array.length; i++) {  // this is wrong for pure images
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
          console.log('st_arr  1315 ' + st_arr);
          let qfm = "";
          if (this.group_choice == 0) {
            qfm = "<b>Image A</b>";
          } else {
            if (!answer_is_correct) {
              qfm = "Not Quite. " + qfm;
            } else {
              qfm = "Congratulations! You are correct! " + qfm; 
            }
            console.log('qfm 1330 ' + qfm); 
            if ((this.group_choice < this.image_exp_max)) {
              if (fqsa_i.length == 1) {
                qfm = qfm + "Only <b>Image " + fqsa_i[0] + this.wois_unique_feature[this.group_choice] +
              "</b>.";
              } else {
                qfm = qfm + "<b>Image " + fqsa_i[0] + "</b>" ;
              }
            } else if (this.group_choice >= this.image_exp_max && !this.penn_exp_var) {
              qfm = qfm + 
                "<b>Statement " +
                st_arr[0] +
                ":(" +
                fqsa_i[0] +
                ")</b ";
            } else if (this.group_choice >= this.image_exp_max && this.penn_exp_var) {
              qfm = qfm + 
                "<b>Statement " +
                st_arr[0] +
                ":(" +
                fqsa_i[0] +
                ")</b>";
            }
            console.log('qfm 1352 ' + qfm);
            for (let i = 1; i < fqsa.length; i++) {
              if ((this.group_choice < this.image_exp_max)) {
                qfm = qfm + " and <b>Image " + fqsa_i[i] + "</b>";
              } else if (this.group_choice >= this.image_exp_max && !this.penn_exp_var) {
                qfm =
                  qfm +
                  " and <b>Statement " +
                  st_arr[i] +
                  ":(" +
                  fqsa_i[i] +
                  ")</b>";
              } else if (this.group_choice >= this.image_exp_max && this.penn_exp_var) {
                  qfm = qfm + 
                    " and <b>Statement " +
                    st_arr[i] +
                    ":(" +
                    fqsa_i[i] +
                    ")</b>";
                }
            }
          }
       //   if (fqsa_i.length > 1){
       //     qfm = qfm + '</b> are correct. '
       //   }
          console.log('qfm 1377 ' + qfm); 
          if ((this.group_choice < this.image_exp_max)) {
            qfm =
              qfm + (fqsa_i.length > 1 ? " contain <b>" + this.wois_unique_feature[this.group_choice] + "</b>." : "")  // +" contain These selected images contain <b>" : "This image contains <b>") +
           //   this.wois_unique_feature[this.group_choice]
           //   "</b>.";
          } else if (this.group_choice >= this.image_exp_max && !this.penn_exp_var){
            qfm =
              qfm + (fqsa_i.length > 1 ? " contain <b>" + this.wois_unique_feature[this.group_choice] + "</b>." : " contains <b>"+ this.wois_unique_feature[this.group_choice] + "</b>.")// +
           //  ". The statement(s) contain <b>" +
           //   this.wois_unique_feature[this.group_choice] +
           //   "</b>.";
          } else if (this.group_choice >= this.image_exp_max && this.penn_exp_var) {
            qfm =
              qfm + (fqsa.length == 1 ? " contains <b>" + this.wois_unique_feature[this.group_choice] + "</b>." : " contain <b>"+ this.wois_unique_feature[this.group_choice] + "</b>.")// +" contains the property above. This statement contains <b>" : " are the correct answer.  These statements contain <b>") +
             // " The statement(s) contain <b>" +
             // this.wois_unique_feature[this.group_choice] +
             // "</b>.";
          }
          console.log('qfm 1397 ' + qfm);
          console.log('feedback_counter ' + this.feedback_counter);
          console.log('first question ' + this.first_question)
          console.log('second question ' + this.second_question);
          console.log('answer_is_correct ' + answer_is_correct);
          // check for the need for feedback.
         
          if (answer_is_correct) {
            if (!qfm.includes('Congratulations')){
              qfm = "Congratulations! You are correct. " + qfm;
            }
            this.show_feedback_modal = true;
            if (this.feedback_counter < 1) {
              var index =
                this.wois_data[this.group_choice].special_image_ans_id[0].value;
              if (!this.penn_exp_var) {
                this.question_feedback_message =
                  this.wois_options[index].feedback_1;
              } else  {
                let fb = this.wois_options[index].feedback_1;//.replaceAll('Statement', 'Image');
                //let fb0 = fb.replaceAll('statement', 'image');
                this.question_feedback_message = fb ; 
              }
            } else {
              this.question_feedback_message = qfm;
              this.image_overlay_selected = [0, 0, 0, 0];
            }
            this.feedback_counter++;
            this.answer_data.push(new_data);
            if ((this.group_choice < this.image_exp_max)) {
              this.second_question_text =
                "<b>True</b> or <b>False</b>: the highlighted image (<b>Image A</b>) is the only one <b>" +
                this.wois_feature[this.group_choice] +
                "</b>";
            } else if ((this.group_choice >= this.image_exp_max && this.penn_exp_var)) {
              this.second_question_text =
                "<b>True</b> or <b>False</b>: the highlighted image (<b>Statement A</b>) is the only one <b>" +
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
              if ((this.group_choice < this.image_exp_max) || (this.group_choice >= this.image_exp_max && this.penn_exp_var)) {
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

              if ((this.group_choice < this.image_exp_max)) {
                this.second_question_text =
                  "<b>True</b> or <b>False</b>: the highlighted image (<b>Image A</b>) is the only one <b>" +
                  this.wois_feature[this.group_choice] +
                  "</b>";
              } else if ((this.group_choice >= this.image_exp_max && this.penn_exp_var)) {
                this.second_question_text =
                  "<b>True</b> or <b>False</b>: the highlighted statement (<b>Statement A</b>) is the only one <b>" +
                  this.wois_feature[this.group_choice] +
                  "</b>";
              } else {
                this.second_question_text =
                  "<b>True</b> or <b>False</b>: <b>Statement A</b> in the <b> Correct Answer</b> is the only statement <b>" +
                  this.wois_feature[this.group_choice] +
                  "</b>";
              }
            }
            console.log('continue_mode ' + this.continue_mode);
            console.log('show feedback modal ' + this.show_feedback_modal);
            console.log('feedback_counter end 1505 ' + this.feedback_counter);
            console.log('answer_incorrect ' + this.answer_incorrect); 
          }
        }
      } else if (this.second_question) {
        // two incorrect answers with different feedback;
        // second answer is true, you picked false /feedback_1
        // second answer is false, you picked true /feedback_0
        let prp = "Image";
          if ((this.group_choice < this.image_exp_max)) {
            prp = "Image";
          } else if ((this.group_choice >= this.image_exp_max && this.penn_exp_var)) {
            prp = "Statement";
          } else {
            prp = "Statement";
          }
         // need to add something when Image A does not contain the property. 
          // or when more than one Image including A contains the property. 
          var A_is_part_of_the_second_answer = false; 
          var A_is_part_of_the_first_answer = false; 
          var A_is_the_only_second_answer = false; 
          var A_is_the_only_first_answer = false; 
            if(this.wois_data[this.group_choice].first_question_second_answer.some(e => e.text === 'A')){
              A_is_part_of_the_second_answer = true; 
            }
            if(this.wois_data[this.group_choice].special_image_ans_id.some(e => e.text === 'A')){
              A_is_part_of_the_first_answer = true; 
            }
            if (A_is_part_of_the_second_answer && this.wois_data[this.group_choice].first_question_second_answer.length == 1){
              A_is_the_only_second_answer = true; 
            }
            if (A_is_part_of_the_first_answer && this.wois_data[this.group_choice].special_image_ans_id.length == 1){
              A_is_the_only_first_answer = true; 
            }
          // if A is not part of the either answer then part 2 must be false.
          var mess_0 = "";
          var mess_1 = ""; 
          var mess_2 = "";
          // A does not have the property
          if (!A_is_part_of_the_first_answer && !A_is_part_of_the_second_answer
          || (this.feedback_counter >= 2 && !A_is_part_of_the_second_answer) 
          || (this.feedback_counter == 1 && !A_is_part_of_the_first_answer))
          {
            mess_0 = "<b> " + prp + " A</b> does not contain the property <b>" + this.wois_unique_feature[this.group_choice] +"</b> so the property cannot be a <b>unique</b> to <b>" + prp + " A</b>."; 
          } 
          // A has the property but so do others. 
          if ((this.feedback_counter >= 2 && A_is_part_of_the_second_answer && !A_is_the_only_second_answer) 
          || (this.feedback_counter == 1 && A_is_part_of_the_first_answer && !A_is_the_only_first_answer))
          {
            mess_1 = "<b> " + prp + " A</b> contains the property <b>" + this.wois_unique_feature[this.group_choice] + "</b> but so do other " + prp + "s, so the property cannot be a <b>unique</b> to <b>" + prp + " A</b>."; 
          } 
          // A has the property and it is the only one. 
          if ((A_is_the_only_first_answer && this.feedback_counter === 1) ||
          (A_is_the_only_second_answer && this.feedback_counter >= 2))
          {
            var prop = "";
            if (this.feedback_counter == 1){
              prop = this
            }
             mess_2 = "<b> " + prp + " A</b> is the only " + prp + " that contains the property <b>" + this.wois_unique_feature[this.group_choice] + "</b> so it must be <b>unique</b> to <b>" + prp + " A </b>" 
          }
          console.log('mess_0 1595 ' + mess_0);
          console.log('mess_1 1595 ' + mess_1);
          console.log('mess_2 1595 ' + mess_2);
        var second_answer_incorrect_t_f = false; 
        var second_answer_incorrect_f_t = false; 
        console.log('second_question_answer 1583 ' + this.wois_data[this.group_choice].second_question_answer)
        if (this.wois_data[this.group_choice].second_question_answer == 1 &&
          this.second_question_answer == 0) {  // true answer false response
          second_answer_incorrect_t_f = true;
        }  
        if (this.wois_data[this.group_choice].second_question_answer == 0 &&
          this.second_question_answer == 1) {  // false answer true response
          second_answer_incorrect_f_t = true;
        }
        console.log('second_answer_incorrect_t_f ' + second_answer_incorrect_t_f);
        console.log('second_answer_incorrect_f_t ' + second_answer_incorrect_f_t);
        this.computeSubmitDisabled(); 
        var second_answer_is_correct =
          !second_answer_incorrect_t_f && !second_answer_incorrect_f_t
        this.second_answer_correct = second_answer_is_correct;
        console.log('second_answer_correct is ' + this.second_answer_correct);
        this.operation_number++; // increment the operation number
        
        if (second_answer_incorrect_t_f) { // Have to pick anticipated answer. answer is true, selection is false
          this.show_feedback_modal = true;
          this.question_feedback_message = "Not Quite." + mess_2; 
       //   this.wois_data[this.group_choice].feedback_1;
        } else if (second_answer_incorrect_f_t) { // answer is false, selection is true
          this.show_feedback_modal = true;
          if (!A_is_part_of_the_first_answer && !A_is_part_of_the_second_answer
          || (this.feedback_counter >= 2 && !A_is_part_of_the_second_answer) 
          || (this.feedback_counter == 1 && !A_is_part_of_the_first_answer))
          {
            this.question_feedback_message = "Not Quite. " + mess_0; 
          } else if ((this.feedback_counter >= 2 && A_is_part_of_the_second_answer && !A_is_the_only_second_answer) 
          || (this.feedback_counter == 1 && A_is_part_of_the_first_answer && !A_is_the_only_first_answer))
          {
            this.question_feedback_message = "Not Quite. " + mess_1; 
          } else {
            this.question_feedback_message = this.wois_data[this.group_choice].feedback_0;
          }
        } else {
          // correct answer
          this.show_feedback_modal = true;
        
          if (this.wois_data[this.group_choice].second_question_answer == 0) {
            if (this.second_answer_correct){ // answer is false and response is false. 
            this.question_feedback_message =
              "Congratulations! You are correct. ";
            } else { // answer is false response is true
              "Not Quite! " 
            }
          } else { // answer is true and response is true. 
            if (this.second_answer_correct){
            this.question_feedback_message =
              "Congratulations! You are correct. " 
            } else { // answer is true response is false
              "Not Quite! " 
              }
          }
          if (mess_0 != ""){
              this.question_feedback_message = this.question_feedback_message + mess_0; 
          }
          if (mess_1 != ""){
            this.question_feedback_message = this.question_feedback_message + mess_1; 
          }
          if (mess_2 != ""){
            this.question_feedback_message = this.question_feedback_message + mess_2; 
          }
        }
      }
      if (this.question_feedback_message === undefined){
        alert('this.quesiton_feedback is undefined.  Find out why.')
      }
      console.log('show_feedback_modal ' + this.show_feedback_modal);
      console.log('question_feedback_message 1645 ' + this.question_feedback_message);
    },
    isImageAnswerCorrect: function (correctAnswer, inputAnswer) {
      // arrays are the same type
      //get the data from wois_options
      let ans = "";
      if ((this.group_choice < this.image_exp_max)) {
        ans = this.translateImageAnswer(inputAnswer);
      } else if ((this.group_choice >= this.image_exp_max) && !this.penn_exp_var){
        ans = this.translateTextAnswer(inputAnswer); // need new translate code
      } else if ((this.group_choice >= this.image_exp_max && this.penn_exp_var)) {
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
        // sort both arrays
        // get the value from ans
        var ans_array = []
        for(let j = 0;j<ans.length;j++){
          ans_array.push(ans[j].value);
        }
        ans_array.sort(); 
        console.log('arr after sort ' + arr);
        console.log('ans_array after sort ' + ans_array);
        for (var i = 0; i < arr.length; i++) {
          console.log('arr[i] ' + arr[i]);
          console.log('ans_array[i] ' + ans_array[i])
          if (arr[i] !== ans_array[i]) {
            console.log('returning false');
            return false;
          }
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
      if (this.group_choice >= this.image_exp_max && !this.penn_exp_var) {
        ans = this.translateTextAnswer(inputAnswer); // need new input translator from [Abc,def] to [48, 49]
      } else if (this.group_choice >= this.image_exp_max && this.penn_exp_var) {
        ans = this.translateTextImageAnswer(inputAnswer); 
      }
  //    console.log('translateTextAnswer ans ' + JSON.stringify(ans));
  //    console.log('input correct answer ' + JSON.stringify(correctAnswer)); 
      let arr = [];
      if ((this.group_choice < this.image_exp_max) || (this.group_choice >= this.image_exp_max && this.penn_exp_var)) {
        for (let i = 0; i < correctAnswer.length; i++) {
          arr.push(correctAnswer[i].image);
        }
      } else { // don't need to translate for statement answers. 
        arr = correctAnswer; 
      }
  //    console.log('isTextAnswerCorrect arr ' + JSON.stringify(arr));
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
        } else if ((this.group_choice >= this.image_exp_max && this.penn_exp_var)) {
          for (var i = 0; i < arr.length; i++) {
            if (arr[i] !== ans[i].image){
              console.log('returning false match i value ' + i )
              return false;
            }
          }
        } else {
          for (var i = 0; i < arr.length; i++) { // need complete match for statements. 
            console.log('comparing arr and ans. else 1614')
            if ((arr[i].image != ans[i].image) || (arr[i].value != ans[i].value)) {
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
      console.log('No return paths found; Returning true as default.');
      return true;
    },
    isAnyAnswerCorrect: function (correctAnswer, inputAnswer) {
      //("any answer correct method");
      //console.log("correctAnswer " + JSON.stringify(correctAnswer));
      //console.log("inputAnswer " + inputAnswer);
      let ans = "";
      if ((this.group_choice < this.image_exp_max)) {
        ans = this.translateImageAnswer(inputAnswer);
      } else if (this.group_choice >= this.image_exp_max && !this.penn_exp_var){
        ans = this.translateTextAnswer(inputAnswer); // need new translation
      } else if (this.group_choice >= this.image_exp_max && this.penn_exp_var) {
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
   //   console.log('translateTextAnswer input ' + JSON.stringify(inputAnswer));
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
      return ans;
    },
    translateTextImageAnswer: function (inputAnswer) {
  //    console.log('translateTextImageAnswer input ' + JSON.stringify(inputAnswer));
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
   //   console.log('output textImage answer ' + JSON.stringify(ans));
      return ans;
    },
    translateImageAnswer: function (inputAnswer) {
   //   console.log('translateImageAnswer input ' + JSON.stringify(inputAnswer));
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
      } else if (this.group_choice >= this.image_exp_max && !this.penn_exp_var){
        ans = this.translateTextAnswer(inputAnswer); // need new translate answer
      } else if ((this.group_choice >= this.image_exp_max && this.penn_exp_var)) {
        ans = this.translateTextImageAnswer(inputAnswer); 
      }
    //  console.log('whichAnswerIsCorrect correct_answer' + JSON.stringify(correctAnswer));
      console.log('whichAnswerIsCorrect input_answer ' + inputAnswer);
  //    console.log('translated answer ans' + JSON.stringify(ans));
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
      if ((this.group_choice < this.image_exp_max)) {
        this.image_overlay_selected = [0, 0, 0, 0]; // reset the selections on the 2nd attempt
        this.image_caption_1 = [
          "<b>Image A:</b>",
          "<b>Image B:</b>",
          "<b>Image C:</b>",
          "<b>Image D:</b>",
        ];
      } else if ((this.group_choice >= this.image_exp_max && this.penn_exp_var)) {
        this.image_overlay_selected = [0, 0, 0, 0]; // reset the selections on the 2nd attempt
        this.image_caption_1 = [
          "<b>Statement A:</b>",
          "<b>Statement B:</b>",
          "<b>Statement C:</b>",
          "<b>Statement D:</b>",
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
      console.log("select_mode_1 " + this.select_mode_1);
      this.wois_selected = []; // erase answer
      if ((this.group_choice < this.image_exp_max)) {
        this.resetImageVariables(); 
      } else if ((this.group_choice >= this.image_exp_max && this.penn_exp_var)) {
        this.resetImageVariables(); 
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
      
      this.continue_disabled = true; // disable it for the next answer.
      this.select_mode_0 = false;
      this.image_overlay_selection = -1;
      this.correct_answer_array = [-1, -1, -1, -1];
      this.continue_mode = false;
      this.select_mode_1 = true;
    },
    resetImageVariables:function(){
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
    },
    modalCloseEvent: function () {
      console.log("modal close event");
      console.log("first question " + this.first_question);
      console.log("2nd_question " + this.second_question);
      this.show_feedback_modal = false;
      // clear out the image captions
      if (this.first_question) {
        //console.log("Inside first question loop");
        if ((this.group_choice < this.image_exp_max)) {
          this.resetImageVariables(); 
        } else if ((this.group_choice >= this.image_exp_max && this.penn_exp_var)) {
          this.resetImageVariables(); 
        }
        else {
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
        console.log('second_question_answer 2142 ' + this.second_question_answer);
        console.log('wois data second_question answer 2143' + this.wois_data[this.group_choice].second_question_answer);
        let typ = this.setTyp();
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

          if ((this.group_choice < this.image_exp_max)) {
            this.resetImageVariables(); 
          } else if ((this.group_choice >= this.image_exp_max && this.penn_exp_var)) {
            this.resetImageVariables(); 
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
          this.$emit("save-data", this.problem_data);
          // go to the Survey page
          if (this.which_one_is_special_prep_id !== 2) {
            this.$router.push("/Survey");
          } else {
            this.$router.push("/ThankYou_2")
          }  
        }
      }
      if (
        this.feedback_counter == 2 ||
        (!this.answer_incorrect && this.feedback_counter >= 1)
      ) {
        // trying to anticipate the correct answer becaus of the image shuffle. 
        console.log('setting second question to true'); 
        this.second_question = true;
        this.computeSubmitDisabled(); 
        this.first_question = false;
        this.woisDisabled = true; // disable the checkboxes on the second question.
        // need to set them to the correct answer  Answer is 'first_question_second_answer'
        // order is computed_image_array;  Checked boxes are wois_selected
        if (this.feedback_counter == 2 && this.group_choice >= this.image_exp_max && !this.penn_exp_var) {
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
                break;
              }
            }
          }
        }

        // set the caption on the image(s) which are correct using the check mark etc.
        console.log('checking if statement in modal close event' + this.feedback_counter + ':' + this.group_choice + ':' + this.penn_exp_var);
        if (this.feedback_counter == 2 && ((this.group_choice < this.image_exp_max) || 
        (this.group_choice >= this.image_exp_max && this.penn_exp_var)))
        {
          console.log('inside first if calculating several_images')
          this.image_overlay_computed[0] = "image-overlay-highlight";
          this.image_overlay_computed[1] = "image-overlay";
          this.image_overlay_computed[2] = "image-overlay-second-row-second-question";
          this.image_overlay_computed[3] = "image-overlay-second-row-second-question";
          console.log('wois data first choice second answer 2138 ' + JSON.stringify(this.wois_data[this.group_choice].first_question_second_answer));
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
            this.wois_data[this.group_choice].second_question_answer = 0;
            let several_images = "";
            if (this.group_choice < this.image_exp_max) {
              several_images = "<b>Image ";
            } else if (this.group_choce >= this.image_exp_max && this.penn_exp_var) {
              several_images = "<b>Statement ";
            }
            for (
              let i = 0;
              i <
              this.wois_data[this.group_choice].first_question_second_answer
                .length - 1;
              i++
            ) {
              let p1 = this.group_choice < this.image_exp_max ? this.wois_data[this.group_choice].first_question_second_answer[i].image :
                this.wois_data[this.group_choice].first_question_second_answer[i].text
              let p2 = this.group_choice < this.image_exp_max ? "" :
                ":(" + this.wois_data[this.group_choice].first_question_second_answer[i].image + ")";
              let stmt1 = (this.group_choice < this.image_exp_max) ? "</b> and <b>Image " : "</b> and <b>Statement ";
              several_images =
                several_images + p1 + p2 + stmt1
                
            }
            let p3 = this.group_choice < this.image_exp_max ? this.wois_data[this.group_choice].first_question_second_answer[this.wois_data[this.group_choice].first_question_second_answer.length - 1].image :
              this.wois_data[this.group_choice].first_question_second_answer[this.wois_data[this.group_choice].first_question_second_answer.length - 1].text
             let p4 = this.group_choice < this.image_exp_max ? "" :
              ":(" + this.wois_data[this.group_choice].first_question_second_answer[this.wois_data[this.group_choice].first_question_second_answer.length - 1].image + ")";   
            several_images =
              several_images +
              p3 + p4 +
              "</b>";
            let stmt2 = this.group_choice < this.image_exp_max ? "Image A</b>." : "Statement A</b>.";
            this.wois_data[this.group_choice].feedback_0 =
              "Not Quite. " +
              several_images +
              " contain the property <b>" +
              this.wois_unique_feature[this.group_choice] +
              "</b> so <b>" +
              "</b> the property cannot be <b><i>unique</i></b> to ONLY <b>" + stmt2;
              
          } else if (
            this.wois_data[this.group_choice].first_question_second_answer[0]["text"] != "A" 
            // text will always label the image in these cases. 
          ) {
            // length is 1 so only one answer to check
            this.wois_data[this.group_choice].second_question_answer = 0;
            let p1 = this.group_choice < this.image_exp_max ? this.wois_data[this.group_choice].first_question_second_answer[0].image :
              this.wois_data[this.group_choice].first_question_second_answer[0].text
            let p2 = this.group_choice < this.image_exp_max ? " " :
              ":(" + this.wois_data[this.group_choice].first_question_second_answer[0].image + ")";
            let stmt3 = this.group_choice < this.image_exp_max ? "Image A</b >." : "Statement A</b>.";
            let stmt4 = this.group_choice < this.image_exp_max ? "<b>Image " : "<b>Statement "
            this.wois_data[this.group_choice].feedback_0 =
              "Not Quite. " + stmt4 + p1 + p2 + "</b> contains the property (" +
               this.wois_unique_feature[this.group_choice] +
                ")</b> so <b>" +
                "</b> the property cannot be <b>unique</b> to ONLY <b> " + stmt3;
               
          } else {
            console.log('setting second_question_answer to one 2243');
            this.wois_data[this.group_choice].second_question_answer = 1;
            if (this.group_choice < this.image_exp_max) {
              this.wois_data[this.group_choice].feedback_0 =
                "Not Quite. <b>Image A</b> and only <b>Image A</b> contains the property <b>(" +
                this.wois_unique_feature[this.group_choice] +
                "</b> so the property must be <b><i>unique</i></b> to <b>Image A</b>.";
            } else if (this.group_choice >= this.image_exp_max && this.penn_exp_var) {
              this.wois_data[this.group_choice].feedback_0 =
                "Not Quite. <b>Statement A</b> and only <b>Statement A</b> contains the property <b>(" +
                this.wois_unique_feature[this.group_choice] +
                ")</b> so the property must be <b><i>unique</i></b> to <b>Statement A</b>.";
            }
          }
        } else if (
          !this.answer_incorrect &&
          this.feedback_counter >= 1 &&
          ((this.group_choice < this.image_exp_max))
        ) {
          //console.log('inside second if correct answer ' + this.answer_incorrect); 
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
            console.log('setting second_question_answer to zero 2364');
            this.wois_data[this.group_choice].second_question_answer = 0;
            let several_images = "";
            if (this.group_choice < this.image_exp_max) {
              several_images = "<b>Image ";
            } else if (this.group_choice >= this.image_exp_max && this.penn_exp_var) {
              several_images = "<b>Statement "; 
            }
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
              let stmt0 = (this.group_choice < this.image_exp_max) ? "</b> and <b>Image " : "</b> and <b>Statement ";
              console.log('p1 ' + p1);
              console.log('p2' + p2);
             several_images =
               several_images + p1 + p2 + stmt0;
           }
            
            console.log('several images 2389' + several_images);           
             let p3 = this.group_choice < this.image_exp_max ? this.wois_data[this.group_choice].special_image_ans_id[this.wois_data[this.group_choice].special_image_ans_id.length - 1].image :
              this.wois_data[this.group_choice].special_image_ans_id[this.wois_data[this.group_choice].special_image_ans_id.length - 1].text
            let p4 = this.group_choice < this.image_exp_max ? "" :
              "(" + this.wois_data[this.group_choice].first_question_second_answer[special_image_ans_id.length - 1].image + ")";
            several_images =
              several_images + p3 + p4 + "</b>";
            let e_stmt = (this.group_choice < this.image_exp_max) ? "Image A</b >." : "Statement A</b>.";
            console.log('e_stmt ' + e_stmt);
            this.wois_data[this.group_choice].feedback_0 =
              "Not Quite. " +
              several_images +
              " contain the property <b>" +
              this.wois_unique_feature[this.group_choice] +
              "</b> so <b>" +
           //   this.wois_unique_feature[this.group_choice] +
              "</b> the property cannot be <b>unique</b> to ONLY <b>" +
              e_stmt; 
          } else if (
            this.wois_data[this.group_choice].special_image_ans_id[0]["text"] != "A"
          ) {
            // length is 1 so only one answer to check
            let p1 = this.group_choice < this.image_exp_max ? this.wois_data[this.group_choice].special_image_ans_id[0].image :
              this.wois_data[this.group_choice].special_image_ans_id[0].text
            let p2 = this.group_choice < this.image_exp_max ? "" :
              ":(" + this.wois_data[this.group_choice].special_image_ans_id[0].image + ")";
              console.log('setting second_question_answer to zero 2400');
            this.wois_data[this.group_choice].second_question_answer = 0;
            if (this.group_choice < this.image_exp_max) {
              this.wois_data[this.group_choice].feedback_0 =
                "Not Quite. <b>Image " + p1 + p2 + "</b> contains the property (" + 
                this.wois_unique_feature[this.group_choice] +
                ")</b> so <b>" +
             //   this.wois_unique_feature[this.group_choice] +
                "</b> the property cannot be <b><i>unique</i></b> to <b>Image A</b>.";
            } else {
              this.wois_data[this.group_choice].feedback_0 =
                "Not Quite. <b>Statement " + p1 + p2 + " contains the property <b>(" +
                  this.wois_unique_feature[this.group_choice] +
                ")</b> so <b>" +
                "</b> the property cannot <b><i>unique</i></b> to <b>Statement A</b>.";
            }
          } else {
            this.wois_data[this.group_choice].special_image_ans_id = 1;
            this.wois_data[this.group_choice].feedback_0 = "Not Quite. The correct answer is <b>"
            if (this.group_choice < this.image_exp_max) {
              this.wois_data[this.group_choice].feedback_0 = this.wois_data[this.group_choice].feedback_0 +
                "Image A</b> and only <b>Image A</b> so <b>" +
                this.wois_unique_feature[this.group_choice] +
                "</b> is <b>unique</b> to <b>Image A</b>.";
            } else {
              this.wois_data[this.group_choice].feedback_0 = this.wois_data[this.group_choice].feedback_0 +
                "Statement A</b> and only <b>Statement A</b> so <b>" +
                this.wois_unique_feature[this.group_choice] +
                "</b> is <b>unique</b> to <b>Statment A</b>.";
            }
          }
        }
      }
      console.log('feedback_counter 2389 ' + this.feedback_counter)
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
        if (this.feedback_counter == 2 && ((this.group_choice >= this.image_exp_max && !this.penn_exp_var)))
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
                break;
              }
            }
          }
        }
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
        if (this.feedback_counter == 2 && this.group_choice >= this.image_exp_max && !this.penn_exp_var)
        {  // statements
          console.log('feedback counter == 2 2518')
          if (
            this.wois_data[this.group_choice].first_question_second_answer
              .length > 1
          ) {
            console.log('setting second_question_answer to zero 2486');
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
            this.wois_data[this.group_choice].feedback_0 =
              "Not Quite. " +
              several_images +
              " demonstrate the property <b>" +
              this.wois_unique_feature[this.group_choice] +
              "</b> so <b>" +
           //   this.wois_unique_feature[this.group_choice] +
              "</b> this property cannot be <b><i>unique</i></b> to only <b>Statement A</b>.";
          } else if (
            this.wois_data[this.group_choice].first_question_second_answer[0][
            "image"
            ] != this.computed_image_array[0]
          ) {
            // length is 1 so only one answer to check
            console.log('setting second_question_answer to zero 2485');
            this.wois_data[this.group_choice].second_question_answer = 0;
            this.wois_data[this.group_choice].feedback_0 =
              "Not Quite. The correct answer is <b>Statement " +
              st_arr +
              ":(" +
              this.wois_data[this.group_choice].first_question_second_answer[0][
              "image"
              ] +
              ")</b> so the property <b>" +
              this.wois_unique_feature[this.group_choice] +
              "</b> cannot be <b>unique</b> to <b>Statement A</b>.";
          } else {
            // correct selection of statement A
            console.log('setting second_question_answer to one 2522');
            this.wois_data[this.group_choice].second_question_answer = 1;
            this.wois_data[this.group_choice].feedback_0 =
              "Congratulations! You are correct. <b>Statement A</b> and ONLY <b>Statement A</b> " +
            
              "</b> has the property (" + this.wois_unique_feature[this.group_choice] + ")";
          }
        } else if (
          !this.answer_incorrect &&  // correct answer 
          this.feedback_counter >= 1 &&
          this.group_choice >= this.image_exp_max && !this.penn_exp_var
        ) {
          // statements
          console.log('inside several images using statements 2557')
          
          if (
            this.wois_data[this.group_choice].special_image_ans_id.length > 1
          ) {
            console.log('setting second_question_answer to zero 2561');
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
            this.wois_data[this.group_choice].feedback_0 =
              "Not Quite. <b>" +
              several_images +
              "</b> possess this property <b>" +
              "</b> so this property <b>(" +
              this.wois_unique_feature[this.group_choice] +
              ")</b> cannot be <b>unique</b> to ONLY <b>Statement A</b>.";
          } else if (
            this.wois_data[this.group_choice].special_image_ans_id[0][
            "image"
            ] != this.computed_image_array[0]
          ) {
            // length is 1 so only one answer to check
            console.log('setting second_question_answer to zero 2601');
            this.wois_data[this.group_choice].second_question_answer = 0;
            this.wois_data[this.group_choice].feedback_0 =
              "Not Quite. <b>Statement A does not contain " + //+ st_arr[0] + ":(" +
                this.wois_unique_feature[this.group_choice]
           // this.wois_data[this.group_choice].special_image_ans_id[0]["image"] +
              ")</b> so this property <b>(" +
             // this.wois_unique_feature[this.group_choice] +
              ")</b> cannot be <b><i>unique</i></b> to ONLY <b>Statement A</b>.";
          } else {
            this.wois_data[this.group_choice].special_image_ans_id = 1;
            this.wois_data[this.group_choice].feedback_0 =
              "Congratulations! You are correct. <b>Statement A</b> is the ONLY statement with " +
              
              "</b> this property (" + this.wois_unique_feature[this.group_choice] + ")";
          }
        }  else if (
          !this.answer_incorrect &&  // correct answer 
          this.feedback_counter >= 1 &&
          this.group_choice >= this.image_exp_max && this.penn_exp_var
        ) {
          // images
          this.image_overlay_computed[0] = "image-overlay-highlight";
          this.image_overlay_computed[1] = "image-overlay";
          this.image_overlay_computed[2] = "image-overlay-second-row-second-question";
          this.image_overlay_computed[3] = "image-overlay-second-row-second-question";
          console.log('wois data correct answer 2626 ' + JSON.stringify(this.wois_data[this.group_choice].special_image_ans_id));
          if (this.feedback_counter == 1){
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
        } else if (this.feedback_counter == 2){
          console.log('feedback counter == 2');
          for (
            let i = 0;
            i < this.wois_data[this.group_choice].first_question_second_answer[i].text;
            i++
          ) {
            if (
              this.wois_data[this.group_choice].first_question_second_answer[i].text ==
              "A"
            ) {
              this.setSelectedCorrectFigCaption(0);
            } else if (
              this.wois_data[this.group_choice].first_question_second_answer[i].text ==
              "B"
            ) {
              this.setSelectedCorrectFigCaption(1);
            } else if (
              this.wois_data[this.group_choice].first_question_second_answer[i].text ==
              "C"
            ) {
              this.setSelectedCorrectFigCaption(2);
            } else if (
              this.wois_data[this.group_choice].first_question_second_answer[i].text ==
              "D"
            ) {
              this.setSelectedCorrectFigCaption(3);
            }
          }
        }
          console.log('inside several images using images 2709')
          console.log('computed_image_array[0] ' + this.computed_image_array[0]);
          let loop_var = this.wois_data[this.group_choice].special_image_ans_id;
          if (this.feedback_counter == 2) { // incorrect twice
            console.log('loop var is first_question_second_answer feedback is 2')
            loop_var = this.wois_data[this.group_choice].first_question_second_answer;
          }
          if (loop_var.length > 1) {
            console.log('setting second_question_answer to zero 2716');
            this.wois_data[this.group_choice].second_question_answer = 0;
            
            let several_images = "<b>Statement ";
            for (let i = 0; i < loop_var.length - 1; i++)
            {
              several_images =
                several_images +
                st_arr[i] +
                ":(" +
                loop_var[i]
                  .image +
                ")</b> and <b>Statement ";
            }
            several_images =
              several_images +
              st_arr[st_arr.length - 1] +
              ":(" +
              loop_var[loop_var.length - 1].image +
              ")</b> ";
            this.wois_data[this.group_choice].feedback_0 =
              "Not Quite. <b>" +
              several_images +
              "</b> have the property  <b>(" +
              this.wois_unique_feature[this.group_choice] +
              ")</b> so <b>" +
            //  this.wois_unique_feature[this.group_choice] +
              "</b> this property cannot be a <b>unique</b> to ONLY <b>Statement A</b>.";
          } else if (loop_var[0]["image"] != this.computed_image_array[0])
          { // single answer in wrong place. 
            // length is 1 so only one answer to check
            console.log('setting second_question_answer to zero 2669');
            this.wois_data[this.group_choice].second_question_answer = 0;
            this.wois_data[this.group_choice].feedback_0 =
              "Not Quite. The correct answer is <b>Statement " + st_arr[0] + ":(" +
            loop_var[0]["image"] +
              ")</b> so this property <b>(" +
              this.wois_unique_feature[this.group_choice] +
              ")</b> cannot be <b><i>unique</i></b> to ONLY <b>Statement A</b>.";
          } else {
            this.wois_data[this.group_choice].second_question_answer = 1;  // second answer needs to be true
            console.log('second_answer_correct 2821' + this.second_answer_correct);
            if (this.second_answer_correct) {
              this.wois_data[this.group_choice].feedback_0 =
                "Congratulations! You are correct <b>Statement A</b> is the ONLY statement with this property.";
              //  this.wois_unique_feature[this.group_choice] +
             //   "</b> is a unique property of <b>Statement A</b>.";
                this.wois_data[this.group_choice].feedback_1 =
                "Not Quite. The correct answer is <b>Statement " + st_arr[0] + ":(" +
                loop_var[0]["image"] +
                ")</b> so this property <b>(" +
                this.wois_unique_feature[this.group_choice] +
                ")</b> must be <b><i>unique</i></b> to <b>Statement A</b>."; 
            } else { // incorrect second answer after first correct answer
                this.wois_data[this.group_choice].feedback_0 =
                "Not Quite. The correct answer is only <b>Statement " + st_arr[0] + ":(" +
                  loop_var[0]["image"] +
                  ")</b> so this property <b>(" +
                  this.wois_unique_feature[this.group_choice] +
                  ")</b> must be <b><i>unique</i></b> to <b>Statement A</b>.";
            }
          }
        }
      }
    },
     calculateStatementFeedback: function () {
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
     //  console.log("submit enabled answer: " + JSON.stringify(e));
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
       // console.log('second_question_answer 2875' + JSON.stringify(this.second_question_answer))
       // console.log('second question selection is ' + JSON.stringify(e));
       // this.second_question_answer = e;
       // console.log('second_question_answer after ' + JSON.stringify(this.second_question_answer));
       // record the selection 
       var new_data = {};
       let typ = this.setTyp();
        new_data = {
          student_id: this.student_id,
          type_data: typ, // which experiment
          group_id: this.group_choice,
          operation_number: this.operation_number,
          selection_array: [this.second_question_answer], // which answer 0 = False, 1 = True 
          correct_ans_first_round:
            this.wois_data[this.group_choice].special_image_ans_id,
          correct_ans_second_round:
            this.wois_data[this.group_choice].first_question_second_answer,
          timestamp: Date.now(),
          operation: "select_second_question_true_false",
          question_number: this.first_question // first half of the question or second 
            ? "first_question"
            : "second_question",
          feedback_counter: this.feedback_counter,  // before or after feedback 
        }
        console.log('new data second question selection operation ' + JSON.stringify(new_data));
        this.answer_data.push(new_data);
      }
    },
    scrambleImages: function (computed_image_array) {
      console.log("SCRAMBLE IMAGES");
      var output_array = ["", "", "", ""];
      var o_array = this.wois_data[this.group_choice].original_order;
      var s_array = this.wois_data[this.group_choice].scrambled_order;
      for (var i = 0; i < o_array.length; i++) {
        var old_index = o_array[i];
        for (var j = 0; j < s_array.length; j++) {
          if (old_index === s_array[j]) {
            var new_index = j;
            output_array.splice(new_index, 1, computed_image_array[i]); // i should work because they are in order
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
      return output_array;
    },
   /* scrambleImageArray: function (input_array) {
   //   console.log('scrambleImageArray input_array' + JSON.stringify(input_array));
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
   //   console.log('output from scrambleImageArray' + JSON.stringify(copy_a));
      return copy_a;
    },*/
    scrambleImageArray: function(input_array){
        let arrayCopy = [...input_array]; 
        arrayCopy.sort(() => Math.random() - 0.5);
        return(arrayCopy);
    },
    getImageUrl: function (filename) {
     //vue 3 version. 
      return new URL(`../../assets/images/${filename}`, import.meta.url).href

    },    
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
