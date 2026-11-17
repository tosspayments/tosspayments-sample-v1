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
        result = HTTParty.post("https://api.tosspayments.com/v1/billing/authorizations/issue", options)
        response = result.parsed_response

        # 발급에 실패하면 응답의 code, message 만 실패 화면에 보여 줘요.
        unless result.code == 200
          @message = response['message']
          @code = response['code']
          render :fail, status: result.code and return
        end
  
        @Response = response
      end
        
    end
  
    def fail
      @message = params['message']
      @code = params['code']
    end
      
  
  end
  