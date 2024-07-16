
<template>
  <h1>Success Page</h1>
  <br/>
  <p> url: {{currentRoute}} </p>
  <p> params:  {{ this.$route.params.orderId }}</p>
  <p> response:  {{ responseData }}</p>

</template>

<script>
import axios from 'axios';

export default {
    data(){
        return{
            currentRoute: window.location.pathname,
            responseData: ''
        }

    }, 
    mounted() {
        this.success();
    },    
    methods: {
        getUrl:function(){
            let params = new URLSearchParams(window.location.search);
            console.log(params.get("paymentKey"));
            console.log(params.get("orderId"));
            console.log(params.get("amount"));
        },
    
        success:function(){
            let params = new URLSearchParams(window.location.search);
            console.log(params.get("paymentKey"));
            console.log(params.get("orderId"));
            console.log(params.get("amount"));

            const url = 'https://api.tosspayments.com/v1/payments/'+params.get("paymentKey");
            const token = "dGVzdF9za19ZUEJhbDJ2eGo4MWV4NDdFNURHODVSUWdPQU5EOg==";

            let userData = {
                amount: params.get("amount"),
                orderId: params.get("orderId")
            }

            const instance = axios.create({
                baseURL: url,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Basic ' + token, 
                }
            })

            instance.post(url, userData)
            .then( res => {                
                this.responseData = res
                console.log("[res] Item Insert", res);
            })
            .catch( err => {
                this.responseData = err.response.data
                console.error("[error] Item Insert Error!", err.response.data);
            })
        }
    }
}
</script>