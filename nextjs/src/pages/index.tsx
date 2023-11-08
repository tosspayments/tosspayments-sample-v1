import { useEffect, useRef, useState } from "react";
import {
  PaymentWidgetInstance,
  loadPaymentWidget,
  ANONYMOUS,
} from "@tosspayments/payment-widget-sdk";
import { nanoid } from "nanoid";
import { useAsync } from "react-use";


// TODO: 개발자센터에 로그인해서 내 결제위젯 클라이언트 키를 입력하세요
// @docs https://docs.tosspayments.com/reference/using-api/api-keys
const clientKey = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm";
const customerKey = nanoid();

export default function Home() {
  const paymentWidgetRef = useRef<PaymentWidgetInstance | null>(null);
  const paymentMethodsWidgetRef = useRef<ReturnType<
    PaymentWidgetInstance["renderPaymentMethods"]
  > | null>(null);
  const [price, setPrice] = useState(50_000);

  useAsync(async () => {
    // ------  결제위젯 초기화 ------
    // 비회원 결제에는 customerKey 대신 ANONYMOUS를 사용하세요.
    const paymentWidget = await loadPaymentWidget(clientKey, customerKey); // 회원 결제
    // const paymentWidget = await loadPaymentWidget(clientKey, ANONYMOUS); // 비회원 결제

    // ------  결제위젯 렌더링 ------
    // https://docs.tosspayments.com/reference/widget-sdk#renderpaymentmethods선택자-결제-금액-옵션
    const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
      "#payment-widget",
      { value: price },
      { variantKey: "DEFAULT" }
    );

    // ------  이용약관 렌더링 ------
    // https://docs.tosspayments.com/reference/widget-sdk#renderagreement선택자
    paymentWidget.renderAgreement(
      "#agreement",
      { variantKey: "AGREEMENT" }
    );

    paymentWidgetRef.current = paymentWidget;
    paymentMethodsWidgetRef.current = paymentMethodsWidget;
  }, []);

  useEffect(() => {
    const paymentMethodsWidget = paymentMethodsWidgetRef.current;

    if (paymentMethodsWidget == null) {
      return;
    }

    // ------ 금액 업데이트 ------
    // https://docs.tosspayments.com/reference/widget-sdk#updateamount결제-금액
    paymentMethodsWidget.updateAmount(price);
  }, [price]);

  return (
    <main>
      <div className="wrapper">
        <div className="box_section">        
        <div id="payment-widget" style={{ width: "100%" }} />
        <div id="agreement" style={{ width: "100%" }} />
        <div style={{paddingLeft: "24px"}}>
          <div className="checkable typography--p"><label htmlFor="coupon-box" className="checkable__label typography--regular"><input id="coupon-box" className="checkable__input" type="checkbox" aria-checked="true" onChange={(event) => {
                setPrice(event.target.checked ? price - 5_000 : price + 5_000);
              }}
            /><span className="checkable__label-text">5,000원 쿠폰 적용</span></label></div>
        </div>
        <div className="result wrapper">

          <button className="button" style={{marginTop: "30px"}}
            onClick={async () => {
              const paymentWidget = paymentWidgetRef.current;
              try {
                // ------ '결제하기' 버튼 누르면 결제창 띄우기 ------
                // https://docs.tosspayments.com/reference/widget-sdk#requestpayment결제-정보
                await paymentWidget?.requestPayment({
                  orderId: nanoid(),
                  orderName: "토스 티셔츠 외 2건",
                  customerName: "김토스",
                  customerEmail: "customer123@gmail.com",
                  successUrl: `${window.location.origin}/success`,
                  failUrl: `${window.location.origin}/fail`
                });
              } catch (error) {
                // 에러 처리하기
                console.error(error);
              }
            }}
          >
            결제하기
          </button>
      </div>
    </div>
    </div>
    </main>
  );
}
