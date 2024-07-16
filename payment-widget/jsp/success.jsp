<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="java.util.Base64"%>
<%@ page import="java.util.Base64.Encoder"%>
<%@ page import="java.net.HttpURLConnection"%>
<%@ page import="java.net.URL" %>
<%@ page import="org.json.simple.JSONObject" %>
<%@ page import="org.json.simple.parser.JSONParser" %>
<%@ page import="org.json.simple.parser.ParseException" %>
<%@ page import="java.io.OutputStream" %>
<%@ page import="java.io.InputStream" %>
<%@ page import="java.io.InputStreamReader" %>
<%@ page import="java.io.Reader" %>
<%@ page import="java.net.URLEncoder" %>
<%@ page import="java.util.Set" %>

<%
 // ------ 결제 승인 API 호출 ------
 // @docs https://docs.tosspayments.com/guides/payment-widget/integration#3-결제-승인하기
  // TODO: 개발자센터에 로그인해서 내 결제위젯 연동 키 > 시크릿 키를 입력하세요. 시크릿 키는 외부에 공개되면 안돼요.
  // @docs https://docs.tosspayments.com/reference/using-api/api-keys
  String secretKey = "test_gsk_docs_OaPz8L5KdmQXkzRz3y47BMw6:";
  
  Encoder encoder = Base64.getEncoder(); 
  byte[] encodedBytes = encoder.encode(secretKey.getBytes("UTF-8"));
  String authorizations = "Basic "+ new String(encodedBytes, 0, encodedBytes.length);

  String orderId = request.getParameter("orderId");
  String paymentKey = request.getParameter("paymentKey");
  String amount = request.getParameter("amount");
  paymentKey = URLEncoder.encode(paymentKey, "UTF-8");
  
  URL url = new URL("https://api.tosspayments.com/v1/payments/confirm");
  
  HttpURLConnection connection = (HttpURLConnection) url.openConnection();
  connection.setRequestProperty("Authorization", authorizations);
  connection.setRequestProperty("Content-Type", "application/json");
  connection.setRequestMethod("POST");
  connection.setDoOutput(true);
  JSONObject obj = new JSONObject();
  obj.put("paymentKey", paymentKey);
  obj.put("orderId", orderId);
  obj.put("amount", amount);
  
  OutputStream outputStream = connection.getOutputStream();
  outputStream.write(obj.toString().getBytes("UTF-8"));
  
  int code = connection.getResponseCode();
  boolean isSuccess = code == 200 ? true : false;
  
  InputStream responseStream = isSuccess? connection.getInputStream(): connection.getErrorStream();
  
  Reader reader = new InputStreamReader(responseStream, "UTF-8");
  JSONParser parser = new JSONParser();
  JSONObject jsonObject = (JSONObject) parser.parse(reader);
  responseStream.close();
%>

<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="utf-8" />
    <link rel="stylesheet" type="text/css" href="./public/style.css" />
    <link rel="icon" href="https://static.toss.im/icons/png/4x/icon-toss-logo.png" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>토스페이먼츠 샘플 프로젝트</title>
  </head>
    <body>
    <section>
        <%
        if (isSuccess) { %>

          <div class="box_section" style="width: 600px">
            <img width="100px" src="https://static.toss.im/illusts/check-blue-spot-ending-frame.png" />
            <h2>결제를 완료했어요</h2>
      
            <div class="p-grid typography--p" style="margin-top: 50px">
              <div class="p-grid-col text--left"><b>결제금액</b></div>
              <div class="p-grid-col text--right" id="amount"> <%= jsonObject.get("totalAmount") %></div>
            </div>
            <div class="p-grid typography--p" style="margin-top: 10px">
              <div class="p-grid-col text--left"><b>주문번호</b></div>
              <div class="p-grid-col text--right" id="orderId"> <%= jsonObject.get("orderId") %></div>
            </div>
            <div class="p-grid typography--p" style="margin-top: 10px">
              <div class="p-grid-col text--left"><b>paymentKey</b></div>
              <div class="p-grid-col text--right" id="paymentKey" style="white-space: initial; width: 250px"><%= jsonObject.get("paymentKey") %></div>
            </div>
            <div class="p-grid" style="margin-top: 30px">
              <button class="button p-grid-col5" onclick="location.href='https://docs.tosspayments.com/guides/payment/integration';">연동 문서</button>
              <button class="button p-grid-col5" onclick="location.href='https://discord.gg/A4fRFXQhRu';" style="background-color: #e8f3ff; color: #1b64da">실시간 문의</button>
            </div>
          </div>

          <div class="box_section" style="width: 600px; text-align: left">
            <b>Response Data :</b>
            <div id="response"">
              <pre>
                <%
                Set<String> keys = jsonObject.keySet();
                for (String key : keys) {
                %>
                <%= key %>: <%= jsonObject.get(key) %>
                <%
                }
                %>
              </pre>
            </div>
          </div>
      
        <%} else { %>
          <div id="info" class="box_section" style="width: 600px">
            <img width="100px" src="https://static.toss.im/lotties/error-spot-no-loop-space-apng.png" />
            <h2>결제를 실패했어요</h2>
            <div class="p-grid typography--p" style="margin-top: 50px">
              <div class="p-grid-col text--left"><b>에러메시지</b></div>
              <div class="p-grid-col text--right" id="message"><%= jsonObject.get("message") %></div>
            </div>
            <div class="p-grid typography--p" style="margin-top: 10px">
              <div class="p-grid-col text--left"><b>에러코드</b></div>
              <div class="p-grid-col text--right" id="code"><%= jsonObject.get("code") %></div>
            </div>
            <div class="p-grid">
              <button class="button p-grid-col5" onclick="location.href='https://docs.tosspayments.com/guides/payment/integration';">연동 문서</button>
              <button class="button p-grid-col5" onclick="location.href='https://discord.gg/A4fRFXQhRu';" style="background-color: #e8f3ff; color: #1b64da">실시간 문의</button>
            </div>
          </div>
      
      <%
        }
        %>
    </section>
    </body>
    </html>