<template>
  <div class="wrapper">
    <div class="box_section">
      <!-- 결제 UI -->
      <div id="payment-method"></div>
      <!-- 이용약관 UI -->
      <div id="agreement"></div>
      <!-- 쿠폰 체크박스 -->
      <div style="padding-left: 25px">
        <div class="checkable typography--p">
          <label for="coupon-box" class="checkable__label typography--regular">
            <input :disabled="!inputEnabled" @change="updateAmount" id="coupon-box" class="checkable__input" type="checkbox" aria-checked="true" /><span class="checkable__label-text"
              >5,000원 쿠폰 적용</span
            >
          </label>
        </div>
      </div>
      <!-- 결제하기 버튼 -->
      <button :disabled="!inputEnabled" @click="requestPayment" class="button" id="payment-button" style="margin-top: 30px">결제하기</button>
    </div>
  </div>
</template>

<script>
import { loadPaymentWidget, ANONYMOUS } from "@tosspayments/payment-widget-sdk";
import { nanoid } from "nanoid";

export default {
  data() {
    return {
      paymentWidget: null,
      paymentMethodWidget: null,
      // TODO: clientKey는 개발자센터의 결제위젯 연동 키 > 클라이언트 키로 바꾸세요.
      // TODO: customerKey는 구매자와 1:1 관계로 무작위한 고유값을 생성하세요.
      clientKey: "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm",
      customerKey: nanoid(),
      amount: 50000,
      inputEnabled: false,
    };
  },
  methods: {
    async requestPayment() {
      try {
        if (this.paymentWidget) {
          // ------ '결제하기' 버튼 누르면 결제창 띄우기 ------
          // 결제를 요청하기 전에 orderId, amount를 서버에 저장하세요.
          // 결제 과정에서 악의적으로 결제 금액이 바뀌는 것을 확인하는 용도입니다.
          // @docs https://docs.tosspayments.com/reference/widget-sdk#requestpayment결제-정보
          await this.paymentWidget.requestPayment({
            orderId: nanoid(),
            orderName: "토스 티셔츠 외 2건",
            customerName: "김토스",
            customerEmail: "customer123@gmail.com",
            customerMobilePhone: "01012341234",
            successUrl: `${window.location.origin}/success`,
            failUrl: `${window.location.origin}/fail`,
          });
        }
      } catch (error) {
        // 에러 처리하기
        console.error(error);
      }
    },
    async updateAmount() {
      const coupon = document.getElementById("coupon-box");
      // ------  결제 금액 업데이트 ------
      // @docs https://docs.tosspayments.com/reference/widget-sdk#updateamount결제-금액
      if (coupon.checked) {
        this.paymentMethodWidget.updateAmount(this.amount - 5000);
      } else {
        this.paymentMethodWidget.updateAmount(this.amount);
      }
    },
  },
  async mounted() {
    // ------  결제위젯 초기화 ------
    // @docs https://docs.tosspayments.com/reference/widget-sdk#sdk-설치-및-초기화
    this.paymentWidget = await loadPaymentWidget(this.clientKey, ANONYMOUS);

    // ------  결제 UI 렌더링 ------
    // @docs https://docs.tosspayments.com/reference/widget-sdk#renderpaymentmethods선택자-결제-금액-옵션
    this.paymentMethodWidget = this.paymentWidget.renderPaymentMethods("#payment-method", { value: this.amount }, { variantKey: "DEFAULT" });
    // ------  이용약관 UI 렌더링 ------
    // @docs https://docs.tosspayments.com/reference/widget-sdk#renderagreement선택자-옵션
    this.paymentWidget.renderAgreement("#agreement", { variantKey: "AGREEMENT" });

    this.paymentMethodWidget.on("ready", () => {
      this.inputEnabled = true;
    });
  },
};
</script>
