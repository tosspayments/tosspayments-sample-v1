Flutter에서 토스페이먼츠 결제창을 손쉽게 연동하기 위한 패키지입니다.

## 1. 사전 설정

### A. 패키지 다운로드
pubspec.yaml에 패키지 추가
```xml
dependencies:
tosspayments_widget_sdk_flutter: ^0.X.X
```

### B. Android 설정
usesCleartextTraffic 세팅을 true로 설정하여, 웹뷰 내 모든 카드사앱을 띄울 수 있도록 설정
```xml
...
<appication ...  android:usesCleartextTraffic="true"></application>
...
```


### C. iOS설정
별도 설정할 내용 없음


## 2. 시작하기
아래 방법으로 토스페이먼츠 결제창을 띄울 수 있습니다. 자세한 내용은 예제(example)을 참고해주세요.

```dart
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:tosspayments_widget_sdk_flutter/model/tosspayments_result.dart';
import 'package:tosspayments_widget_sdk_flutter/tosspayments_sdk_flutter.dart';
import 'package:tosspayments_widget_sdk_flutter/model/paymentData.dart';

class Payment extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return TossPayments(
      apiKey: "##TODO clientKey 입력 ##,"
      data:  PaymentData(
          paymentMethod: '카드',
          orderId: 'tosspayments-202303210239',
          orderName: 'toss t-shirt',
          amount: 50000,
          customerName: '김토스',
          customerEmail: 'toss@toss-payments.co.kr'
      ),
      success: (Success success) {
          Get.back(result: success);
      },
      fail: (Fail fail) {
          Get.back(result: fail);
      };
    );
  }
}

```
