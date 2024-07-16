// 서버 구성을 위한 기본 설정
var express = require('express');
var got = require('got');
var cron = require('node-cron');
var uuid = require('uuid').v4;
var querystring = require('querystring');
var sqlite3 = require('sqlite3').verbose(); // SQLite 패키지

var router = express.Router();

var secretKey = '{SECRET_KEY}';

// SQLite 데이터베이스 초기화
let db = new sqlite3.Database('./subscriptions.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the subscriptions database.');
});

db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS user (customerKey TEXT, billingKey TEXT)');
});

// 초기 화면
router.get('/', function (req, res) {
  res.render('index');
});

// 빌링키 발급 성공
router.get('/success', function (req, res) {
  got
    .post('https://api.tosspayments.com/v1/billing/authorizations/issue', {
      headers: {
        Authorization:
          'Basic ' + Buffer.from(secretKey + ':').toString('base64'),
        'Content-Type': 'application/json',
      },
      json: {
        authKey: req.query.authKey,
        customerKey: req.query.customerKey,
      },
      responseType: 'json',
    })
    .then(function (response) {
      console.log(response.body);

      // billingKey를 데이터베이스에 저장하는 로직
      const billingKey = response.body.billingKey;
      const customerKey = req.query.customerKey;

      db.run(
        'INSERT INTO user (customerKey, billingKey) VALUES (?, ?)',
        [customerKey, billingKey],
        (error) => {
          if (error) {
            console.log('Database error: ', error);
            res.redirect(`/fail?${querystring.stringify(error.response.body)}`);
          }

          res.render('success', { responseJson: response.body });
        }
      );
    })
    .catch(function (error) {
      res.redirect(`/fail?${querystring.stringify(error.response.body)}`);
    });
});

// 매달 1일에 실행
cron.schedule('0 0 1 * *', function () {
  // 데이터베이스에서 billingKey와 customerKey를 가져오는 로직
  db.get(
    'SELECT customerKey, billingKey FROM user LIMIT 1',
    [],
    (error, row) => {
      if (error || !row) {
        console.error('Database error or no data: ', error);
        return;
      }

      const { customerKey, billingKey } = row;
      
			// 결제 실행하기
      got
        .post('https://api.tosspayments.com/v1/billing/' + billingKey, {
          headers: {
            Authorization:
              'Basic ' + Buffer.from(secretKey + ':').toString('base64'),
            'Content-Type': 'application/json',
          },
          json: {
            customerKey,
            amount: 4900,
            orderId: uuid(),
            orderName: '스트리밍 서비스 구독',
            customerEmail: 'customer@email.com',
            customerName: '박토스',
            taxFreeAmount: 0,
          },
          responseType: 'json',
        })
        .then(function (response) {
          console.log(response.body);
        })
        .catch(function (error) {
          console.log('Error:', error);
        });
    }
  );
});

router.get('/fail', function (req, res) {
  res.render('fail', {
    message: req.query.message,
    code: req.query.code,
  });
});

module.exports = router;