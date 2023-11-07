<template>
  <div class="result wrapper">
  <div class="box_section">  
  <!-- 결제 성공 시 -->
    <h2 style="padding: 20px 0px 10px 0px">
      <img
        width="25"
        src="https://static.toss.im/3d-emojis/u1F6A8-apng.png"
      />
      결제 실패
    </h2>
    <p>code = {{ this.$route.query.code }}</p>
    <p>message = {{ this.$route.query.message }}</p>
    <div class="result wrapper">
        <button class="button" onclick="location.href='https://docs.tosspayments.com/guides/payment-widget/integration';"
        style="margin-top:30px; margin-right: 10px">연동 문서</button>
        <button class="button" onclick="location.href='https://discord.gg/A4fRFXQhRu';"
        style="margin-top:30px;background-color: #e8f3ff;color:#1b64da ">실시간 문의</button>
      </div>   
    </div>
  </div>

</template>