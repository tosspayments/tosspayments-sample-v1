import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:tosspayments_widget_sdk_flutter/model/paymentData.dart';
import 'package:tosspayments_widget_sdk_flutter/model/tosspayments_result.dart';
import 'package:tosspayments_widget_sdk_flutter/pages/tosspayments_sdk_flutter.dart';

/// [Payment] 클래스는 결제 처리를 담당하는 위젯입니다.
class Payment extends StatelessWidget {
  /// 기본 생성자입니다.
  const Payment({super.key});

  /// 위젯을 빌드합니다.
  ///
  /// 'test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq' 클라이언트 키를 사용하여 [TossPayments]를 생성합니다.
  ///
  /// 성공하면, [Get]을 이용해 결과를 반환하고 이전 화면으로 돌아갑니다.
  /// 실패하면, [Get]을 이용해 실패 정보를 반환하고 이전 화면으로 돌아갑니다.
  @override
  Widget build(BuildContext context) {
    PaymentData data = Get.arguments as PaymentData;
    return TossPayments(
        clientKey: 'test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq',
        data: data,
        success: (Success success) {
          Get.back(result: success);
        },
        fail: (Fail fail) {
          Get.back(result: fail);
        });
  }
}
