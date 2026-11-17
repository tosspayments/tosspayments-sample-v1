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
    clientKey: '{CLIENT_KEY}',
    customerKey: 'aaaa',
    currency: Currency.KRW,
    country: "KR",
    amount: 50000,
    redirectUrl: null,
  );

  static final UIState _staging = UIState(
    clientKey: '{CLIENT_KEY}',
    customerKey: 'a1b2c3',
    currency: Currency.KRW,
    country: "KR",
    amount: 50000,
    variantKeyMethod: 'DEFAULT',
    variantKeyAgreement: 'DEFAULT',
    redirectUrl: '',
  );

  static final UIState _dev = UIState(
    clientKey: '{WIDGET_CLIENT_KEY}',
    customerKey: 'CUSTOMER_KEY',
    currency: Currency.KRW,
    country: "KR",
    amount: 50000,
    redirectUrl: null,
  );
}
