<template>
  <section class="hero is-link">
    <div class="hero-body">
      <div class="container">
        <h1 class="title">토스페이먼츠 연동 샘플</h1>
      </div>
    </div>
  </section>
  <section class="section">
    <div class="container">
      <button class="button is-link" v-on:click="pay('카드')">일반결제창</button>
      <button class="button is-link" v-on:click="pay('가상계좌')">가상계좌</button>
      <button class="button is-link" v-on:click="pay('계좌이체')">계좌이체</button>
      <button class="button is-link" v-on:click="pay('휴대폰')">휴대폰</button>
      <button class="button is-link" v-on:click="pay('문화상품권')">문화상품권</button>
      <button class="button is-link" v-on:click="pay('도서문화상품권')">도서문화상품권</button>
      <button class="button is-link" v-on:click="pay('게임문화상품권')">게임문화상품권</button>
    </div>
  </section>

  <!-- 선택한 페이지 렌더링 -->
  <router-view />
</template>

<script>
import { loadTossPayments } from "@tosspayments/payment-sdk";
const clientKey = "test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq";

let func1 = loadTossPayments(clientKey);

export default {
  name: "pgWindow",
  created() {},
  methods: {
    pay: function (method) {
      func1.then((tossPayments) => {
        let amt = 50000;
        let orderId = new Date().getTime();

        tossPayments
          .requestPayment(method, {
            amount: amt,
            orderId: orderId,
            orderName: "토스 티셔츠 외 1건",
            customerName: "박토스",
            successUrl: "http://localhost:8080/success",
            failUrl: "http://localhost:8080/fail",
          })
          .catch((error) => {
            if (error.code === "USER_CANCEL") {
              alert("유저가 취소했습니다.");
            } else {
              alert(error.message);
            }
          });
      });
    },
  },
};
</script>

<style></style>
