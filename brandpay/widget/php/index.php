<?php
/* 브랜드페이 위젯 연동 가이드 */
include_once "./setting/var.php"
?>
<!DOCTYPE html>
<html lang="ko">

<head>
  <meta charset="utf-8" />
  <link rel="stylesheet" type="text/css" href="./css/index.css">
  <title>브랜드페이 위젯 샘플 프로젝트</title>
  <!-- BrandPay SDK script 추가 -->
  <script type="text/javascript" src="https://js.tosspayments.com/v1/brandpay"></script>
  <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

</head>

<body>
  <form id="payment-form" style="text-align: center;">
    <div id="payment-methods-widget"></div>
    <button id="button" type="primary" class="button">결제 금액 업데이트</button>
    <button id="submit" type="primary" class="button">결제하기</button>
  </form>
</body>
<script>
  // API 키 설정
  // 문서: https://docs.tosspayments.com/guides/brandpay/integration#api-키-설정-및-sdk-준비
  const clientKey = '<?= $clientKey?>';
  const customerKey = 'CUSTOMER_KEY'; //[TODO] 상점에서 고객을 구분하기 위해 발급한 고객의 고유 ID로 변경하세요.

  // brandpay 초기화
  const brandpay = BrandPay(clientKey, customerKey, {
    redirectUrl: '<?=$redirectUrl?>',
  });

  // 결제 위젯 객체
  let paymentMethodsWidget = null;

  initialize();

  async function initialize() {
    // 결제 수단 위젯 객체 초기화
    paymentMethodsWidget = brandpay.createPaymentMethodsWidget({
      amount: 50000
    });

    // 결제 수단 위젯 렌더
    paymentMethodsWidget.render('#payment-methods-widget', {
      ui: {
        promotionSection: {
          summary: {
            visible: true,
          },
          description: {
            visible: true,
            defaultOpen: true,
          },
        },
      },
    });
  }

  document
    .querySelector('#payment-form')
    .addEventListener('submit', handleSubmit);

  document.querySelector('#button').addEventListener('click', updateAmount);

  // 결제 금액 업데이트
  async function updateAmount(e) {
    e.preventDefault();
    paymentMethodsWidget.updateAmount(45000);
  }

  // 결제 하기
  async function handleSubmit(e) {
    e.preventDefault();

    // 위젯 결제 정보
    const widgetPaymentParams = paymentMethodsWidget.getPaymentParams();

    await brandpay.requestPayment({
        orderId: 'ORDER_ID', // 주문에 대한 고유한 ID 값
        orderName: '생수 외 1건', // 결제에 대한 주문명

        ...widgetPaymentParams,
      }).then((res) => {
        // 결제 승인 요청
        res.customerKey = customerKey
        return axios.post('./confirm-payment.php', res)
      })
      .then((res) => {
        alert("결제 요청 성공 - 결과는 consoloe.log 확인");
        console.log(res);
      })
      .catch((err) => {
        alert("결제 요청 실패 - 결과는 consoloe.log 확인");
        if (err.code == 'USER_CANCEL') {
          console.log('사용자 취소')
        } else {
          console.log('기타 에러 상황', err.code, err.message)
        }
      });
  }

</script>
</html>
