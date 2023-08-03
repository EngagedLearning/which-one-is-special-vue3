import { createRouter,createWebHashHistory } from "vue-router";
import DemographicQuestionaire from '@/components/demographics/DemographicsQuestionaire.vue'
import WhichOneIsSpecialPrep from '@/components/which-one-is-special/WhichOneIsSpecialPrep.vue';
import SurveyQuestions from '@/components/survey/SurveyQuestions.vue'
import ThankYou from '@/components/thankyou/ThankYou.vue'

export default createRouter({
  history:createWebHashHistory(),
  routes: [
  /*  {
        path: "/WhichOneIsSpecialPrep_0",
        name: "WhichOneIsSpecialPrep0",
        component: WhichOneIsSpecialPrep,
        props: { which_one_is_special_prep_id_prop: 0 },
    },*/
      {
        base: import.meta.env.BASE_URL,
        path: "/Demographics_21",
        name: "DemographicQuestionaire_21",
        component: DemographicQuestionaire,
        props: { experiment_id_prop: 21 },
      },
      {
        base: import.meta.env.BASE_URL,
        path: "/WhichOneIsSpecialPrep_1",
        name: "WhichOneIsSpecialPrep",
        component: WhichOneIsSpecialPrep,
        props: { which_one_is_special_prep_id_prop: 1 },
    },
    {
        path: "/ThankYou",
        name: "ThankYou",
        component: ThankYou,
    },
    {
        path: "/Survey",
        name: "SurveyQuestions",
        component: SurveyQuestions,
    },
],
});