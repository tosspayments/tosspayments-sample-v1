<%@ Language="VBScript" %>


<!--#include file="json2.asp"--> 
<%
  Function BytesToStr(bytes)
    Dim Stream
    Set Stream = Server.CreateObject("Adodb.Stream")
        Stream.Type = 1 'adTypeBinary
        Stream.Open
        Stream.Write bytes
        Stream.Position = 0
        Stream.Type = 2 'adTypeText
        Stream.Charset = "utf-8"
        BytesToStr = Stream.ReadText
        Stream.Close
    Set Stream = Nothing
End Function
	
Dim lngBytesCount, jsonText
    lngBytesCount = Request.TotalBytes
    jsonText = BytesToStr(Request.BinaryRead(lngBytesCount))
    Response.ContentType = "text/plain"
  

set myJSON = JSON.parse(jsonText)
 ' TODO: 요청 본문의 secret 을 결제 승인 응답에서 저장해 둔 secret 과 비교하고, 다르면 처리하지 마세요.
 ' TODO: 결제 조회 API 로 결제 상태를 다시 확인한 뒤 주문 상태를 바꾸세요.
 ' @docs https://docs.tosspayments.com/reference#orderid로-결제-조회
 ' 예시)
 ' savedSecret = FindSecretByOrderId(myJSON.orderId) ' 승인할 때 저장한 secret
 ' If IsEmpty(savedSecret) Or savedSecret <> myJSON.secret Then
 '   Response.Status = "400 Bad Request"
 '   Response.End
 ' End If

 ' 응답에는 요청 값을 되돌려 쓰지 않아요.
 Response.Write "OK"
%>