import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {Dimensions, Platform} from 'react-native';
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
  'PaymentWidgetFullWebView'
>;

export function PaymentWidgetFullWebViewCheckoutScreen({navigation}: Props) {
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
  ${elementStyleCSS}
  <script src="https://js.tosspayments.com/v1/payment-widget"></script>
</head>
<body>
  <!-- 결제위젯, 이용약관 영역 -->
  <div id="payment-method"></div>
  <div id="agreement"></div>
  <!-- 결제하기 버튼 -->
  <div id="button-container">
    <button id="payment-button">다음</button>
  </div>
  <script>
    const clientKey = "${clientKey}"
    const button = document.getElementById("payment-button")

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

    // ------ '결제하기' 버튼 누르면 결제창 띄우기 ------
    // 더 많은 결제 정보 파라미터는 결제위젯 SDK에서 확인하세요.
    // https://docs.tosspayments.com/reference/widget-sdk#requestpayment결제-정보
    button.addEventListener("click", function () {
      paymentWidget.requestPayment({
        orderId: "${orderId}",           // 주문 ID(직접 만들어주세요)
        orderName: "${orderName}",                 // 주문명
        successUrl: "${SuccessUrlScheme}",  // 결제에 성공하면 이동하는 페이지(직접 만들어주세요)
        failUrl: "${FailUrlScheme}",        // 결제에 실패하면 이동하는 페이지(직접 만들어주세요)
      })
    })
  </script>
</body>
      `;

  return (
    <>
      <WebView
        source={{html: WEBVIEW_SOURCE_HTML}}
        originWhitelist={['*']}
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
    </>
  );
}

const ScreenWidth = Dimensions.get('window').width;
const elementStyleCSS = `
<style>
#header {
  margin: 24px;
  font-size: 20px;
  font-weight: 700;
  color: rgb(51, 61, 75);
  font-family: 'Toss Product Sans','Tossface','SF Pro KR','SF Pro Display','SF Pro Icons',-apple-system,BlinkMacSystemFont,'Basier Square','Apple SD Gothic Neo',Roboto,'Noto Sans KR','Noto Sans','Helvetica Neue',Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol','Noto Color Emoji';
}

#button-container {
  margin: 0 16px;
  position: fixed;
  width: ${ScreenWidth - 48}px;
  bottom: 24px;
}

#payment-button {
  word-break: keep-all;
  overflow-wrap: break-word;
  box-sizing: border-box;
  text-transform: none;
  overflow: visible;
  background: transparent;
  font: inherit;
  outline: none;
  -webkit-font-smoothing: inherit;
  font-family: inherit;
  position: relative;
  justify-content: center;
  align-items: center;
  margin: 0;
  font-weight: 600;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  background-image: none;
  border: 0 solid transparent;
  user-select: none;
  text-decoration: none;
  background-color: #3182f6;
  color: #f9fafb;
  display: flex;
  width: 100%;
  height: 56px;
  padding: 24px;
  font-size: 17px;
  line-height: 1.5;
  white-space: nowrap;
  border-radius: 16px;
  transition: none;
  visibility: visible;
  opacity: 1;
}
</style>
`;

const APP_SCHEME = 'tossbiz://';

const SuccessUrlScheme = `${APP_SCHEME}payment-widget/sync`;
const FailUrlScheme = `${APP_SCHEME}payment-widget/fail`;
