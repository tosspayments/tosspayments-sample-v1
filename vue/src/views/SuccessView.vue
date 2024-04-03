<template>
  <!-- 결제 성공 시 -->
  <section v-if="confirmed">
    <div class="box_section" style="width: 600px">
      <img style="width: 100px" src="https://static.toss.im/illusts/check-blue-spot-ending-frame.png" />
      <h2>결제를 완료했어요</h2>

      <div class="p-grid typography--p" style="margin-top: 50px">
        <div class="p-grid-col text--left"><b>결제금액</b></div>
        <div class="p-grid-col text--right" id="amount">{{ jsonData.totalAmount }}원</div>
      </div>
      <div class="p-grid typography--p" style="margin-top: 10px">
        <div class="p-grid-col text--left"><b>주문번호</b></div>
        <div class="p-grid-col text--right" id="orderId">{{ jsonData.orderId }}</div>
      </div>
      <div class="p-grid typography--p" style="margin-top: 10px">
        <div class="p-grid-col text--left"><b>paymentKey</b></div>
        <div class="p-grid-col text--right" id="paymentKey" style="white-space: initial; width: 250px">{{ jsonData.paymentKey }}</div>
      </div>
      <div class="p-grid" style="margin-top: 30px">
        <button class="button p-grid-col5" onclick="location.href='https://docs.tosspayments.com/guides/payment/integration';">연동 문서</button>
        <button class="button p-grid-col5" onclick="location.href='https://discord.gg/A4fRFXQhRu';" style="background-color: #e8f3ff; color: #1b64da">실시간 문의</button>
      </div>
    </div>
    <div class="box_section" style="width: 600px; text-align: left">
      <b>Response Data :</b>
      <div id="response" style="white-space: initial">
        <pre>{{ jsonData }}</pre>
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
    const jsonData = ref(null);

    onMounted(async () => {
      const requestData = {
        orderId: route.query.orderId,
        amount: route.query.amount,
        paymentKey: route.query.paymentKey,
      };

      async function confirm() {
        try {
          const { response, json } = await confirmPayment(requestData);
          console.log(json);
          if (!response.ok) {
            router.push(`/fail?message=${json.message}&code=${json.code}`);
          } else {
            confirmed.value = true;
            jsonData.value = json;
          }
        } catch (error) {}
      }

      confirm();
    });

    return {
      confirmed,
      jsonData,
    };
  },
};
</script>
