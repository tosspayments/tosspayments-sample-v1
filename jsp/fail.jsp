<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<%@ page import="org.json.simple.JSONObject" %>
<%@ page import="org.json.simple.parser.JSONParser" %>
<%@ page import="org.json.simple.parser.ParseException" %>


<%
 String message = request.getParameter("message");
  String code = request.getParameter("code");
%>

<!DOCTYPE html>
<html lang="ko">
<head>
    <title>결제 실패</title>
    <meta http-equiv="x-ua-compatible" content="ie=edge"/>
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
</head>
<body>
<section>
    <h1>결제 실패</h1>
    <p><%= message %></p>
    <span>에러코드: <%= code %></span>
</section>
</body>
</html>
