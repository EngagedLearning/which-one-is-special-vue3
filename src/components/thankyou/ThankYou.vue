<template>
    <div>
        <h1>Thank You</h1>
        <h4>Thank you for your participation in this activity</h4>
        <h4 v-if="which_one_is_special_prep_id_prop !== 2">
            Please submit the following confirmation code for payment on Mechanical
            Turk.
        </h4>
        <h4 v-if="which_one_is_special_prep_id_prop == 2">
                Please select the 'q' key to quit. 
        </h4>
        <el-table v-if="which_one_is_special_prep_id_prop !== 2" border stripe :data="thank_you_items" style="width=100%">
            <el-table-column prop="confirmation_code" label="Confirmation code" :align="'center'"></el-table-column>
        </el-table>
    </div>
</template>

<script>
/* Thank You page.
Thanks the user for their participation.
For Mechanical Turk Users, it gives them the code to enter to get their stipened.
For Pennasota users, it asks them to hit the 'q' key to end the experiment. 
*/
export default {
    name: "ThankYou",
    props: {
        which_one_is_special_prep_id_prop: {
            type: Number,
            required: true,
            default: 1,
        },
    },
    data() {
        return {
            sessionId: null,
            confirmationCode: null,
            thank_you_items: [],
            pageName: "Thank You",
            sessionStorage: {},
        };
    },
    mounted: function () {
        this.sessionStorage = window.sessionStorage;
        console.log('sessionStorage ' + JSON.stringify(this.sessionStorage))
        let sessionData = {}; // adding session data to the log.
        Object.keys(this.sessionStorage).forEach((key) => {
            sessionData[key] = this.sessionStorage.getItem(key);
        });

        this.sessionId = sessionData["session-id"];
        this.confirmationCode = sessionData["user_id"];
        this.startTime = sessionData[""]
        this.thank_you_items = [
            {
                confirmation_code: sessionData["user_id"],
            },
        ];
    },
    methods: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h4 {
    margin: 40px 0 0;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: inline-block;
    margin: 0 10px;
}

a {
    color: #42b983;
}
</style>
