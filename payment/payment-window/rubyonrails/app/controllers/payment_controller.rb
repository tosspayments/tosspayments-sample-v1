class PaymentController < ApplicationController

  def success
    options = {
      headers: {
        Authorization: "Basic " + Base64.strict_encode64("test_sk_zXLkKEypNArWmo50nX3lmeaxYG5R:"),
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