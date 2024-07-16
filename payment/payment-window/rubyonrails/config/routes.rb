Rails.application.routes.draw do
    # add code
    root "home#index"
    get 'payment/window' => 'payment#window'
    get 'payment/success' => 'payment#success'
    get 'payment/fail' => 'payment#fail'
    # end code
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
