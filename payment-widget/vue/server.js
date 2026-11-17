const express = require("express");

const app = express();
app.use(express.json());

// TODO: 개발자센터에 로그인해서 내 결제위젯 연동 키 > 시크릿 키를 입력하세요. 시크릿 키는 외부에 공개되면 안돼요.
// @docs https://docs.tosspayments.com/reference/using-api/api-keys
const secretKey = "{WIDGET_SECRET_KEY}";

// 토스페이먼츠 API는 시크릿 키를 사용자 ID로 사용하고, 비밀번호는 사용하지 않습니다.
// 비밀번호가 없다는 것을 알리기 위해 시크릿 키 뒤에 콜론을 추가합니다.
// @docs https://docs.tosspayments.com/reference/using-api/authorization#%EC%9D%B8%EC%A6%9D
const encryptedSecretKey = "Basic " + Buffer.from(secretKey + ":").toString("base64");

// 시크릿 키를 쓰는 결제 승인 API는 브라우저가 아니라 서버에서 호출하세요.
app.post("/api/confirm", async function (req, res) {
  const { paymentKey, orderId, amount } = req.body;

  // TODO: 결제를 요청하기 전에 orderId, amount를 서버에 저장하고, 승인하기 전에 저장한 값과 비교하세요.
  // 값이 다르면 결제 승인 API를 호출하지 말고 실패로 처리해요.
  // 예시)
  // const savedAmount = await findAmountByOrderId(orderId); // 결제 요청 전에 서버에 저장한 금액
  // if (savedAmount == null || savedAmount !== Number(amount)) {
  //   res.status(400).json({ code: "INVALID_AMOUNT", message: "결제 금액이 주문 금액과 달라요." });
  //   return;
  // }

  // 결제 승인 API를 호출하세요.
  // 결제를 승인하면 결제수단에서 금액이 차감돼요.
  // @docs https://docs.tosspayments.com/guides/payment-widget/integration#3-결제-승인하기
  try {
    const response = await fetch("https://api.tosspayments.com/v1/payments/confirm", {
      method: "POST",
      headers: {
        Authorization: encryptedSecretKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ orderId, amount, paymentKey }),
    });

    const json = await response.json();
    // 브라우저에는 화면에 필요한 필드만 내려 줘요.
    res.status(response.status).json(pickPaymentFields(json, response.ok));
  } catch (error) {
    // 승인 API 호출 자체가 실패하면(네트워크 오류 등) 서버가 멈추지 않도록 실패로 응답해요.
    res.status(500).json({ code: "CONFIRM_REQUEST_FAILED", message: error.message });
  }
});

// 승인 응답(Payment 객체)에서 화면에 필요한 필드만 골라요. 실패하면 code, message 만 내려 줘요.
function pickPaymentFields(payment, ok) {
  if (!ok) {
    return { code: payment.code, message: payment.message };
  }
  const { paymentKey, orderId, orderName, status, method, totalAmount, approvedAt } = payment;
  return { paymentKey, orderId, orderName, status, method, totalAmount, approvedAt };
}

app.listen(3000, () => console.log(`http://localhost:${3000} 으로 승인 서버가 실행되었습니다.`));
