<template>
    <h1>결제위젯 결제 실패</h1>
    <br />
    <p>에러 코드: {{ this.$route.query.code }}</p>
    <p>에러 메세지: {{ this.$route.query.message }}</p>
</template>
  
<style>
#app {
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
