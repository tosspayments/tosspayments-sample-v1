const express = require("express");

const app = express();
app.use(express.json());

// TODO: 개발자센터에 로그인해서 내 API 키 > 시크릿 키를 입력하세요. 시크릿 키는 외부에 공개되면 안돼요.
// @docs https://docs.tosspayments.com/reference/using-api/api-keys
const secretKey = "{SECRET_KEY}";

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

  try {
    const response = await fetch("https://api.tosspayments.com/v1/payments/" + encodeURIComponent(paymentKey), {
      method: "POST",
      headers: {
        Authorization: "Basic " + Buffer.from(secretKey + ":").toString("base64"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount, orderId }),
    });

    const json = await response.json();
    res.status(response.status).json(json);
  } catch (error) {
    // 승인 API 호출 자체가 실패하면(네트워크 오류 등) 서버가 멈추지 않도록 실패로 응답해요.
    res.status(500).json({ code: "CONFIRM_REQUEST_FAILED", message: error.message });
  }
});

app.listen(3000, () => console.log(`http://localhost:${3000} 으로 승인 서버가 실행되었습니다.`));
