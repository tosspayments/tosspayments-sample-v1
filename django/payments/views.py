from django.shortcuts import render
 
import requests, json, base64, time

def index(request):
  return render(
    request,
    'payments/window.html',
  )

def success(request):
  orderId = request.GET.get('orderId')
  amount = request.GET.get('amount')
  paymentKey = request.GET.get('paymentKey')
  
  url = "https://api.tosspayments.com/v1/payments/confirm"
  """
    토스페이먼츠 API는 시크릿 키를 사용자 ID로 사용하고, 비밀번호는 사용하지 않습니다.
    비밀번호가 없다는 것을 알리기 위해 시크릿 키 뒤에 콜론을 추가합니다.
    @see https://docs.tosspayments.com/reference/using-api/authorization#%EC%9D%B8%EC%A6%9D
  """
  secretKey = "test_sk_zXLkKEypNArWmo50nX3lmeaxYG5R"
  userpass = secretKey + ':'
  encoded_u = base64.b64encode(userpass.encode()).decode()
  
  headers = {
    "Authorization" : "Basic %s" % encoded_u,
    "Content-Type": "application/json"
  }
  
  params = {
    "orderId" : orderId,
    "amount" : amount,
    "paymentKey": paymentKey,
  }
  
  res = requests.post(url, data=json.dumps(params), headers=headers)
  resjson = res.json()
  pretty = json.dumps(resjson, indent=4)

  respaymentKey = resjson["paymentKey"]
  resorderId = resjson["orderId"]
  rescardcom = resjson["card"]["company"]
  

  return render(
    request,
    "payments/success.html",
    {
      "res" : pretty,
      "respaymentKey" : respaymentKey,
      "resorderId" : resorderId,
      "rescardcom" : rescardcom,

    }
  )

def fail(request):
  code = request.GET.get('code')
  message = request.GET.get('message')
  
  return render(
    request,
    "payments/fail.html",
    {
      "code" : code,
      "message" : message,
    }
  )