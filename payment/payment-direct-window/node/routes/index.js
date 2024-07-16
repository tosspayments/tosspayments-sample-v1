var express = require("express");
var got = require("got");
var uuid = require("uuid").v4;

var router = express.Router();

var secretKey = "test_sk_zXLkKEypNArWmo50nX3lmeaxYG5R";

router.get("/", function (req, res) {
  res.render("index");
});

router.get("/success", function (req, res) {
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
      console.log(response.body);

      res.render("success", {
        isSuccess: true,
        responseJson: response.body,
      });
    })
    .catch(function (error) {
      console.log(error);

      res.render("keyin", {
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

module.exports = router;
