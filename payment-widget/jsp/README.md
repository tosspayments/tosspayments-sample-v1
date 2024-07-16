# 결제위젯 JSP 샘플 프로젝트

결제위젯 JavaScript SDK로 결제 과정을 구현한 JSP 샘플 프로젝트입니다. 자세한 연동 방법과 결제 과정은 [공식 연동 문서](https://docs.tosspayments.com/guides/payment-widget/integration)에서 확인하세요.

## 준비하기

- [Java](https://www.oracle.com/kr/java/technologies/downloads/)
- [Apache Tomcat](https://tomcat.apache.org/download-90.cgi)

## 실행하기

1. 결제위젯 샘플 프로젝트 레포지토리를 클론(Clone)하세요.

2. 클론한 레포지토리의 `jsp` 폴더를 Tomcat의 `webapp` 폴더에 넣어주세요.

3. Tomcat을 실행하고 http://localhost:{PORT_NUMBER}/jsp/checkout.html 에서 샘플 프로젝트를 확인하세요.

## 인증하기

샘플에 있는 키로 연동이 가능하지만, 내 테스트 연동 키를 사용하면 테스트 결제내역, 웹훅 기능을 사용할 수 있어요. 내 테스트 연동 키는 [개발자센터](https://developers.tosspayments.com/my/api-keys)에서 확인할 수 있습니다. 더 자세한 내용은 [API 키 가이드](https://docs.tosspayments.com/reference/using-api/api-keys)를 참고하세요.

- **클라이언트 키**: `checkout.html` 파일에 있는 `clientKey`를 내 결제위젯 클라이언트 키로 수정하세요.
- **시크릿 키**: `success.jsp` 파일에 있는 `secretKey`를 내 결제위젯 시크릿 키로 수정하세요. **시크릿 키는 외부에 노출되면 안 됩니다.**

## Q. 결제 요청 후 계속 로딩 중인 화면이 보인다면?

아직 결제 요청 중이에요. 이어서 요청 결과를 확인한 뒤, 결제 승인 API 호출까지 해야 결제가 완료돼요. iframe을 사용하면 요청 결과 페이지(`successUrl`, `failUrl`)로 이동할 수가 없으니 유의하세요.

## 더 알아보기

- 토스페이먼츠 개발 블로그 👉 [30분 안에 결제 페이지 개발하기 (ft. 결제위젯)](https://velog.io/@tosspayments/결제위젯으로-30분안에-결제-페이지-개발하기)

- 토스페이먼츠 연동 문서 👉 [결제위젯 이해하기](https://docs.tosspayments.com/guides/payment-widget/overview) | [결제위젯 연동 문서](https://docs.tosspayments.com/guides/payment-widget/integration)
