from django.shortcuts import render
 
import requests, json, base64

def checkout(request):
  return render(
    request,
    'checkout.html',
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

  """
    개발자센터에 로그인해서 내 결제위젯 연동 키 > 시크릿 키를 입력하세요. 시크릿 키는 외부에 공개되면 안돼요.
    @docs https://docs.tosspayments.com/reference/using-api/api-keys
  """
  secretKey = "{WIDGET_SECRET_KEY}"

  """
    토스페이먼츠 API는 시크릿 키를 사용자 ID로 사용하고, 비밀번호는 사용하지 않습니다.
    비밀번호가 없다는 것을 알리기 위해 시크릿 키 뒤에 콜론을 추가합니다.
    @docs https://docs.tosspayments.com/reference/using-api/authorization#basic-인증-방식이란
  """
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
  
  """
    결제 승인 API를 호출하세요.
    결제를 승인하면 결제수단에서 금액이 차감돼요.
    @docs https://docs.tosspayments.com/guides/payment-widget/integration#3-결제-승인하기
  """
  res = requests.post(url, data=json.dumps(params), headers=headers)
  resjson = res.json()
  # 화면에는 승인 응답에서 필요한 필드만 보여 줘요.
  pretty = json.dumps({key: resjson.get(key) for key in ["paymentKey", "orderId", "orderName", "status", "method", "totalAmount", "approvedAt"]}, indent=4)

  if res.status_code == 200:
    respaymentKey = resjson["paymentKey"]
    resorderId = resjson["orderId"]
    restotalAmount = resjson["totalAmount"]
    
    return render(
      request,
      "success.html",
      {
        "res" : pretty,
        "respaymentKey" : respaymentKey,
        "resorderId" : resorderId,
        "restotalAmount": restotalAmount,
      }
    )
  else:
    rescode = resjson["code"]
    resmessage = resjson["message"]
    return render(
      request,
      "fail.html",
      {
        "code": rescode,
        "message": resmessage
      }
    )

def fail(request):
  code = request.GET.get('code')
  message = request.GET.get('message')
  
  return render(
    request,
    "fail.html",
    {
      "code" : code,
      "message" : message,
    }
  )

