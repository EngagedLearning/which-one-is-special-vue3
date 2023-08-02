import { createApp } from 'vue';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue';
import router from './components/router';
import DemographicsQuestionaire from './components/demographics/DemographicsQuestionaire.vue'; 
import WhichOneIsSpecialPrep from './components/which-one-is-special/WhichOneIsSpecialPrep.vue';
import SurveyQuestions from './components/survey/SurveyQuestions.vue'


//import 'bootstrap/dist/css/bootstrap.min.css';

const app = createApp(App);
app.use(ElementPlus)
app.use(router);
app.component('WhichOneIsSpeicalPrep', WhichOneIsSpecialPrep)
    .component('DemographicsQuestionaire', DemographicsQuestionaire)
    .component('SurveyQuestions',SurveyQuestions);
app.mount('#app');

 
