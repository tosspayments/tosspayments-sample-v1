var express = require("express");
var got = require("got");
var uuid = require("uuid").v4;

var router = express.Router();

var secretKey = "{SECRET_KEY}";

router.get("/", function (req, res) {
  res.render("index");
});

router.get("/success", function (req, res) {
  // TODO: 결제를 요청하기 전에 orderId, amount를 서버에 저장하고, 승인하기 전에 저장한 값과 비교하세요.
  // 값이 다르면 결제 승인 API를 호출하지 말고 실패로 처리해요.
  // 예시)
  // const savedAmount = findAmountByOrderId(req.query.orderId); // 결제 요청 전에 서버에 저장한 금액
  // if (savedAmount == null || savedAmount !== Number(req.query.amount)) {
  //   res.status(400).send("결제 금액이 주문 금액과 달라요.");
  //   return;
  // }
  got
    .post("https://api.tosspayments.com/v1/payments/confirm", {
      headers: {
        Authorization: "Basic " + Buffer.from(secretKey + ":").toString("base64"),
        "Content-Type": "application/json",
      },
      json: {
        paymentKey: req.query.paymentKey,
        orderId: req.query.orderId,
        amount: req.query.amount,
      },
      responseType: "json",
    })
    .then(function (response) {
      res.render("success", {
        isSuccess: true,
        responseJson: response.body,
        pickedJson: pickPaymentFields(response.body),
      });
    })
    .catch(function (error) {
      res.render("success", {
        isSuccess: false,
        responseJson: error.response.body,
      });
    });
});

router.get("/fail", function (req, res) {
  res.render("fail", {
    message: req.query.message,
    code: req.query.code,
  });
});

// 승인 응답(Payment 객체)에서 화면에 필요한 필드만 골라요.
function pickPaymentFields(payment) {
  const { paymentKey, orderId, orderName, status, method, totalAmount, approvedAt } = payment;
  return { paymentKey, orderId, orderName, status, method, totalAmount, approvedAt };
}

module.exports = router;
