import axios from "axios";
import { GetServerSideProps } from "next";
import Link from "next/link";

// ------ Payment 객체 ------
// @docs https://docs.tosspayments.com/reference#payment-객체
interface Payment {
  orderName: string;
  approvedAt: string;
  receipt: {
    url: string;
  };
  totalAmount: number;
  method: "카드" | "가상계좌" | "계좌이체";
  paymentKey: string;
  orderId: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {
    query: { paymentKey, orderId, amount },
  } = context;

  try {
    // TODO: 결제를 요청하기 전에 orderId, amount를 서버에 저장하고, 승인하기 전에 저장한 값과 비교하세요.
    // 값이 다르면 결제 승인 API를 호출하지 말고 실패로 처리해요.
    // 예시)
    // const savedAmount = await findAmountByOrderId(orderId as string); // 결제 요청 전에 서버에 저장한 금액
    // if (savedAmount == null || savedAmount !== Number(amount)) {
    //   return {
    //     redirect: {
    //       destination: `/fail?code=INVALID_AMOUNT&message=${encodeURIComponent("결제 금액이 주문 금액과 달라요.")}`,
    //       permanent: false,
    //     },
    //   };
    // }
    // ------  결제 승인 ------
    // @docs https://docs.tosspayments.com/guides/payment-widget/integration#3-결제-승인하기
    const { data: payment } = await axios.post<Payment>(
      "https://api.tosspayments.com/v1/payments/confirm",
      {
        paymentKey,
        orderId,
        amount,
      },
      {
        headers: {
          Authorization: `Basic ${Buffer.from(`${process.env.TOSS_PAYMENTS_SECRET_KEY}:`).toString("base64")}`,
        },
      }
    );
    // 브라우저에는 화면에 필요한 필드만 내려 줘요.
    return {
      props: { payment: pickPaymentFields(payment) },
    };
  } catch (err: any) {
    console.error("err", err.response.data.code);

    return {
      redirect: {
        destination: `/fail?code=${err.response.data.code}&message=${encodeURIComponent(err.response.data.message)}`,
        permanent: false,
      },
    };
  }
};

// 승인 응답(Payment 객체)에서 화면에 필요한 필드만 골라요.
function pickPaymentFields(payment: Payment) {
  const { paymentKey, orderId, orderName, method, totalAmount, approvedAt } = payment;
  return { paymentKey, orderId, orderName, method, totalAmount, approvedAt };
}

interface Props {
  payment: ReturnType<typeof pickPaymentFields>;
}

export default function SuccessPage({ payment }: Props) {
  return (
    <main>
      <div className="box_section" style={{ width: "600px" }}>
        <img width="100px" src="https://static.toss.im/illusts/check-blue-spot-ending-frame.png" />
        <h2>결제를 완료했어요</h2>
        <div className="p-grid typography--p" style={{ marginTop: "50px" }}>
          <div className="p-grid-col text--left">
            <b>결제금액</b>
          </div>
          <div className="p-grid-col text--right" id="amount">
            {payment.totalAmount.toLocaleString()}원
          </div>
        </div>
        <div className="p-grid typography--p" style={{ marginTop: "10px" }}>
          <div className="p-grid-col text--left">
            <b>주문번호</b>
          </div>
          <div className="p-grid-col text--right" id="orderId">
            {payment.orderId}
          </div>
        </div>
        <div className="p-grid typography--p" style={{ marginTop: "10px" }}>
          <div className="p-grid-col text--left">
            <b>paymentKey</b>
          </div>
          <div className="p-grid-col text--right" id="paymentKey" style={{ whiteSpace: "initial", width: "250px" }}>
            {payment.paymentKey}
          </div>
        </div>
        <div className="p-grid-col">
          <Link href="https://docs.tosspayments.com/guides/payment-widget/integration">
            <button className="button p-grid-col5">연동 문서</button>
          </Link>
          <Link href="https://discord.gg/A4fRFXQhRu">
            <button className="button p-grid-col5" style={{ backgroundColor: "#e8f3ff", color: "#1b64da" }}>
              실시간 문의
            </button>
          </Link>
        </div>
      </div>
      <div className="box_section" style={{ width: "600px", textAlign: "left" }}>
        <b>Response Data :</b>
        <div id="response" style={{ whiteSpace: "initial" }}>
          {payment && <pre>{JSON.stringify(payment, null, 4)}</pre>}
        </div>
      </div>
    </main>
  );
}
