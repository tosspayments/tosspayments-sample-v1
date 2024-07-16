from django.shortcuts import render

import requests, json, base64, time

# Create your views here.
def index(request):
  return render(
    request,
    'billing/index.html',
  )

def billing_auth(request):
  url = "https://api.tosspayments.com/v1/billing/authorizations/card"
  secertkey = "test_sk_D4yKeq5bgrpKRd0JYbLVGX0lzW6Y"
  userpass = secertkey + ':'
  encoded_u = base64.b64encode(userpass.encode()).decode()
  
  headers = {
    "Authorization" : "Basic %s" % encoded_u,
    "Content-Type": "application/json"
  }
  
  params = {
    "customerKey": "test_customer_key",
    "cardNumber": "5531760001177282",
    "cardExpirationYear": "28",
    "cardExpirationMonth": "02",
    "cardPassword": "04",
    "customerBirthday": "871017",
    "customerName": "박토스",
    "customerEmail": "customer@email.com"
  }
  
  res = requests.post(url, data=json.dumps(params), headers=headers)
  resjson = res.json()
  pretty = json.dumps(resjson, indent=4, ensure_ascii=False)

  billingKey = resjson["billingKey"]
  cardCompany = resjson["card"]["company"]
  cardNumber = resjson["card"]["number"]
  

  return render(
    request,
    "billing/billing_auth.html",
    {
      "res" : pretty,
      "billingKey" : billingKey,
      "cardCompany" : cardCompany,
      "cardNumber" : cardNumber,

    }
  )