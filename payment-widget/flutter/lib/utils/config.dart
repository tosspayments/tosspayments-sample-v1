import 'package:example/screens/tosspayments_widget/widget_home.dart';
import 'package:tosspayments_widget_sdk_flutter/model/payment_widget_options.dart';
import 'package:tosspayments_widget_sdk_flutter/utils/phase.dart';

class LocalConfig {
  static UIState get uiState {
    switch (PhaseConfig.phase) {
      case Phase.live:
        return _live;
      case Phase.staging:
        return _staging;
      case Phase.dev:
        return _dev;
    }
  }

  static final UIState _live = UIState(
    // live phase: 결제위젯 연동 키 > 라이브 클라이언트 키를 넣으세요.
    clientKey: '{WIDGET_CLIENT_KEY}',
    customerKey: '{CUSTOMER_KEY}',
    currency: Currency.KRW,
    country: "KR",
    amount: 50000,
    redirectUrl: null,
  );

  static final UIState _staging = UIState(
    // staging phase: 결제위젯 연동 키 > 테스트 클라이언트 키를 넣으세요.
    clientKey: '{WIDGET_CLIENT_KEY}',
    customerKey: '{CUSTOMER_KEY}',
    currency: Currency.KRW,
    country: "KR",
    amount: 50000,
    variantKeyMethod: 'DEFAULT',
    variantKeyAgreement: 'DEFAULT',
    redirectUrl: '',
  );

  static final UIState _dev = UIState(
    // dev phase: 결제위젯 연동 키 > 테스트 클라이언트 키를 넣으세요.
    clientKey: '{WIDGET_CLIENT_KEY}',
    customerKey: '{CUSTOMER_KEY}',
    currency: Currency.KRW,
    country: "KR",
    amount: 50000,
    redirectUrl: null,
  );
}
