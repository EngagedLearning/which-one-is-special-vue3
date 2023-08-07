<template>
    <div>
        <h1>Thank You</h1>
        <h4>Thank you for your participation in this activity</h4>
        <h4>
            Please submit the following confirmation code for payment on Mechanical
            Turk.
        </h4>
        <el-table border stripe :data="thank_you_items" style="width=100%">
            <el-table-column prop="confirmation_code" label="Confirmation code" :align="'center'"></el-table-column>
        </el-table>
    </div>
</template>

<script>

export default {
    name: "ThankYou",
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
        this.thank_you_items = [
            {
                confirmation_code: sessionData["user_id"],
            },
        ];
        //this.emitPageLoaded();
    },
    methods: {},
    /*	emitPageLoaded: function() {
              let logData = {
                  eventName: "pageLoaded",
                  pageName: this.pageName,,
              this.$emit("callEvent", logData);
          },
      },*/
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
