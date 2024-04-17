# 결제위젯 Node.js + VanillaJS 샘플 프로젝트

결제위젯 JavaScript SDK로 결제 과정을 구현한 Node.js 샘플 프로젝트입니다. 서버는 Express로 구성되었습니다. 자세한 연동 방법과 결제 과정은 [공식 연동 문서](https://docs.tosspayments.com/guides/payment-widget/integration)에서 확인하세요.

## 데모

[데모](https://codesandbox.io/p/sandbox/payment-widget-js-sample-zr9vkt)

## 준비하기

샘플 프로젝트를 사용하려면 [Node.js](https://nodejs.org/ko/) 14.0.0 이상의 버전이 필요합니다. 먼저 내 컴퓨터의 Node.js 버전을 확인하세요.

```sh
$ node -v
$ v16.15.1
```

Node.js가 없다면 [Node.js 홈페이지](https://nodejs.org/ko/download/)에서 다운로드하거나 [nvm](https://github.com/nvm-sh/nvm#about)(Node Version Manager)을 사용해서 설치하세요.

## 실행하기

1. 결제위젯 샘플 프로젝트 레포지토리를 클론(Clone)하고 Node.ejs 폴더로 진입하세요.

   ```sh
   $ git clone https://github.com/tosspayments/payment-widget-sample # 샘플 프로젝트 클론
   $ cd payment-widget-sample/node-vanillajs
   ```

2. 의존성 패키지를 다운로드하고 서버를 실행합니다.

   ```sh
   $ npm install # 의존성 패키지 다운로드
   $ npm start # 서버 실행
   ```

3. http://localhost:4242/ 에서 샘플 프로젝트를 확인하세요.

## 인증하기

샘플에 있는 키로 연동이 가능하지만, 내 테스트 연동 키를 사용하면 테스트 결제내역, 웹훅 기능을 사용할 수 있어요. 내 테스트 연동 키는 [개발자센터](https://developers.tosspayments.com/my/api-keys)에서 확인할 수 있습니다. 더 자세한 내용은 [API 키 가이드](https://docs.tosspayments.com/reference/using-api/api-keys)를 참고하세요.

- **클라이언트 키**: `client/checkout.html` 파일에 있는 `clientKey`를 내 결제위젯 클라이언트 키로 수정하세요.
- **시크릿 키**: `server.js` 파일에 있는 `secretKey`를 내 결제위젯 시크릿 키로 수정하세요. **시크릿 키는 외부에 노출되면 안 됩니다.**

`server.js` 파일에 있는 `secretKey`를 내 시크릿 키로 수정하세요. [상점의 테스트 API 키](https://developers.tosspayments.com/my/api-keys)는 개발자센터에서 확인할 수 있습니다. 더 자세한 내용은 [API 키 가이드](https://docs.tosspayments.com/reference/using-api/api-keys)를 참고하세요.

## Q. 결제 요청 후 계속 로딩 중인 화면이 보인다면?

아직 결제 요청 중이에요. 이어서 요청 결과를 확인한 뒤, 결제 승인 API 호출까지 해야 결제가 완료돼요. iframe을 사용하면 요청 결과 페이지(`successUrl`, `failUrl`)로 이동할 수가 없으니 유의하세요.

**시크릿 키는 외부에 노출되면 안 됩니다.**

## 더 알아보기

- 토스페이먼츠 개발 블로그 👉 [30분 안에 결제 페이지 개발하기 (ft. 결제위젯)](https://velog.io/@tosspayments/결제위젯으로-30분안에-결제-페이지-개발하기)

- 토스페이먼츠 연동 문서 👉 [결제위젯 이해하기](https://docs.tosspayments.com/guides/payment-widget/overview) | [결제위젯 연동 문서](https://docs.tosspayments.com/guides/payment-widget/integration)
