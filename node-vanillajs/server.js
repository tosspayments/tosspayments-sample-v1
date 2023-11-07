var express = require("express");
var app = express();
var { resolve } = require("path");
var got = require("got");

app.use(express.static(__dirname + '/public'));

app.get("/", function (req, res) {
  var path = resolve("./client/checkout.html");
  res.sendFile(path);
});

// ------ successUrl로 이동한 경우 ------
app.get("/success", function (req, res) {
  // 쿼리 파라미터를 확인하고
  // 서버에 저장된 orderId, amount와 동일한지 확인하세요.
  var { paymentKey, orderId, amount } = req.query; 

  // paymentKey를 서버에 저장하는 로직을 추가하세요. 
  // paymentKey는 반드시 저장해야 합니다. 
  // 결제 상태가 변해도 값이 유지되며 결제 승인, 취소, 조회 등에 사용됩니다.

  // ------ 시크릿 키・Basic 인증 헤더 ------
  // 시크릿 키는 외부에 공개되면 안 돼요.
  var secretKey = "test_gsk_docs_OaPz8L5KdmQXkzRz3y47BMw6";
  // 토스페이먼츠 API는 시크릿 키를 사용자 ID로 사용하고, 비밀번호는 사용하지 않습니다.
  // 비밀번호가 없다는 것을 알리기 위해 시크릿 키 뒤에 콜론을 추가합니다.
  var encryptedSecretKey =
  "Basic " + Buffer.from(secretKey + ":").toString("base64");

  // ------ 결제 승인 API 호출 ------
  got
    .post("https://api.tosspayments.com/v1/payments/confirm", {
      headers: {
        // Basic 인증 방법으로 인코딩된 결제위젯 시크릿 키
        Authorization: encryptedSecretKey,
        "Content-Type": "application/json",
      },
      // 쿼리 파라미터로 받은 데이터
      json: {
        orderId: orderId,
        amount: amount,
        paymentKey: paymentKey,
      },
      responseType: "json",
    })
    .then(function (response) {
      console.log(response.body)
      var path = resolve("./client/success.html");
      res.sendFile(path);
    })
    .catch(function (error) {
      res.redirect(
        `/fail?code=${error.response?.body?.code}&message=${error.response?.body?.message}`
      );
    });
});

// ------ failUrl로 이동한 경우 ------=
app.get("/fail", function (req, res) {
  // 결제 요청이 실패하면 바로 failUrl로 이동합니다
  var path = resolve("./client/fail.html");
  res.sendFile(path);
});

app.listen(4242, () => console.log(`Node server listening on port ${4242}!`));
