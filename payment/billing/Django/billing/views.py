from django.shortcuts import render

import requests, json, base64, time

# Create your views here.
def index(request):
  return render(
    request,
    'billing/index.html',
  )

def window(request):
  return render(
    request,
    'billing/window.html',
  )

def billing_confirm(request):
  authKey = request.GET.get('authKey')
  customerKey = request.GET.get('customerKey')
  # TODO: 요청으로 받은 customerKey 가 로그인한 구매자의 것인지 확인하세요.
  
  url = "https://api.tosspayments.com/v1/billing/authorizations/issue"
  secertkey = "{SECRET_KEY}"
  userpass = secertkey + ':'
  encoded_u = base64.b64encode(userpass.encode()).decode()
  
  headers = {
    "Authorization" : "Basic %s" % encoded_u,
    "Content-Type": "application/json"
  }
  
  params = {
    "authKey" : authKey,
    "customerKey" : customerKey,
  }
  
  res = requests.post(url, data=json.dumps(params), headers=headers)
  resjson = res.json()

  # 발급 실패는 상태 코드로 나눠 실패 화면을 보여 줘요.
  if res.status_code != 200:
    return render(request, "billing/fail.html", {"code": resjson.get("code"), "message": resjson.get("message")})

  pretty = json.dumps(resjson, indent=4, ensure_ascii=False)

  billingKey = resjson["billingKey"]
  cardCompany = resjson["card"]["company"]
  cardNumber = resjson["card"]["number"]
  

  return render(
    request,
    "billing/billing_confirm.html",
    {
      "res" : pretty,
      "billingKey" : billingKey,
      "cardCompany" : cardCompany,
      "cardNumber" : cardNumber,

    }
  )

def fail(request):
  code = request.GET.get('code')
  message = request.GET.get('message')
  
  return render(
    request,
    "billing/fail.html",
    {
      "code" : code,
      "message" : message,
    }
  )