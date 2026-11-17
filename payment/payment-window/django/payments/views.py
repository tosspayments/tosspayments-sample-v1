from django.shortcuts import render
 
import requests, json, base64, time

# Create your views here.
def index(request):
  return render(
    request,
    'payments/index.html',
  )

def window(request):
  return render(
    request,
    'payments/window.html',
  )

def success(request):
  orderId = request.GET.get('orderId')
  amount = request.GET.get('amount')
  paymentKey = request.GET.get('paymentKey')
  
  # TODO: 결제를 요청하기 전에 orderId, amount를 서버에 저장하고, 승인하기 전에 저장한 값과 비교하세요.
  # 값이 다르면 결제 승인 API를 호출하지 말고 실패로 처리해요.
  # 예시)
  # savedAmount = find_amount_by_order_id(orderId)  # 결제 요청 전에 서버에 저장한 금액
  # if savedAmount is None or savedAmount != int(amount):
  #   return HttpResponseBadRequest("결제 금액이 주문 금액과 달라요.")
  url = "https://api.tosspayments.com/v1/payments/confirm"
  secertkey = "{SECRET_KEY}"
  userpass = secertkey + ':'
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

  # 승인 실패는 상태 코드로 나눠 실패 화면을 보여 줘요.
  if res.status_code != 200:
    return render(request, "payments/fail.html", {"code": resjson.get("code"), "message": resjson.get("message")})

  # 화면에는 승인 응답에서 필요한 필드만 보여 줘요.
  picked = {key: resjson.get(key) for key in ["paymentKey", "orderId", "orderName", "status", "method", "totalAmount", "approvedAt"]}
  pretty = json.dumps(picked, indent=4)

  respaymentKey = resjson["paymentKey"]
  resorderId = resjson["orderId"]
  rescardcom = (resjson.get("card") or {}).get("company")
  

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