<?php
$postData = file_get_contents('php://input');
$json = json_decode($postData);

$secret = $json->secret;
$status = $json->status;
$orderId = $json->orderId;

// TODO: 요청 본문의 secret 을 결제 승인 응답에서 저장해 둔 secret 과 비교하고, 다르면 처리하지 마세요.
// TODO: 결제 조회 API 로 결제 상태를 다시 확인한 뒤 주문 상태를 바꾸세요.
// @docs https://docs.tosspayments.com/reference#orderid로-결제-조회
// 예시)
// $savedPayment = findPaymentByOrderId($orderId); // 승인할 때 저장한 결제 정보
// if ($savedPayment === null || !hash_equals($savedPayment['secret'], (string) $secret)) {
//     http_response_code(400);
//     exit('FAIL');
// }
// $payment = getPaymentByOrderId($orderId); // GET /v1/payments/orders/{orderId}

// 응답에는 요청 값을 되돌려 쓰지 않아요.
header('Content-Type: text/plain; charset=UTF-8');
echo 'OK';

