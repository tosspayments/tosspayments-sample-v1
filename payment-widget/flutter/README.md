# 결제위젯 Flutter 샘플 프로젝트

결제위젯 Flutter SDK로 결제 과정을 구현한 Flutter 샘플 프로젝트입니다. 자세한 연동 방법과 결제 과정은 [공식 연동 문서](https://docs.tosspayments.com/guides/payment-widget/integration)에서 확인하세요.

## 준비하기

[Dart SDK](https://dart.dev/get-dart), [Flutter SDK](https://docs.flutter.dev/get-started/install) 를 설치해 주세요.

## 실행하기

1. 결제위젯 샘플 프로젝트 레포지토리를 클론(Clone)하고 Flutter 폴더로 진입하세요.

2. 의존성 패키지를 다운로드합니다.

   ```sh
   $ flutter pub get
   ```

3. 플러터 앱을 실행합니다. `build variant`를 `live`로 설정하고 테스트하세요.

   ```sh
   $ flutter run lib/main.dart
   ```

## 인증하기

샘플에는 키가 들어 있지 않아요. 코드에서 `{CLIENT_KEY}`, `{SECRET_KEY}` 처럼 중괄호로 표시한 자리에 내 테스트 연동 키를 넣어 주세요. 내 테스트 연동 키는 [개발자센터](https://developers.tosspayments.com/my/api-keys)에서 확인할 수 있습니다. 더 자세한 내용은 [API 키 가이드](https://docs.tosspayments.com/reference/using-api/api-keys)를 참고하세요.

- **클라이언트 키**: 샘플 앱 실행 후, Client Key에 내 결제위젯 클라이언트 키를 입력하세요. 또는 `lib/utils/config.dart` 파일에서 `_live` 부분을 수정한 후 앱을 실행하세요.

## 더 알아보기

- 토스페이먼츠 개발 블로그 👉 [30분 안에 결제 페이지 개발하기 (ft. 결제위젯)](https://velog.io/@tosspayments/결제위젯으로-30분안에-결제-페이지-개발하기)

- 토스페이먼츠 연동 문서 👉 [결제위젯 이해하기](https://docs.tosspayments.com/guides/payment-widget/overview) | [결제위젯 연동 문서](https://docs.tosspayments.com/guides/payment-widget/integration)
