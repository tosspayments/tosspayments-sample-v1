<%@ Language="VBScript" CODEPAGE="65001"%>

<!DOCTYPE html>

<!--#include file="json2.asp"-->
<!--#include file="base64.asp"-->

<%
call initCodecs

customerKey = trim(request("customerKey"))
' TODO: 요청으로 받은 customerKey 가 로그인한 구매자의 것인지 확인하세요.
authKey = trim(request("authKey"))

secretKey = "{SECRET_KEY}:"
url = "https://api.tosspayments.com/v1/billing/authorizations/issue"
data = "{""authKey"" : """ & authKey & """, ""customerKey"" : """ & customerKey & """}"
authorization = "Basic " & base64Encode(secretKey)
set req = Server.CreateObject("MSXML2.ServerXMLHTTP")
req.open "POST", url, false
req.setRequestHeader "Authorization", authorization
req.setRequestHeader "Content-Type", "application/json;charset=UTF-8"
req.send data
set myJSON = JSON.parse(req.responseText)
httpCode = req.status
%>

<html lang="ko">
  <head>
    <title>결제 성공</title>
    <meta charset="UTF-8" />
    <meta http-equiv="x-ua-compatible" content="ie=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
  </head>

  <body>
    <section>
      <% if httpCode=200 then %>
      <h1>빌링키 발급 성공</h1>
      <p>결과 데이터 : <%= req.responseText %></p>
      <p>billingKey : <%= myJSON.billingKey%></p>
      <p>cardCompany : <%= myJSON.cardCompany%></p>
      <p>cardNumber : <%= myJSON.cardNumber%></p>

      <% else %>
      <h1>빌링키 발급 실패</h1>
      <p>에러메시지 : <%= myJSON.message%></p>
      <span>에러코드: <%= myJSON.code%></span>
      <% end if %>
    </section>
  </body>
</html>
