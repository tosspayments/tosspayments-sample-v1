<template>
  <section v-if="confirmed">
    <h1>결제위젯 결제 성공</h1>
    <br />
    <p>paymentKey: {{ this.$route.query.paymentKey }}</p>
    <p>orderId: {{ this.$route.query.orderId }}</p>
    <p>amount: {{ this.$route.query.amount }}</p>
  </section>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { confirmPayment } from "@/confirmPayment";

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const confirmed = ref(false);

    onMounted(async () => {
      const requestData = {
        orderId: route.query.orderId,
        amount: route.query.amount,
        paymentKey: route.query.paymentKey,
      };

      async function confirm() {
        try {
          const { response, json } = await confirmPayment(requestData)
          if (!response.ok) {
            router.push(`/fail?message=${json.message}&code=${json.code}`);
          } else {
            confirmed.value = true;
          }
        } catch (error) {
        }
      }

      confirm();
    });

    return {
      confirmed
    };
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
