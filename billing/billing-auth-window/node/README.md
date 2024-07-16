# 자동결제(빌링)을 활용한 구독 서비스 EJS + Express 샘플 프로젝트

이 프로젝트는 EJS와 Express를 활용해서 구독 서비스를 만들 수 있는 기본적인 구조를 제공합니다. 빌링키 발급, 저장, 스케줄링과 같은 핵심 로직이 포함되어 있습니다.

## 프로젝트 구조

```
routes/
    └─ index.js                // 빌링키 발급, 저장, 스케줄링 로직이 있는 서버 코드
client/
    ├── index.ejs              // 카드 정보 등록을 위한 페이지
    ├── success.ejs            // 카드 정보 등록 성공 페이지
    └── fail.ejs               // 카드 정보 등록 실패 페이지
app.js                         // 기본 서버 설정
```

## 시작하기

GitHub에서 샘플 프로젝트를 클론 받은 뒤 필요한 의존성을 설치합니다.

```
npm install
```

서버를 실행합니다.

```
node app.js
```

`localhost:8080`으로 접근할 수 있습니다.

## 더 알아보기

토스페이먼츠 공식 문서 👉 [자동결제 이해하기](https://docs.tosspayments.com/guides/billing/overview) | [자동결제 결제창 연동 문서](https://docs.tosspayments.com/guides/billing/integration)

## 문의

기능 및 구현에 대해 궁금한 점이 있다면 [1:1 채팅](https://discord.com/invite/VdkfJnknD9)이나 [토스페이먼츠 기술지원 팀 이메일](mailto:techsupport@tosspayments.com)로 문의해주세요.
