import { useEffect, useRef, useState } from "react";
import {
  PaymentWidgetInstance,
  loadPaymentWidget,
} from "@tosspayments/payment-widget-sdk";

import "./App.css";

const selector = "#payment-widget";
const clientKey = "test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq";
const customerKey = "YbX2HuSlsC9uVJW6NMRMj";

export default function App() {
  const paymentWidgetRef = useRef<PaymentWidgetInstance | null>(null);
  const paymentMethodsWidgetRef = useRef<ReturnType<
    PaymentWidgetInstance["renderPaymentMethods"]
  > | null>(null);
  const price = 100_000;

  useEffect(() => {
    (async () => {
      const paymentWidget = await loadPaymentWidget(clientKey, customerKey);
      const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
        selector,
        price
      );

      paymentWidgetRef.current = paymentWidget;
      paymentMethodsWidgetRef.current = paymentMethodsWidget;
    })();
  }, []);

  return (
    <div>
      <h1>주문서</h1>
      <div id="payment-widget" />
      <div>
        <input
          type="checkbox"
          onChange={(event) => {
            const paymentMethodsWidget = paymentMethodsWidgetRef.current;

            if (paymentMethodsWidget == null) {
              throw new Error("결제위젯 인스턴스가 없습니다.");
            }

            const finalPrice = event.target.checked ? price - 5_000 : price;

            paymentMethodsWidget.updateAmount(
              finalPrice,
              paymentMethodsWidget.UPDATE_REASON.COUPON
            );
          }}
        />
        <label>5,000원 할인 쿠폰 적용</label>
      </div>
      <button
        onClick={async () => {
          const paymentWidget = paymentWidgetRef.current;

          if (paymentWidget == null) {
            throw new Error("결제위젯 인스턴스가 없습니다.");
          }

          await paymentWidget.requestPayment({
            orderId: "AD8aZDpbzXs4EQa-UkIX6",
            orderName: "토스 티셔츠 외 2건",
            customerName: "김토스",
            customerEmail: "customer123@gmail.com",
            // successUrl: 'http://localhost:5173/success',
            // failUrl: 'http://localhost:5173/fail',
          });

          // 결제 성공 페이지로 이동
        }}
      >
        결제하기
      </button>
    </div>
  );
}
