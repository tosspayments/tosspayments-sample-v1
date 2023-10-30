<template>
  <h1>결제위젯 결제 성공</h1>
  <br />
  <p>paymentKey: {{ this.$route.query.paymentKey }}</p>
  <p>orderId: {{ this.$route.query.orderId }}</p>
  <p>amount: {{ this.$route.query.amount }}</p>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();

    onMounted(async () => {
      const requestData = {
        orderId: route.query.orderId,
        amount: route.query.amount,
        paymentKey: route.query.paymentKey,
      };

      async function confirm() {
        try {
          const response = await fetch("/api/confirm", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestData),
          });

          const json = await response.json();

          if (!response.ok) {
            console.log(json);
            router.push(`/fail?message=${json.message}&code=${json.code}`);
          } else {
            console.log(json);
            router.push(`/success?paymentKey=${json.paymentKey}&orderId=${json.orderId}&amount=${json.totalAmount}`)
          }
        } catch (error) {
          console.error(error);
        }
      }

      confirm();
    });

    return {};
  },
};
</script>

<style>
#app {
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
