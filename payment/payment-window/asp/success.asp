<%@ Language="VBScript" CODEPAGE="65001"%>

<!DOCTYPE html>

<!--#include file="json2.asp"-->
<!--#include file="base64.asp"-->

<% call initCodecs paymentKey = trim(request("paymentKey")) orderId = trim(request("orderId")) amount = trim(request("amount")) secretkey = "test_sk_zXLkKEypNArWmo50nX3lmeaxYG5R:" url =
"https://api.tosspayments.com/v1/payments/confirm" data = "{""paymentKey"" : """ & paymentKey & """, ""orderId"" : """ & orderId & """, ""amount"" : """ & amount & """}" authorization = "Basic " &
base64Encode(secretkey) set req = Server.CreateObject("MSXML2.ServerXMLHTTP") req.open "POST", url, false req.setRequestHeader "Authorization", authorization req.setRequestHeader "Content-Type",
"application/json;charset=UTF-8" req.send data set myJSON = JSON.parse(req.responseText) httpCode = req.status %>

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
      <h1>결제 성공</h1>
      <p>결과 데이터 : <%= req.responseText %></p>
      <p>orderName : <%= myJSON.orderName%></p>
      <p>method : <%= myJSON.method%></p>
      <p>
        <% if myJSON.method = "카드" then response.write myJSON.card.number end if %> <% if myJSON.method = "가상계좌" then response.write myJSON.virtualAccount.accountNumber end if %> <% if
        myJSON.method = "계좌이체" then response.write myJSON.transfer.bank end if %> <% if myJSON.method = "휴대폰" then response.write myJSON.mobilePhone.customerMobilePhone end if %>
      </p>
      <% else %>
      <h1>결제 실패</h1>
      <p>에러메시지 : <%= myJSON.message%></p>
      <span>에러코드: <%= myJSON.code%></span>
      <% end if %>
    </section>
  </body>
</html>
