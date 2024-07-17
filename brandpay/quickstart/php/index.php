<?php
include_once "./setting/var.php"
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>브랜드페이 샘플 프로젝트</title>

    <link rel="stylesheet" type="text/css" href="./css/index.css">
    
    <!-- BrandPay SDK script 추가 -->
    <script src="https://js.tosspayments.com/v1/brandpay"></script>
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    <script>
      // API 키 설정 및 SDK 준비
      // 문서: https://docs.tosspayments.com/guides/brandpay/integration#api-키-설정-및-sdk-준비
      
      // [TODO] 아래 키는 테스트용 클라이언트 키입니다. 계정 설정이 진행된 후에는 내 상점의 키 값으로 변경하세요. (/common/var.php에서 설정)
      var clientKey = '<?=$clientKey?>'
      // [TODO] 상점에서 고객을 구분하기 위해 발급한 고객의 고유 ID로 변경하세요.
      var customerKey = 'CUSTOMER_KEY1'
      // [TODO] 상점에서 주문 건에 대해 발급한 고유 ID로 변경하세요.
      var orderId = 'ORDER_ID1'

      // BrandPay 객체 초기화
      var brandpay = BrandPay(clientKey, customerKey, {
        // [TODO] 상점 개발 정보 페이지에 추가한 리다이렉트 URL이 있다면 아래 값을 변경하세요. (/common/var.php에서 설정)
        redirectUrl: '<?=$redirectUrl?>'
      })
     
      function requestPayment() {
        if (!validateParams()) return // [NOTE] 샘플 코드 연동 과정을 돕기 위한 코드입니다. 실제 연동에 사용하지 않습니다.

        brandpay.requestPayment({
          amount: 5000, // 결제 금액
          orderId: orderId, // 주문에 대한 고유한 ID 값
          orderName: '토스 티셔츠 외 2건', // 결제에 대한 주문명
        })
          .then((res) => {
            // 결제 승인 요청
            res.customerKey = customerKey
            return axios.post('./confirm-payment.php', res)
          })
          .then((res) => {
            alert("결제 요청 성공 - 결과는 consoloe.log 확인");
            console.log(res)
          })
          .catch((err) => {
            alert("결제 요청 실패 - 결과는 consoloe.log 확인");
            if (err.code == 'USER_CANCEL') {
              console.log('사용자 취소')
            } else {
              console.log('기타 에러 상황', err.code, err.message)
            }
          })
      }

      // [NOTE] 아래 내용은 샘플 코드 연동 과정을 돕기 위한 코드입니다. 실제 연동에 사용하지 않습니다.
      function validateParams() {
        if (customerKey === 'CUSTOMER_KEY') {
          alert('customerKey 값을 설정해주세요.')
          return false
        } else if (orderId === 'ORDER_ID') {
          alert('orderId 값을 설정해주세요.')
          return false
        }

        return true
      }
  </script>

  </head>
  <body>
    <div class="wrapper vertical">
      <img src="./image/t-short.png">
      <p>토스 티셔츠 외 2건</p>
      <p>금액: 5,000원</p>
      <button class="button" type="primary" onclick="requestPayment()">결제하기</button>
    </div>
  </body>
</html>

