class PaymentController < ApplicationController

  def billing_auth
    options = {
      headers: {
        Authorization: "Basic " + Base64.strict_encode64("test_sk_D4yKeq5bgrpKRd0JYbLVGX0lzW6Y:"),
        "Content-Type": "application/json"
      },
      body: {          
        customerKey: "test_customer_key",
        cardNumber: "",
        cardExpirationYear: "",
        cardExpirationMonth: "",
        cardPassword: "",
        customerBirthday: "",
        customerName: "박토스",
        customerEmail: "customer@email.com"
      }.to_json
    }
      
	begin
      response = HTTParty.post("https://api.tosspayments.com/v1/billing/authorizations/card", options).parsed_response
      @Response = response
    end
      
  end
  
end