<template>
  <!-- 결제 성공 시 -->
  <section v-if="confirmed">
    <div class="result wrapper">
    <div class="box_section">  
      <h2 style="padding: 20px 0px 10px 0px">
        <img
          width="35"
          src="https://static.toss.im/3d-emojis/u1F389_apng.png"
        />
        결제 성공
      </h2>
    <p>paymentKey = {{ this.$route.query.paymentKey }}</p>
    <p>orderId = {{ this.$route.query.orderId }}</p>
    <p>amount = {{ this.$route.query.amount }}</p>
    <div class="result wrapper">
        <button class="button" onclick="location.href='https://docs.tosspayments.com/guides/payment-widget/integration';"
        style="margin-top:30px; margin-right: 10px">연동 문서</button>
        <button class="button" onclick="location.href='https://discord.gg/A4fRFXQhRu';"
        style="margin-top:30px;background-color: #e8f3ff;color:#1b64da ">실시간 문의</button>
      </div>   
    </div>
  </div>
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
          console.log(json)
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