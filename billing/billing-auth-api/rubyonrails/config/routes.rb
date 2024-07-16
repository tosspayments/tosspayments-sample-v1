Rails.application.routes.draw do
    # add code
    get 'billing/billing_auth' => 'billing#billing_auth'
    
    # end code
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
