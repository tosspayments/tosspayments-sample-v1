const express = require('express')
const axios = require('axios')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

// [TODO] 아래 키는 테스트용 시크릿 키입니다. 계정 설정이 진행된 후에는 내 상점의 키 값으로 변경하세요. 
// [NOTE] 시크릿 키는 외부에 노출되어서는 안됩니다.
// 문서: https://docs.tosspayments.com/reference/using-api/api-keys
const SECRET_KEY = 'test_sk_zXLkKEypNArWmo50nX3lmeaxYG5R'

app.use(bodyParser.json())
app.use('/static', express.static('public'));

// 결제 페이지
app.get('/checkout', (req, res) => {
  res.sendFile(__dirname + '/views/checkout.html')
})

// 최종 결제 승인
app.post('/confirm-payment', async (req, res) => {
  await axios.post(
    `https://api.tosspayments.com//v1/payments/confirm`,
    {
      paymentKey: req.body.paymentKey,
      customerKey: req.query.customerKey,
      orderId: req.body.orderId,
      amount: req.body.amount,
    },
    {
      headers: {
        // [TODO] Basic 인증 방식의 사용자명과 비밀번호는 콜론으로 구분해서 `사용자명:비밀번호`로 추가합니다. 상점의 시크릿 키를 사용자명으로, 비밀번호는 공백으로 추가한 뒤 base64로 인코딩하세요.
        // 문서: https://docs.tosspayments.com/reference/using-api/authorization
        Authorization: `Basic ${Buffer.from(SECRET_KEY + ":", "utf8").toString(
          "base64"
        )}`,
        "Content-Type": "application/json",
      },
    }
  );

  res.status(200).send('OK')
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
  console.log(`Payment Widget sample project listening on port ${port}: http://localhost:3000/checkout`)
})
