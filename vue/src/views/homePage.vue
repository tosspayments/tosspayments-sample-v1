<template>
  <div class="hello">
    <h1>주문서</h1>
    <div id="payment-method"></div>
    <button @click="clickPaymentButton">결제하기</button>
  </div>
</template>

<script>
import { generateRandomString } from "../utils/util";

// TODO: 개발자센터에 로그인해서 내 결제위젯 클라이언트 키를 입력하세요
// @docs https://docs.tosspayments.com/reference/using-api/api-keys
const clientKey = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm";
const paymentWidget = PaymentWidget(clientKey, PaymentWidget.ANONYMOUS);

export default {
  mounted() {
    // ------  결제위젯 렌더링 ------
    // https://docs.tosspayments.com/reference/widget-sdk#renderpaymentmethods선택자-결제-금액-옵션
    paymentWidget.renderPaymentMethods("#payment-method", { value: 50_000 });
  },
  methods: {
    // ------ '결제하기' 버튼 누르면 결제창 띄우기 ------
    // https://docs.tosspayments.com/reference/widget-sdk#requestpayment결제-정보
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
