class PaymentController < ApplicationController

  def billing_approve
    datetime = Time.now.to_i
    billingkey = ""
    
    options = {
      headers: {
        Authorization: "Basic " + Base64.strict_encode64("test_sk_D4yKeq5bgrpKRd0JYbLVGX0lzW6Y:"),
        "Content-Type": "application/json"
      },
      body: {          
        orderId: "test_#{datetime}",
        amount: "50000",
		    customerKey: "test_customer_key",
        orderName: "토스 정기 결제",
        customerName: "박토스",
        customerEmail: "customer@email.com"
      }.to_json
    }
      
	  begin
      response = HTTParty.post("https://api.tosspayments.com/v1/billing/" + billingkey, options).parsed_response
      @Response = response
    end
      
  end  

  
end