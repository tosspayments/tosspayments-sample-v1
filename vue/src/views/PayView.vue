<template>
    <h1>주문서</h1>
    <div id="payment-method"></div>
    <button @click="paymentButton">결제하기</button>
</template>

<script>
import { loadPaymentWidget, ANONYMOUS } from "@tosspayments/payment-widget-sdk";
import { nanoid } from 'nanoid';

export default {
  data() {
    return {
      paymentWidget: null,
    };
  },
  async mounted() {
    // TODO: 개발자센터에 로그인해서 내 결제위젯 클라이언트 키를 입력하세요
    // @docs https://docs.tosspayments.com/reference/using-api/api-keys
    const clientKey = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm";
    this.paymentWidget = await loadPaymentWidget(clientKey, ANONYMOUS);
    // ------  결제위젯 렌더링 ------
    // https://docs.tosspayments.com/reference/widget-sdk#renderpaymentmethods선택자-결제-금액-옵션
    this.paymentWidget.renderPaymentMethods("#payment-method", { value: 50000 });
  },
  methods: {
    async paymentButton() {
      try {
        if (this.paymentWidget) {
          // ------ '결제하기' 버튼 누르면 결제창 띄우기 ------
          // https://docs.tosspayments.com/reference/widget-sdk#requestpayment결제-정보
          const orderId = nanoid();
          await this.paymentWidget.requestPayment({
            orderId: orderId,
            orderName: "토스 티셔츠 외 2건",
            customerName: "김토스",
            customerEmail: "customer123@gmail.com",
            successUrl: `${window.location.origin}/success`,
            failUrl: `${window.location.origin}/fail`,
          });
        }
      } catch (error) {
        // 에러 처리하기
        console.error(error);
      }
    }
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
