import { createRouter,createWebHashHistory } from "vue-router";
//import DemographicQuestionaire from '@/components/demographics/DemographicsQuestionaire.vue';
import WhichOneIsSpecialPrep from '@/components/which-one-is-special/WhichOneIsSpecialPrep.vue';
import SurveyQuestions from '@/components/survey/SurveyQuestions.vue';
import ThankYou from '@/components/thankyou/ThankYou.vue';
import S3DataDownload from '@/components/download-data/S3DataDownload.vue';

export default createRouter({
  history:createWebHashHistory(),
  routes: [
  
  /*    {
        base: import.meta.env.BASE_URL,
        path: "/Demographics_21",
        name: "DemographicQuestionaire_21",
        component: DemographicQuestionaire,
        props: { experiment_id_prop: 21 },
      },
      {
        base: import.meta.env.BASE_URL,
        path: "/WhichOneIsSpecialPrep_1",
        name: "WhichOneIsSpecialPrep_Enlearn",
        component: WhichOneIsSpecialPrep,
        props: {
          which_one_is_special_prep_id_prop: 1,
          penn_exp_prop: false},
    },*/
        {
        base: import.meta.env.BASE_URL,
        path: "/WhichOneIsSpecialPrep_2",
        name: "WhichOneIsSpecialPrep_Penn",
        component: WhichOneIsSpecialPrep,
        props: {
          which_one_is_special_prep_id_prop: 2,
          penn_exp_prop: true
          },
        },
    {
        base: import.meta.env.BASE_URL,
        path: "/ThankYou_2",
        name: "ThankYou_2",
        component: ThankYou,
        props: {
          which_one_is_special_prep_id_prop: 2
        }
    },
    {
      base: import.meta.env.BASE_URL,
      path: "/ThankYou_1",
      name: "ThankYou_1",
      component: ThankYou,
      props: {
          which_one_is_special_prep_id_prop: 1
        }
    },
    {
        base: import.meta.env.BASE_URL,
        path: "/Survey",
        name: "SurveyQuestions",
        component: SurveyQuestions,
    },
    {
        base: import.meta.env.BASE_URL,
        path: "/S3DataDownload",
        name: "S3DataDownload",
        component: S3DataDownload,
    },
],
});