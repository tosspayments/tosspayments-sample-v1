class PaymentController < ApplicationController

  def success
    # TODO: 결제를 요청하기 전에 orderId, amount를 서버에 저장하고, 승인하기 전에 저장한 값과 비교하세요.
    # 값이 다르면 결제 승인 API를 호출하지 말고 실패로 처리해요.
    # 예시)
    # saved_amount = find_amount_by_order_id(params['orderId']) # 결제 요청 전에 서버에 저장한 금액
    # if saved_amount.nil? || saved_amount != params['amount'].to_i
    #   render plain: "결제 금액이 주문 금액과 달라요.", status: :bad_request and return
    # end
    options = {
      headers: {
        Authorization: "Basic " + Base64.strict_encode64("{SECRET_KEY}:"),
        "Content-Type": "application/json"
      },
      body: {
        orderId: params['orderId'],
        amount: params['amount'],
        paymentKey: params['paymentKey']
      }.to_json
    }

    begin
      response = HTTParty.post("https://api.tosspayments.com/v1/payments/confirm", options).parsed_response

      @Response = response
      @amount = response['totalAmount']
      @receipt_url = response['receiptUrl']
      @orderId = response['orderId']
    end
      
  end

  def fail
    @message = params['message'] || "실패 하였습니다."
    @code = params['code'] || "전달받은 Code"
  end
end