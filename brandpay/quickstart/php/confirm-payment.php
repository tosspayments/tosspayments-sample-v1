<?php
include_once './var.php';

$data = file_get_contents("php://input");
$jsonData = json_decode($data, true);
$paymentKey = $jsonData['paymentKey'];
$orderId = $jsonData['orderId'];
$amount = $jsonData['amount'];
$customerKey = $jsonData['customerKey'];
$credential = base64_encode($secretKey . ':');

$url = 'https://api.tosspayments.com/v1/brandpay/payments/confirm';
$data = ['orderId' => $orderId, 'amount' => $amount, 'paymentKey'=>$paymentKey,'customerKey'=>$customerKey];


$curl = curl_init($url);
curl_setopt_array($curl, [
  CURLOPT_POST => TRUE,
  CURLOPT_RETURNTRANSFER => TRUE,
  CURLOPT_HTTPHEADER => [
      'Authorization: Basic ' . $credential,
      'Content-Type: application/json',
  ],
  CURLOPT_POSTFIELDS => json_encode($data)
]);

$response = curl_exec($curl);
$err = curl_error($curl);

echo $response; 
?>