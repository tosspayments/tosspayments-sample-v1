const fetch = require('node-fetch');
const express = require('express');
const cors = require('cors');

var path = require('path');

const app = express();
const port = 3000; 
app.use(cors()); 
app.use(express.json());


app.post('/api/confirm', async (req, res) => {
  try {
    // TODO: 개발자센터에 로그인해서 내 결제위젯 시크릿 키를 입력하세요. 시크릿 키는 외부에 공개되면 안돼요.
    // https://docs.tosspayments.com/reference/using-api/api-keys
    const secretKey = "test_gsk_docs_OaPz8L5KdmQXkzRz3y47BMw6";

    
    // 토스페이먼츠 API는 시크릿 키를 사용자 ID로 사용하고, 비밀번호는 사용하지 않습니다.
    // 비밀번호가 없다는 것을 알리기 위해 시크릿 키 뒤에 콜론을 추가합니다.
    // https://docs.tosspayments.com/reference/using-api/authorization#%EC%9D%B8%EC%A6%9D
    const encryptedSecretKey = `Basic ${Buffer.from(secretKey + ":").toString('base64')}`;
    
    const requestData = req.body;
    
    // ------  결제 승인 ------
    // https://docs.tosspayments.com/guides/payment-widget/integration#3-결제-승인하기
    const response = await fetch("https://api.tosspayments.com/v1/payments/confirm", {
      method: "POST",
      headers: {
        "Authorization": encryptedSecretKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    const json = await response.json();

    if (!response.ok) {
      res.status(response.status).json(json);
    } else {
      res.json(json);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(port, () => {
  console.log(`Server running at ${port}/`);
});
