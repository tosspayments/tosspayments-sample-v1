import React, {useState} from 'react';
import {Button, Alert} from 'react-native';
import {
  PaymentWidgetProvider,
  usePaymentWidget,
  AgreementWidget,
  PaymentMethodWidget,
} from '@tosspayments/widget-sdk-react-native';
import type {
  AgreementWidgetControl,
  PaymentMethodWidgetControl,
  AgreementStatus,
} from '@tosspayments/widget-sdk-react-native';

// ...
export default function App() {
  return (
    <>
      {/* 스크롤이 필요한 경우 ScrollView로 감싸주세요. */}
      {/* <ScrollView> */}
      <PaymentWidgetProvider
        clientKey={`test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm`}
        customerKey={`JK7_wcrP9zWznigTpHtZM`}>
        <CheckoutPage />
      </PaymentWidgetProvider>
      {/* </ScrollView> */}
    </>
  );
}

function CheckoutPage() {
  const paymentWidgetControl = usePaymentWidget();
  const [paymentMethodWidgetControl, setPaymentMethodWidgetControl] =
    useState<PaymentMethodWidgetControl | null>(null);
  const [agreementWidgetControl, setAgreementWidgetControl] =
    useState<AgreementWidgetControl | null>(null);

  return (
    <>
      <PaymentMethodWidget
        selector="payment-methods"
        onLoadEnd={() => {
          paymentWidgetControl
            .renderPaymentMethods(
              'payment-methods',
              {value: 50_000},
              {
                variantKey: 'DEFAULT',
              },
            )
            .then(control => {
              setPaymentMethodWidgetControl(control);
            });
        }}
      />
      <AgreementWidget
        selector="agreement"
        onLoadEnd={() => {
          paymentWidgetControl
            .renderAgreement('agreement', {
              variantKey: 'DEFAULT',
            })
            .then(control => {
              setAgreementWidgetControl(control);
            });
        }}
      />
      <Button
        title="결제요청"
        onPress={async () => {
          if (paymentWidgetControl == null || agreementWidgetControl == null) {
            Alert.alert('주문 정보가 초기화되지 않았습니다.');
            return;
          }

          const agreeement = await agreementWidgetControl.getAgreementStatus();
          if (agreeement.agreedRequiredTerms !== true) {
            Alert.alert('약관에 동의하지 않았습니다.');
            return;
          }

          paymentWidgetControl
            .requestPayment?.({
              orderId: 'GkE7i5oFXWuuI0xiM9dzx',
              orderName: '토스 티셔츠 외 2건',
            })
            .then(result => {
              if (result?.success) {
                // 결제 성공 비즈니스 로직을 구현하세요.
                // result.success에 있는 값을 서버로 전달해서 결제 승인을 호출하세요.
                Alert.alert(result.success.paymentKey);
              } else if (result?.fail) {
                // 결제 실패 비즈니스 로직을 구현하세요.
                Alert.alert(result.fail.code);
              }
            });
        }}
      />
      <Button
        title="선택된 결제수단"
        onPress={async () => {
          if (paymentMethodWidgetControl == null) {
            Alert.alert('주문 정보가 초기화되지 않았습니다.');
            return;
          }
          Alert.alert(
            `선택된 결제수단: ${JSON.stringify(
              await paymentMethodWidgetControl.getSelectedPaymentMethod(),
            )}`,
          );
        }}
      />
      <Button
        title="결제 금액 변경"
        onPress={() => {
          if (paymentMethodWidgetControl == null) {
            Alert.alert('주문 정보가 초기화되지 않았습니다.');
            return;
          }
          paymentMethodWidgetControl.updateAmount(100_000).then(() => {
            Alert.alert('결제 금액이 100000원으로 변경되었습니다.');
          });
        }}
      />
    </>
  );
}
