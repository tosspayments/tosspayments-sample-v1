var express = require("express");
var got = require("got");
var uuid = require("uuid").v4;

var router = express.Router();

// TODO: 개발자센터에 로그인해서 내 결제위젯 연동 키 > 시크릿 키를 입력하세요. 시크릿 키는 외부에 공개되면 안돼요.
// @docs https://docs.tosspayments.com/reference/using-api/api-keys
var secretKey = "test_gsk_docs_OaPz8L5KdmQXkzRz3y47BMw6";

router.get("/", function (req, res) {
  res.render("checkout", {
    title: "구매하기",
    orderId: uuid(),
    orderName: "토스 티셔츠",
    price: 50000,
    customerName: "김토스",
    customerKey: uuid(),
  });
});

// ------  결제 승인 ------
// @docs https://docs.tosspayments.com/guides/payment-widget/integration#3-결제-승인하기
router.get("/success", function (req, res) {
  got
    .post("https://api.tosspayments.com/v1/payments/confirm", {
      headers: {
        Authorization:
          "Basic " + Buffer.from(secretKey + ":").toString("base64"),
        "Content-Type": "application/json",
      },
      json: {
        orderId: req.query.orderId,
        amount: req.query.amount,
        paymentKey: req.query.paymentKey,
      },
      responseType: "json",
    })
    .then(function (response) {
      // TODO: 구매 완료 비즈니스 로직 구현
      console.log(response.body)
      res.render("success", {
        amount: response.body.totalAmount,
        paymentKey: response.body.paymentKey,
        orderId: response.body.orderId,
      });
    })
    .catch(function (error) {
      // TODO: 구매 실패 비즈니스 로직 구현
      res.redirect(
        `/fail?code=${error.response?.body?.code}&message=${error.response?.body?.message}`
      );
    });
});

router.get("/fail", function (req, res) {
  res.render("fail", {
    message: req.query.message,
    code: req.query.code,
  });
});

module.exports = router;
