import { useEffect } from "react";
import { loadPaymentWidget } from "@tosspayments/payment-widget-sdk";

import "./App.css";

const selector = "#payment-widget";
const clientKey = "";

export default function App() {
  useEffect(() => {
    renderPaymentWidget({
      customerKey: "customerKey",
      amount: 50_000,
    });
  }, []);

  return (
    <div>
      <h1>결제위젯 데모</h1>
      <div id="payment-widget" />
    </div>
  );
}

async function renderPaymentWidget({
  customerKey,
  amount,
}: {
  customerKey: string;
  amount: number;
}) {
  const paymentWidget = await loadPaymentWidget(clientKey, customerKey);

  paymentWidget.renderPaymentMethods(selector, amount);
}
