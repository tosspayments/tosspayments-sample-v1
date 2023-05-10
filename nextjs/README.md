# 결제위젯 Next.js 샘플 프로젝트

결제위젯 JavaScript SDK를 이용해 결제과정을 구현한 Next.js 샘플 프로젝트입니다.

## 데모

[자바스크립트 데모](https://codesandbox.io/p/sandbox/payment-widget-nextjs-sample-t2lf3x) | [타입스크립트 데모](https://codesandbox.io/p/sandbox/payment-widget-nextjs-ts-sample-u0kfmj)

## 준비하기

샘플 프로젝트를 사용하려면 [Node.js](https://nodejs.org/ko/)가 필요합니다. 먼저 내 컴퓨터의 Node.js 버전을 확인하세요.

```sh
$ node -v
$ v16.15.1
```

<!-- ### Node.js 설치하기 -->

[Node.js 홈페이지](https://nodejs.org/ko/download/)에서 환경에 맞는 인스톨러를 다운로드 하거나 [nvm](https://github.com/nvm-sh/nvm#about)(Node Version Manager)을 사용해서 설치하세요.

## 시작하기

먼저 이 레포지토리를 [클론](https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository)합니다.

```sh
$ git clone https://github.com/tosspayments/payment-widget-sample # 샘플 프로젝트 클론
$ cd payment-widget-sample/nextjs
```

의존성 패키지를 다운로드하고 서버를 실행합니다.

```sh
$ npm install # 의존성 패키지 다운로드
$ npm run dev # 서버 실행
```

## 인증하기

`.env` 파일을 만들고 `.env.sample`을 참고해서 내 시크릿 키로 설정하세요. [상점의 테스트 API 키](https://developers.tosspayments.com/my/api-keys)는 개발자센터에서 확인할 수 있습니다. 더 자세한 내용은 [API 키 가이드](https://docs.tosspayments.com/reference/using-api/api-keys)를 참고하세요.

**시크릿 키는 외부에 노출되면 안 됩니다.**

## 더 알아보기

- 토스페이먼츠 개발 블로그 👉 [30분 안에 결제 페이지 개발하기 (ft. 결제위젯)](https://velog.io/@tosspayments/결제위젯으로-30분안에-결제-페이지-개발하기)

- 토스페이먼츠 연동 문서 👉 [결제위젯 이해하기](https://docs.tosspayments.com/guides/payment-widget/overview) | [결제위젯 연동 문서](https://docs.tosspayments.com/guides/payment-widget/integration)
