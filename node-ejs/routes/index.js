var express = require("express");
var got = require("got");
var uuid = require("uuid").v4;

var router = express.Router();

var secretKey = "test_gsk_docs_OaPz8L5KdmQXkzRz3y47BMw6";

router.get("/", function (req, res) {
  res.render("index", {
    title: "구매하기",
    orderId: uuid(),
    orderName: "토스 티셔츠",
    price: 50000,
    customerName: "김토스",
    customerKey: uuid(),
  });
});

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
      console.log(response.body);
      // TODO: 구매 완료 비즈니스 로직 구현

      res.render("success", {
        title: "성공적으로 구매했습니다",
        amount: response.body.totalAmount,
      });
    })
    .catch(function (error) {
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
