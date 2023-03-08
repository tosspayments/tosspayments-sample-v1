# 결제위젯 Node.js 샘플 프로젝트

TossPayments 결제연동 Node.js 샘플 코드입니다. Express로 구성되었습니다.

## 실행 요구조건

- Node.js >= 14.0.0
- npm


## 시작하기

먼저 이 레포지토리를 [클론](https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository)합니다.

```sh
$ git clone https://github.com/tosspayments/payment-widget-sample.git # 샘플 프로젝트 클론
$ cd node
```

의존성 패키지를 다운로드하고 서버를 실행합니다. `localhost:8080`으로 접속해서 테스트할 수 있습니다.

```sh
$ npm install
$ npm start
```

## 인증하기

`index.js` 파일에 있는 `secretKey`를 내 시크릿 키로 수정하세요. [상점의 테스트 API 키](https://developers.tosspayments.com/my/api-keys)는 개발자센터에서 확인할 수 있습니다. 더 자세한 내용은 [API 키 가이드](https://docs.tosspayments.com/reference/using-api/api-keys)를 참고하세요.

**시크릿 키는 외부에 노출되면 안 됩니다.**


## 더 알아보기

- 토스페이먼츠 개발 블로그 👉 [30분 안에 결제 페이지 개발하기 (ft. 결제위젯)](https://velog.io/@tosspayments/결제위젯으로-30분안에-결제-페이지-개발하기)

- 토스페이먼츠 연동 문서 👉 [결제위젯 이해하기](https://docs.tosspayments.com/guides/payment-widget/overview) | [결제위젯 연동 문서](https://docs.tosspayments.com/guides/payment-widget/integration)
