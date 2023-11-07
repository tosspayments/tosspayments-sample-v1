<template>
  <div class="wrapper">
    <div class="box_section">
      <!-- 결제 UI -->
      <div id="payment-method"></div>
      <!-- 이용약관 UI -->
      <div id="agreement"></div>
      <!-- 쿠폰 체크박스 -->
      <div style="padding-left: 25px">
        <div class="checkable typography--p"><label for="coupon-box" class="checkable__label typography--regular"><input @change="updateAmount" id="coupon-box" class="checkable__input" type="checkbox" aria-checked="true"><span class="checkable__label-text">5,000원 쿠폰 적용</span></label></div>
      </div>
      <!-- 결제하기 버튼 -->
      <div class="result wrapper">
        <button @click="requestPayment" class="button" id="payment-button"
        style="margin-top:30px; ">결제하기</button>
      </div>
    </div>
  </div>
</template>

<script>
import { loadPaymentWidget, ANONYMOUS } from "@tosspayments/payment-widget-sdk";
import { nanoid } from 'nanoid';

export default {
  data() {
    return {
      paymentWidget: null,
      paymentMethodWidget: null,
      clientKey: "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm",
      amount: 50000,
    };
  },
  methods: {
    async requestPayment() {
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
            failUrl: `${window.location.origin}/fail`
          });
        }
      } catch (error) {
        // 에러 처리하기
        console.error(error);
      }
    },
    async updateAmount (){
      const coupon = document.getElementById("coupon-box");

      if (coupon.checked) {
        this.paymentMethodWidget.updateAmount(this.amount - 5000);
        console.log("checked");
      } else {
        this.paymentMethodWidget.updateAmount(this.amount);
        console.log("unchecked")
      }
    }
  },
  async mounted() {
    this.paymentWidget = PaymentWidget(this.clientKey, ANONYMOUS);
    this.paymentMethodWidget = this.paymentWidget.renderPaymentMethods(
        "#payment-method",
        { value: this.amount },
        { variantKey: "DEFAULT" }
      );
    this.paymentWidget.renderAgreement("#agreement", { variantKey: "AGREEMENT" });
  },

};
</script>