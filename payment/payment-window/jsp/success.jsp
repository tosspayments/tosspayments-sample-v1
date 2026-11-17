<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%> <%@ page import="java.util.Base64"%> <%@ page import="java.util.Base64.Encoder"%> <%@ page
import="java.net.HttpURLConnection"%> <%@ page import="java.net.URL" %> <%@ page import="org.json.simple.JSONObject" %> <%@ page import="org.json.simple.parser.JSONParser" %> <%@ page
import="org.json.simple.parser.ParseException" %> <%@ page import="java.io.OutputStream" %> <%@ page import="java.io.InputStream" %> <%@ page import="java.io.InputStreamReader" %> <%@ page
import="java.io.Reader" %> <%@ page import="java.nio.charset.StandardCharsets" %> <%@ page import="java.net.URLEncoder" %> <%!
    // 승인 응답(Payment 객체)에서 화면에 필요한 필드만 골라요.
    private static String pickPaymentFields(JSONObject payment) {
        JSONObject picked = new JSONObject();
        for (String key : new String[]{"paymentKey", "orderId", "orderName", "status", "method", "totalAmount", "approvedAt"}) {
            picked.put(key, payment.get(key));
        }
        return picked.toJSONString();
    }
%>
<%!
    // 화면에 출력하는 값은 HTML 이스케이프해요.
    private static String escapeHtml(Object value) {
        if (value == null) {
            return "";
        }
        return String.valueOf(value).replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;").replace("\"", "&quot;").replace("'", "&#39;");
    }
%>
<% /* 결제 승인 API 호출하기 */ String orderId =
request.getParameter("orderId"); String paymentKey = request.getParameter("paymentKey"); String amount = request.getParameter("amount"); String secretKey = "{SECRET_KEY}:";
Encoder encoder = Base64.getEncoder(); byte[] encodedBytes = encoder.encode(secretKey.getBytes("UTF-8")); String authorizations = "Basic "+ new String(encodedBytes, 0, encodedBytes.length); paymentKey
= URLEncoder.encode(paymentKey, StandardCharsets.UTF_8);
/*
   TODO: 결제를 요청하기 전에 orderId, amount를 서버에 저장하고, 승인하기 전에 저장한 값과 비교하세요.
   값이 다르면 결제 승인 API를 호출하지 말고 실패로 처리해요.
   예시)
   Long savedAmount = findAmountByOrderId(orderId); // 결제 요청 전에 서버에 저장한 금액
   if (savedAmount == null || savedAmount != Long.parseLong(amount)) {
     response.sendError(400, "결제 금액이 주문 금액과 달라요.");
     return;
   }
*/
URL url = new URL("https://api.tosspayments.com/v1/payments/confirm"); HttpURLConnection connection = (HttpURLConnection) url.openConnection();
connection.setRequestProperty("Authorization", authorizations); connection.setRequestProperty("Content-Type", "application/json"); connection.setRequestMethod("POST"); connection.setDoOutput(true);
JSONObject obj = new JSONObject(); obj.put("paymentKey", paymentKey); obj.put("orderId", orderId); obj.put("amount", amount); OutputStream outputStream = connection.getOutputStream();
outputStream.write(obj.toString().getBytes("UTF-8")); int code = connection.getResponseCode(); boolean isSuccess = code == 200 ? true : false; InputStream responseStream = isSuccess?
connection.getInputStream(): connection.getErrorStream(); Reader reader = new InputStreamReader(responseStream, StandardCharsets.UTF_8); JSONParser parser = new JSONParser(); JSONObject jsonObject =
(JSONObject) parser.parse(reader); responseStream.close(); %>

<!DOCTYPE html>
<html lang="ko">
  <head>
    <title>결제 성공</title>
    <meta http-equiv="x-ua-compatible" content="ie=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
  </head>
  <body>
    <section>
      <% if (isSuccess) { %>
      <h1>결제 성공</h1>
      <p>결과 데이터 : <%= escapeHtml(pickPaymentFields(jsonObject)) %></p>
      <p>orderName : <%= escapeHtml(jsonObject.get("orderName")) %></p>
      <p>method : <%= escapeHtml(jsonObject.get("method")) %></p>
      <p>
        <% if(jsonObject.get("method").equals("카드")) { out.println(escapeHtml(((JSONObject)jsonObject.get("card")).get("number")));} %> <% if(jsonObject.get("method").equals("가상계좌")) {
        out.println(escapeHtml(((JSONObject)jsonObject.get("virtualAccount")).get("accountNumber")));} %> <% if(jsonObject.get("method").equals("계좌이체")) {
        out.println(escapeHtml(((JSONObject)jsonObject.get("transfer")).get("bank")));} %> <% if(jsonObject.get("method").equals("휴대폰")) {
        out.println(escapeHtml(((JSONObject)jsonObject.get("mobilePhone")).get("customerMobilePhone")));} %>
      </p>

      <%} else { %>
      <h1>결제 실패</h1>
      <p><%= escapeHtml(jsonObject.get("message")) %></p>
      <span>에러코드: <%= escapeHtml(jsonObject.get("code")) %></span>
      <% } %>
    </section>
  </body>
</html>
