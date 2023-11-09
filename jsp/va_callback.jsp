<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="java.util.Base64"%>
<%@ page import="java.util.Base64.Encoder"%>
<%@ page import="java.net.HttpURLConnection"%>
<%@ page import="java.net.URL" %>
<%@ page import="org.json.simple.JSONObject" %>
<%@ page import="org.json.simple.parser.JSONParser" %>
<%@ page import="org.json.simple.parser.ParseException" %>
<%@ page import="java.io.*" %>
<%@ page import="java.nio.charset.StandardCharsets" %>
<%
	InputStream responseStream = request.getInputStream();
    Reader reader = new InputStreamReader(responseStream, StandardCharsets.UTF_8);
    
    JSONParser parser = new JSONParser();
    JSONObject jsonObject = (JSONObject) parser.parse(reader);
    responseStream.close();
%>

<p>secret : <%= jsonObject.get("secret") %></p>
<p>status : <%= jsonObject.get("status") %></p>
<p>orderId : <%= jsonObject.get("orderId") %></p>