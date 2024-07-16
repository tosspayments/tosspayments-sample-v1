# 브랜드페이 PHP 샘플

토스페이먼츠 브랜드페이 PHP 기본 연동 샘플입니다. 

- [브랜드페이 기본 연동 문서](https://docs.tosspayments.com/guides/brandpay/integration)

## 파일 구조

- `/setting/var.php` : 시작하기 전에 API 키와 리다이렉트 URL 변수를 설정해주셔야 합니다.
- `confirm-payment.php` : [결제승인 API](https://docs.tosspayments.com/reference/brandpay#%EA%B2%B0%EC%A0%9C-%EC%8A%B9%EC%9D%B8) 호출 부분입니다. 
- `/setting/callback-auth.php` : 브랜드페이 SDK 사용을 위해, 리다이렉트 URL을 통한 인증 영역입니다. ([브랜드페이 인증](https://docs.tosspayments.com/guides/brandpay/auth))

```sh
├── setting
│   ├── var.php 
│   └── callback-auth.php   
│
├── css
├── image
│
├── index.php 
└── confirm-payment.php
```

## 시작하기

먼저 이 레포지토리를 [클론](https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository)합니다.

`var.php`에서 API 키와 리다이렉트 URL 변수를 설정한 뒤 `index.php`를 실행해주세요.