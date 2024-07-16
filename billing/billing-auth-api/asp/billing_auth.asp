<%@ Language="VBScript" CODEPAGE="65001"%>


<!DOCTYPE html>

<!--#include file="json2.asp"-->
<!--#include file="base64.asp"-->

<%
	
call initCodecs

customerKey = "test_customer_key"
cardNumber = ""
cardExpirationYear = ""
cardExpirationMonth = ""
cardPassword = ""
customerBirthday  = ""
customerName = "박토스"
customerEmail = "customer@email.com"

secretKey = "test_ak_ZORzdMaqN3wQd5k6ygr5AkYXQGwy:"

url = "https://api.tosspayments.com/v1/billing/authorizations/card"

data = "{""customerKey"" : """ & customerKey & """, ""cardNumber"" : """ & cardNumber & """," &_
    """cardExpirationYear"" : """ & cardExpirationYear & """, ""cardExpirationMonth"" : """ & cardExpirationMonth & """," &_
    """cardPassword"" : """ & cardPassword & """, ""customerBirthday"" : """ & customerBirthday & """," &_
    """customerName"" : """ & customerName & """, ""customerEmail"" : """ & customerEmail & """}"


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
        <%
        if httpCode=200  then %>
        <h1>결제 성공</h1>
        <p>결과 데이터 : <%= req.responseText %></p>
        <p>billingKey : <%= myJSON.billingKey%></p>
        <p>cardCompany : <%= myJSON.cardCompany%></p>
        <p>cardNumber : <%= myJSON.cardNumber%></p>

        <%
     else  %>
        <h1>결제 실패</h1>
        <p>에러메시지 : <%= myJSON.message%></p>
        <span>에러코드: <%= myJSON.code%></span>
        <%
    end if
    %>

    </section>
</body>

</html>