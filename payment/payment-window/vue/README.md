# payment-window/vue

Vue를 이용한 결제창 샘플입니다.

## 실행하기

1. 의존성 패키지를 다운로드하고 서버를 실행합니다.

   ```sh
   $ npm install # 의존성 패키지 다운로드
   $ npm run server # 결제 승인 서버 실행 (localhost:3000)
   $ npm run serve # 다른 터미널에서 화면 서버 실행
   ```

   결제 승인 서버는 전역 `fetch` 를 쓰므로 Node 18 이상에서 실행하세요.

2. 로컬 환경에서 샘플 프로젝트를 확인하세요.

\* 승인 API는 시크릿 키가 필요해서 브라우저가 아니라 서버(`server.js`)에서 호출합니다. `server.js` 파일에 있는 `secretKey`를 내 시크릿 키로 수정하세요. 시크릿 키는 브라우저 코드에 넣지 마세요.
