<template>
  <div class="hello">
    <h1>주문서</h1>
    <div id="payment-method"></div>
    <button @click="clickPaymentButton">결제하기</button>
  </div>
</template>

<script>
import { generateRandomString } from "../utils/util";

const clientKey = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm";
const paymentWidget = PaymentWidget(clientKey, PaymentWidget.ANONYMOUS);

export default {
  mounted() {
    paymentWidget.renderPaymentMethods("#payment-method", { value: 50_000 });
  },
  methods: {
    clickPaymentButton() {
      paymentWidget
        .requestPayment({
          orderId: generateRandomString(),
          orderName: "리팩터링 2판 외 1권",
          successUrl: window.location.origin + "/success",
          failUrl: window.location.origin + "/fail",
          customerEmail: "customer123@gmail.com", // 고객 이메일 (선택)
          customerName: "김토스", // 고객 이름 (선택)
        })
        .then((v) => console.log(v));
    },
  },
};
</script>
