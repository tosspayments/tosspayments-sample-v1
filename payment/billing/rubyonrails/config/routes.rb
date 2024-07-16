Rails.application.routes.draw do
    # add code
    get 'billing/index' => 'billing#index'
    get 'billing/billing_confirm' => 'billing#billing_confirm'
    get 'billing/fail' => 'billing#fail'
    # end code
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
