<%@ Language="VBScript" CODEPAGE="65001"%>


<!DOCTYPE html>

<!--#include file="json2.asp"--> 
<!--#include file="base64.asp"--> 

<%
	
call initCodecs

message	= trim(request("paymentKey")) 
code	= trim(request("code")) 

%>

<!DOCTYPE html>
<html lang="ko">
<meta charset="UTF-8" />
<head>
    <title>결제 실패</title>
    <meta http-equiv="x-ua-compatible" content="ie=edge"/>
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
</head>
<body>
<section>
    <h1>결제 실패</h1>
    <p><%=message%></p>
    <span>에러코드: <%=code%></span>
</section>
</body>
</html>