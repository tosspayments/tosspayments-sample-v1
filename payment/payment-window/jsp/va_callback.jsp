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
    String secret = (String) jsonObject.get("secret");
    String orderId = (String) jsonObject.get("orderId");

    // TODO: 요청 본문의 secret 을 결제 승인 응답에서 저장해 둔 secret 과 비교하고, 다르면 처리하지 마세요.
    // TODO: 결제 조회 API 로 결제 상태를 다시 확인한 뒤 주문 상태를 바꾸세요.
    // @docs https://docs.tosspayments.com/reference#orderid로-결제-조회
    // 예시)
    // SavedPayment savedPayment = findPaymentByOrderId(orderId); // 승인할 때 저장한 결제 정보
    // if (savedPayment == null || !savedPayment.getSecret().equals(secret)) {
    //     response.setStatus(400);
    //     return;
    // }
    // JSONObject payment = getPaymentByOrderId(orderId); // GET /v1/payments/orders/{orderId}

    // 응답에는 요청 값을 되돌려 쓰지 않아요.
    response.setContentType("text/plain; charset=UTF-8");
    out.print("OK");
%>