import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {Button, Platform, Text} from 'react-native';
import WebView from 'react-native-webview';
import {RootStackParamList} from '../types/types';
import {
  openAndroidPaymentThirdPartyApp,
  openIOSPaymentThirdPartyApp,
} from '../utils/openApp';

const amount = 1000;
const clientKey = 'test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq';
const orderId = 'Iiuxy8nZu1QKINlJo809k';
const orderName = '토스 티셔츠 외 2건';

type Props = NativeStackScreenProps<
  RootStackParamList,
  'PaymentWidgetHalfWebView'
>;

export function PaymentWidgetHalfWebViewCheckoutScreen({navigation}: Props) {
  function openApp(url: string) {
    if (Platform.OS === 'android') {
      openAndroidPaymentThirdPartyApp(url);

      return;
    }

    if (Platform.OS === 'ios') {
      openIOSPaymentThirdPartyApp(url);

      return;
    }
  }

  const WEBVIEW_SOURCE_HTML = `
<head>
  <meta charset="utf-8" />
  <!-- 결제위젯 SDK 추가 -->
  <meta http-equiv='content-type' content='text/html; charset=utf-8'>
  <meta name='viewport' content='width=device-width, initial-scale=1.0'>
  <script src="https://js.tosspayments.com/v1/payment-widget"></script>
</head>
<body>
  <!-- 결제위젯, 이용약관 영역 -->
  <div id="event-div"></div>
  <div id="payment-method"></div>
  <div id="agreement"></div>
  <!-- 결제하기 버튼 -->
  <script>
    const clientKey = "${clientKey}"
    const button = document.getElementById("payment-button")
    const eventDiv = document.getElementById('event-div');


    // ------  결제위젯 초기화 ------ 
    // 비회원 결제에는 customerKey 대신 ANONYMOUS를 사용하세요.
    const paymentWidget = PaymentWidget(clientKey, PaymentWidget.ANONYMOUS) // 회원 결제

    // ------  결제위젯 렌더링 ------ 
    // 결제수단 UI를 렌더링할 위치를 지정합니다. 와 같은 CSS 선택자와 결제 금액 객체를 추가하세요.
    // DOM이 생성된 이후에 렌더링 메서드를 호출하세요.
    // https://docs.tosspayments.com/reference/widget-sdk#renderpaymentmethods선택자-결제-금액-옵션
    const paymentMethodWidget = paymentWidget.renderPaymentMethods(
      "#payment-method", 
      { value: ${amount} },
      { variantKey: "DEFAULT" } // 렌더링하고 싶은 결제 UI의 variantKey
    )

    function A() {
      window.ReactNativeWebView.postMessage(JSON.stringify(2));
    };

    function click() {
      paymentWidget.requestPayment({
        orderId: "${orderId}",           // 주문 ID(직접 만들어주세요)
        orderName: "${orderName}",                 // 주문명
        successUrl: "${SuccessUrlScheme}",  // 결제에 성공하면 이동하는 페이지(직접 만들어주세요)
        failUrl: "${FailUrlScheme}",        // 결제에 실패하면 이동하는 페이지(직접 만들어주세요)
      })
    }


    document.addEventListener("message", event => {
      // eventDiv.textContent = event.data;

      if(event.data == 1) {
        click();
        A();
      }
    });
    window.addEventListener("message", event => {
      // eventDiv.textContent = event.data;

      if(event.data == 1) {
        click();
        A();
      }
    });
  </script>
</body>
      `;

  const [showElement, setShowElement] = React.useState(true);
  const webViewRef = React.useRef<WebView>(null);

  function onMessage(message: string) {
    console.log(message);
    setShowElement(false);
  }

  return (
    <>
      {showElement && <Text style={{fontSize: 32}}>타이틀</Text>}
      <WebView
        ref={webViewRef}
        source={{html: WEBVIEW_SOURCE_HTML}}
        originWhitelist={['*']}
        onMessage={async message => {
          const {nativeEvent} = message;

          const req = nativeEvent.data && JSON.parse(nativeEvent.data);
          await onMessage(req);
        }}
        onShouldStartLoadWithRequest={request => {
          // 외부 앱 스킴
          if (
            !request.url.startsWith('http') &&
            !request.url.startsWith('tossbiz') &&
            !request.url.startsWith('about:blank')
          ) {
            openApp(request.url);

            return false;
          }

          // tossbiz or tossbis-alpha
          if (request.url.includes(SuccessUrlScheme)) {
            console.log('성공했습니다.');

            navigation.popToTop();
            return false;
          }

          // tossbiz or tossbis-alpha
          if (request.url.includes(FailUrlScheme)) {
            console.log('실패했습니다.');

            navigation.popToTop();

            return false;
          }

          return true;
        }}
      />

      {showElement && (
        <Button
          onPress={() => {
            webViewRef?.current?.postMessage(JSON.stringify(1));
          }}
          title="다음"
          color="red"
        />
      )}
    </>
  );
}

const APP_SCHEME = 'tossbiz://';

const SuccessUrlScheme = `${APP_SCHEME}payment-widget/sync`;
const FailUrlScheme = `${APP_SCHEME}payment-widget/fail`;
