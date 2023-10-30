import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export function SuccessPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const requestData = {
      orderId: searchParams.get("orderId"),
      amount: searchParams.get("amount"),
      paymentKey: searchParams.get("paymentKey"),
    };

    // TODO: 개발자센터에 로그인해서 내 결제위젯 시크릿 키를 입력하세요. 시크릿 키는 외부에 공개되면 안돼요.
    // https://docs.tosspayments.com/reference/using-api/api-keys
    const secretKey = "test_gsk_docs_OaPz8L5KdmQXkzRz3y47BMw6";

    /**
     * 토스페이먼츠 API는 시크릿 키를 사용자 ID로 사용하고, 비밀번호는 사용하지 않습니다.
     * 비밀번호가 없다는 것을 알리기 위해 시크릿 키 뒤에 콜론을 추가합니다.
     * @see https://docs.tosspayments.com/reference/using-api/authorization#%EC%9D%B8%EC%A6%9D
     */
    const encryptedSecretKey = `Basic ${btoa(secretKey + ":")}`;

    async function confirm() {
      const response = await fetch("https://api.tosspayments.com/v1/payments/confirm", {
        method: "POST",
        headers: {
          "Authorization": encryptedSecretKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      })

      const json = await response.json();

      if (!response.ok) {
        // TODO: 구매 실패 비즈니스 로직 구현
        console.log(json);
        navigate(`/fail?message=${json.message}`)    
        return;
      }

      // TODO: 구매 완료 비즈니스 로직 구현
      console.log(json);
    }
    confirm();
  }, []);

  return (
    <div>
      <h1>결제 성공</h1>
      <div>{`주문 아이디: ${searchParams.get("orderId")}`}</div>
      <div>{`결제 금액: ${Number(
        searchParams.get("amount")
      ).toLocaleString()}원`}</div>
    </div>
  );
}
