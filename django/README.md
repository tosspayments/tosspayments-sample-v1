# 결제위젯 Python - Django 샘플

## 기본설명

```
Python - Django 환경을 먼저 준비 해주세요.

패키지 종속성 관리를 위해 requirements.txt 를 활용 했어요.

기존에 운영하시던 프로젝트에 적용하실때 참조하실 수 있도록,
* 결제 샘플은 분리된 app 인 payments 에 위치 시켰어요.
** 프로젝트 settings.py, urls.py 에서 app 설정을 확인 해주세요.

결제 샘플 app 인 payments 를 참조해서,
프로젝트에서 원하시는 이름의 app을 추가하신 이후에 templates/payments, urls.py, views.py 를 붙여넣기 해주세요.

```

## 인증하기

`payments/views.py` 파일에 있는 `secretKey`를 내 시크릿 키로 수정하세요. [상점의 테스트 API 키](https://developers.tosspayments.com/my/api-keys)는 개발자센터에서 확인할 수 있습니다. 더 자세한 내용은 [API 키 가이드](https://docs.tosspayments.com/reference/using-api/api-keys)를 참고하세요.

**시크릿 키는 외부에 노출되면 안 됩니다.**

## 더 알아보기

- 토스페이먼츠 개발 블로그 👉 [30분 안에 결제 페이지 개발하기 (ft. 결제위젯)](https://velog.io/@tosspayments/결제위젯으로-30분안에-결제-페이지-개발하기)

- 토스페이먼츠 연동 문서 👉 [결제위젯 이해하기](https://docs.tosspayments.com/guides/payment-widget/overview) | [결제위젯 연동 문서](https://docs.tosspayments.com/guides/payment-widget/integration)
