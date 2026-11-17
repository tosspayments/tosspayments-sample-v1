export async function confirmPayment(requestData) {
    // 결제 승인은 서버(server.js)에서 시크릿 키로 호출해요. 브라우저 코드에는 시크릿 키를 넣지 마세요.
    // ------ 결제 승인 요청 ------
    // @docs https://docs.tosspayments.com/guides/payment-widget/integration#3-결제-승인하기
    const response = await fetch("/api/confirm", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });
    
    const json = await response.json();

    return { response, json };
}