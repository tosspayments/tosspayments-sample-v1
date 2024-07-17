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
    Response.ContentType = "text/html"
  

set myJSON = JSON.parse(jsonText)
 Response.Write "Secret : " & myJSON.secret & "<BR>"
 Response.Write "Status : " & myJSON.status & "<BR>"
 Response.Write "orderID : " & myJSON.orderId & "<BR>"
%>