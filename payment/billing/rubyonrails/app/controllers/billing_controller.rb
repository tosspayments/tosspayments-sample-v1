class BillingController < ApplicationController

  def billing_confirm
      options = {
        headers: {
          Authorization: "Basic " + Base64.strict_encode64("{SECRET_KEY}:"),
          "Content-Type": "application/json"
        },
        body: {
          authKey: params['authKey'],
          customerKey: params['customerKey']
          # TODO: 요청으로 받은 customerKey 가 로그인한 구매자의 것인지 확인하세요.
        }.to_json
      }
  
      begin
        response = HTTParty.post("https://api.tosspayments.com/v1/billing/authorizations/issue", options).parsed_response
  
        @Response = response
      end
        
    end
  
    def fail
      @message = params['message']
      @code = params['code']
    end
      
  
  end
  