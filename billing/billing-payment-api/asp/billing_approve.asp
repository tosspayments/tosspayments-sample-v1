<%@ Language="VBScript" CODEPAGE="65001"%>


<!DOCTYPE html>

<!--#include file="json2.asp"--> 
<!--#include file="base64.asp"--> 

<%
	
call initCodecs

billingKey = "TkikXq2iKmtYIjD_ZGTeaX5N5wm4tlfzgjnFKOQ97KE="
customerKey = "test_customer_key"
orderId = "billing-" & Now
amount = 50000
customerEmail = "customer@email.com"
customerName = "박토스"
orderName = "토스 정기 결제"

secretKey = "test_ak_ZORzdMaqN3wQd5k6ygr5AkYXQGwy:"

url ="https://api.tosspayments.com/v1/billing/" & billingKey


data = "{""orderId"" : """ & orderId & """, ""amount"" : """ & amount & """," &_
    """customerKey"" : """ & customerKey & """, ""customerEmail"" : """ & customerEmail & ""","  &_
    """customerName"" : """ & customerName & """, ""orderName"" : """ & orderName & """}"


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
    <meta http-equiv="x-ua-compatible" content="ie=edge"/>
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
</head>
<body>
<section>
    <%
        if httpCode=200  then %>
        <h1>결제 성공</h1>
        <p>결과 데이터 : <%= req.responseText %></p>

        <p>orderName :  <%= myJSON.orderName%></p>
        <p>method : <%= myJSON.method%></p>
        <p>card -> number :  <%= myJSON.card.number%></p>
        
       <%
     else  %>
        <h1>결제 실패</h1>
        <p>에러메시지 :  <%= myJSON.message%></p>
        <span>에러코드:  <%= myJSON.code%></span>
       <%
    end if
    %>

</section>
</body>
</html>


