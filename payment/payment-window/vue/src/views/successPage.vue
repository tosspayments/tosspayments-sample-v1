
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

            // 결제 승인은 서버(server.js)에서 시크릿 키로 호출해요. 브라우저 코드에는 시크릿 키를 넣지 마세요.
            const url = '/api/confirm';

            let userData = {
                paymentKey: params.get("paymentKey"),
                amount: params.get("amount"),
                orderId: params.get("orderId")
            }

            axios.post(url, userData)
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