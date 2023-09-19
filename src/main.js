import { createApp } from 'vue';
//import ElementPlus from 'element-plus'
//import 'element-plus/dist/index.css'
import App from './App.vue';
import router from './components/router';
import DemographicsQuestionaire from './components/demographics/DemographicsQuestionaire.vue'; 
import WhichOneIsSpecialPrep from './components/which-one-is-special/WhichOneIsSpecialPrep.vue';
import SurveyQuestions from './components/survey/SurveyQuestions.vue';
import S3DataDownload from './components/download-data/S3DataDownload.vue'
import ThankYou from './components/thankyou/ThankYou.vue';

import {ElRow,ElCol,ElDialog,ElCheckboxGroup, ElCheckbox,ElButton} from 'element-plus';
import 'element-plus/theme-chalk/el-button.css';
import 'element-plus/theme-chalk/el-row.css';
import 'element-plus/theme-chalk/el-col.css';
import 'element-plus/theme-chalk/el-dialog.css';
import 'element-plus/theme-chalk/el-checkbox-group.css';
import 'element-plus/theme-chalk/el-checkbox.css';


//app.use(ElementPlus)
const app = createApp(App);
app.use(router);
app.use(ElButton);
app.use(ElRow);
app.use(ElCol);
app.use(ElDialog);
app.use(ElCheckboxGroup);
app.use(ElCheckbox);
app.component('WhichOneIsSpeicalPrep', WhichOneIsSpecialPrep)
    .component('DemographicsQuestionaire', DemographicsQuestionaire)
    .component('SurveyQuestions', SurveyQuestions)
    .component('S3DataDownload',S3DataDownload)
    .component('ThankYou', ThankYou);
app.mount('#app');

 
