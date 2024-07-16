var express = require("express");
var got = require("got");
var uuid = require("uuid").v4;

var router = express.Router();

var secretKey = "test_ak_ZORzdMaqN3wQd5k6ygr5AkYXQGwy";

router.get("/billing_approve", function (req, res) {
  let billingKey = "";
  let customerKey = "test_customer_key";

  let orderId = "billing-" + uuid();
  let amount = 50000;
  let customerEmail = "customer@email.com";
  let customerName = "박토스";
  let orderName = "토스 정기 결제";

  got
    .post("https://api.tosspayments.com/v1/billing/" + billingKey, {
      headers: {
        Authorization:
          "Basic " + Buffer.from(secretKey + ":").toString("base64"),
        "Content-Type": "application/json",
      },
      json: {
        customerKey: customerKey,
        orderId: orderId,
        amount: amount,
        orderName: orderName,
        customerEmail: customerEmail,
        customerName: customerName,
      },
      responseType: "json",
    })
    .then(function (response) {
      res.render("billing_approve", {
        isSuccess: true,
        responseJson: response.body,
      });
    })
    .catch(function (error) {
      res.render("billing_approve", {
        isSuccess: false,
        rresponseJson: error.response.body,
      });
    });
});

module.exports = router;
