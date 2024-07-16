var express = require("express");
var got = require("got");
var uuid = require("uuid").v4;

var router = express.Router();

var secretKey = "test_ak_ZORzdMaqN3wQd5k6ygr5AkYXQGwy";

router.get("/billing_auth", function (req, res) {
  let customerKey = "test_customer_key";
  let cardNumber = "";
  let cardExpirationYear = "";
  let cardExpirationMonth = "";
  let cardPassword = "";
  let customerBirthday = "";
  let customerName = "박토스";
  let customerEmail = "customer@email.com";

  console.log(cardNumber);

  got
    .post("https://api.tosspayments.com/v1/billing/authorizations/card", {
      headers: {
        Authorization:
          "Basic " + Buffer.from(secretKey + ":").toString("base64"),
        "Content-Type": "application/json",
      },
      json: {
        customerKey: customerKey,
        cardNumber: cardNumber,
        cardExpirationYear: cardExpirationYear,
        cardExpirationMonth: cardExpirationMonth,
        cardPassword: cardPassword,
        customerBirthday: customerBirthday,
        customerEmail: customerEmail,
        customerName: customerName,
      },
      responseType: "json",
    })
    .then(function (response) {
      res.render("billing_auth", {
        isSuccess: true,
        responseJson: response.body,
      });
    })
    .catch(function (error) {
      res.render("billing_auth", {
        isSuccess: false,
        rresponseJson: error.response.body,
      });
    });
});

module.exports = router;
