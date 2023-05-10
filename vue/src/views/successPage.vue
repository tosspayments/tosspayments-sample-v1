<template>
  <h1>결제위젯 결제 성공</h1>
  <br />
  <p>paymentKey: {{ this.$route.query.paymentKey }}</p>
  <p>orderId: {{ this.$route.query.orderId }}</p>
  <p>amount: {{ this.$route.query.amount }}</p>
</template>
