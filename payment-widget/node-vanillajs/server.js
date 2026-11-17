var express = require("express");
var got = require("got");
var { resolve } = require("path");

var app = express();

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// TODO: 개발자센터에 로그인해서 내 결제위젯 연동 키 > 시크릿 키를 입력하세요. 시크릿 키는 외부에 공개되면 안돼요.
// @docs https://docs.tosspayments.com/reference/using-api/api-keys
var secretKey = "{WIDGET_SECRET_KEY}";

app.post("/confirm", function (req, res) {
  var { paymentKey, orderId, amount } = req.body;

  // TODO: 결제를 요청하기 전에 orderId, amount를 서버에 저장하고, 승인하기 전에 저장한 값과 비교하세요.
  // 값이 다르면 결제 승인 API를 호출하지 말고 실패로 처리해요.
  // 예시)
  // const savedAmount = findAmountByOrderId(orderId); // 결제 요청 전에 서버에 저장한 금액
  // if (savedAmount == null || savedAmount !== Number(amount)) {
  //   res.status(400).json({ code: "INVALID_AMOUNT", message: "결제 금액이 주문 금액과 달라요." });
  //   return;
  // }
  // 토스페이먼츠 API는 시크릿 키를 사용자 ID로 사용하고, 비밀번호는 사용하지 않습니다.
  // 비밀번호가 없다는 것을 알리기 위해 시크릿 키 뒤에 콜론을 추가합니다.
  // @docs https://docs.tosspayments.com/reference/using-api/authorization#%EC%9D%B8%EC%A6%9D
  var encryptedSecretKey = "Basic " + Buffer.from(secretKey + ":").toString("base64");

  // 결제 승인 API를 호출하세요.
  // 결제를 승인하면 결제수단에서 금액이 차감돼요.
  // @docs https://docs.tosspayments.com/guides/payment-widget/integration#3-결제-승인하기
  got
    .post("https://api.tosspayments.com/v1/payments/confirm", {
      headers: {
        Authorization: encryptedSecretKey,
        "Content-Type": "application/json",
      },
      json: {
        orderId: orderId,
        amount: amount,
        paymentKey: paymentKey,
      },
      responseType: "json",
    })
    .then(function (response) {
      // TODO: 결제 완료 비즈니스 로직을 구현하세요.
      // 브라우저에는 화면에 필요한 필드만 내려 줘요.
      res.status(response.statusCode).json(pickPaymentFields(response.body));
    })
    .catch(function (error) {
      // TODO: 결제 실패 비즈니스 로직을 구현하세요.
      console.log(error.response.body.code);
      res.status(error.response.statusCode).json({ code: error.response.body.code, message: error.response.body.message });
    });
});

// 승인 응답(Payment 객체)에서 화면에 필요한 필드만 골라요.
function pickPaymentFields(payment) {
  const { paymentKey, orderId, orderName, status, method, totalAmount, approvedAt } = payment;
  return { paymentKey, orderId, orderName, status, method, totalAmount, approvedAt };
}

app.get("/", function (req, res) {
  var path = resolve("./public/checkout.html");
  res.sendFile(path);
});

app.get("/success", function (req, res) {
  var path = resolve("./public/success.html");
  res.sendFile(path);
});

app.get("/fail", function (req, res) {
  var path = resolve("./public/fail.html");
  res.sendFile(path);
});

app.listen(4242, () => console.log(`http://localhost:${4242} 으로 샘플 앱이 실행되었습니다.`));
