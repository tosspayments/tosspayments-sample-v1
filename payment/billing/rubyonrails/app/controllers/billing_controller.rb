class BillingController < ApplicationController

  def billing_confirm
      options = {
        headers: {
          Authorization: "Basic " + Base64.strict_encode64("test_sk_zXLkKEypNArWmo50nX3lmeaxYG5R:"),
          "Content-Type": "application/json"
        },
        body: {
          authKey: params['authKey'],
          customerKey: params['customerKey']
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
  