# 결제위젯 React Native 샘플 프로젝트

결제위젯 React Native SDK로 결제 과정을 구현한 React Native 샘플 프로젝트입니다. 자세한 연동 방법과 결제 과정은 [공식 연동 문서](https://docs.tosspayments.com/guides/payment-widget/integration)에서 확인하세요.

## 시작하기

## 실행하기

1. 결제위젯 샘플 프로젝트 레포지토리를 클론(Clone)하고 react-native 폴더로 진입하세요.

2. React Native를 실행하기 위한 사전 개발환경을 준비하세요. [React Native 공식 문서](https://reactnative.dev/docs/environment-setup)를 참고하세요.

3. 의존성 패키지를 다운로드하고 Metro를 실행합니다.

   ```sh
   $ npm install # 의존성 패키지 다운로드
   $ npm update @tosspayments/widget-sdk-react-native --save # 최신 버전으로 업데이트
   $ npm start # Metro 실행
   ```

4. 로컬 네트워크에서 샘플 프로젝트를 확인하세요.

## 인증하기

샘플에 있는 키로 연동이 가능하지만, 내 테스트 연동 키를 사용하면 테스트 결제내역, 웹훅 기능을 사용할 수 있어요. 내 테스트 연동 키는 [개발자센터](https://developers.tosspayments.com/my/api-keys)에서 확인할 수 있습니다. 더 자세한 내용은 [API 키 가이드](https://docs.tosspayments.com/reference/using-api/api-keys)를 참고하세요.

- **클라이언트 키**: `App.tsx` 파일에 있는 `clientKey`를 내 결제위젯 클라이언트 키로 수정하세요.

## 승인하기

`PaymentWidgetControl` 의 `requestPayment` 메소드 호출 결과로 반환되는 결과를 서버로 전송하여 **서버에서** `orderId` 와 `amount` 가 올바른지 검증한 뒤 발급된 `paymentKey` 와 함께 결제 승인 API를 호출하면 결제가 완료됩니다.

- `PaymentWidgetControl` 의 `requestPayment` 메소드 사용 방법은 `App.tsx` 파일의 106 라인의 코드를 참고하세요.
- 결제 승인 API의 자세한 사용방법은 [결제 승인 API 가이드](https://docs.tosspayments.com/reference#%EA%B2%B0%EC%A0%9C-%EC%8A%B9%EC%9D%B8)를 참고하세요.
- **시크릿 키는 외부에 노출되면 안되므로** 결제 승인 API는 반드시 서버에서 **시크릿 키** 를 통해 호출해야 합니다.

## 더 알아보기

- 토스페이먼츠 개발 블로그 👉 [30분 안에 결제 페이지 개발하기 (ft. 결제위젯)](https://velog.io/@tosspayments/결제위젯으로-30분안에-결제-페이지-개발하기)

- 토스페이먼츠 연동 문서 👉 [결제위젯 이해하기](https://docs.tosspayments.com/guides/payment-widget/overview) | [결제위젯 연동 문서](https://docs.tosspayments.com/guides/payment-widget/integration)
