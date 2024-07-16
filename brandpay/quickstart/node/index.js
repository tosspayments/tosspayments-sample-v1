const express = require('express')
const axios = require('axios')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

// API 키 설정
// 문서: https://docs.tosspayments.com/guides/brandpay/integration#api-키-설정-및-sdk-준비

// [TODO] 아래 키는 테스트용 시크릿 키입니다. 계정 설정이 진행된 후에는 내 상점의 키 값으로 변경하세요. 
// [NOTE] 시크릿 키는 외부에 노출되어서는 안됩니다.
const SECRET_KEY = 'test_sk_zXLkKEypNArWmo50nX3lmeaxYG5R'

app.use(bodyParser.json())
app.use('/static', express.static('public'));

// 결제 페이지
app.get('/checkout', (req, res) => {
  res.sendFile(__dirname + '/views/checkout.html')
})

// Access Token 발급 받기
// 문서: https://docs-staging.tosspayments.com/guides/brandpay/integration#access-token-발급받기

app.get('/callback-auth', async (req, res) => {
  await axios.post(
    "https://api.tosspayments.com/v1/brandpay/authorizations/access-token",
    JSON.stringify({
      grantType: "AuthorizationCode",
      // Access Token 발급을 위해 리다이렉트 URL에 포함되어 돌아온 code와 customerKey 전달
      code: req.query.code,
      customerKey: req.query.customerKey,
    }),
    {
      headers: {
        // [TODO] Basic 인증 방식의 사용자명과 비밀번호는 콜론으로 구분해서 `사용자명:비밀번호`로 추가합니다. 상점의 시크릿 키를 사용자명으로, 비밀번호는 공백으로 추가한 뒤 base64로 인코딩하세요.
        // 문서: https://docs-staging.tosspayments.com/guides/brandpay/auth#2-브랜드페이-access-token-요청
        Authorization: `Basic ${Buffer.from(SECRET_KEY + ":", "utf8").toString(
          "base64"
        )}`,
        "Content-Type": "application/json",
      },
    }
  );

  // 성공(HTTP status 200) 응답
  res.status(200).send('OK')
})

// 최종 결제 승인
app.post('/confirm-payment', async (req, res) => {
  try {
    await axios.post(
      `https://api.tosspayments.com/v1/brandpay/payments/confirm`,
      {
        customerKey: req.body.customerKey,
        paymentKey: req.body.paymentKey,
        orderId: req.body.orderId,
        amount: req.body.amount,
      },
      {
        headers: {
          // [TODO] Basic 인증 방식의 사용자명과 비밀번호는 콜론으로 구분해서 `사용자명:비밀번호`로 추가합니다. 상점의 시크릿 키를 사용자명으로, 비밀번호는 공백으로 추가한 뒤 base64로 인코딩하세요.
          // 문서: https://docs-staging.tosspayments.com/guides/brandpay/auth#2-브랜드페이-access-token-요청
          Authorization: `Basic ${Buffer.from(SECRET_KEY + ":", "utf8").toString(
            "base64"
          )}`,
          "Content-Type": "application/json",
        },
      }
    )
    res.status(200).send('OK');
  } catch (error) {
    console.error(error.response.data.message)
    res.status(500).send(error.response.data.message)
  };  
})

// 결제 실패 페이지
app.get('/fail', (req, res) => {
  res.sendFile(__dirname + '/views/fail.html')
})

// 결제 성공 페이지
app.get('/success', (req, res) => {
  res.sendFile(__dirname + '/views/success.html')
})

app.listen(port, () => {
  console.log(`Example BrandPay app listening on port ${port}`)
})
