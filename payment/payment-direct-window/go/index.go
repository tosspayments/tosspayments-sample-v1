package main

import (
	"bytes"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"html/template"
	"io/ioutil"
	"log"
	"net/http"
	"strconv"
)

const secretKey string = "test_sk_zXLkKEypNArWmo50nX3lmeaxYG5R"

type Page struct {
	Title string
	Body  []byte
}

// Approval -
type Approval struct {
	PaymentKey string `json:"paymentKey"`
	OrderId    string `json:"orderId"`
	Amount     int    `json:"amount"`
}

func basicAuth(username, password string) string {
	auth := username + ":" + password
	return base64.StdEncoding.EncodeToString([]byte(auth))
}

func loadPage(title string) (*Page, error) {
	filename := title + ".txt"
	body, err := ioutil.ReadFile(filename)
	if err != nil {
		return nil, err
	}
	return &Page{Title: title, Body: body}, nil
}

func renderTemplate(w http.ResponseWriter, tmpl string, p *Page) {
	t, _ := template.ParseFiles(tmpl + ".html")
	t.Execute(w, p)
}

func successUrlHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "%s 성공 처리.\n", r.URL.Path[1:]) // r.URL.Path 는 URL에서 도메인이나 IP주소 다음에 나오는 경로를 반환함.
	fmt.Fprintf(w, "URL: %s\n\n", r.URL.Path[:])
	//fmt.Fprintf(w, "Query: %s\n", r.URL.Query())
	fmt.Fprintf(w, "paymentKey: %s\n", r.URL.Query().Get("paymentKey"))
	fmt.Fprintf(w, "orderId: %s\n", r.URL.Query().Get("orderId"))
	fmt.Fprintf(w, "amount: %s\n", r.URL.Query().Get("amount"))

	paymentKey := r.URL.Query().Get("paymentKey")
	orderId := r.URL.Query().Get("orderId")
	amount, err := strconv.Atoi(r.URL.Query().Get("amount"))

	// 응답 파라미터 json 형태로 셋팅
	approval := Approval{paymentKey, orderId, amount}
	pbytes, _ := json.Marshal(approval)

	buff := bytes.NewBuffer(pbytes)

	client := &http.Client{
		Transport: nil,
		Jar:       nil,
		Timeout:   0,
	}

	fmt.Println("paymentKey = " + r.URL.Query().Get("paymentKey"))
	fmt.Println("orderId = " + r.URL.Query().Get("orderId"))
	fmt.Println("orderId = " + r.URL.Query().Get("amount"))

	req, err := http.NewRequest("POST", "https://api.tosspayments.com/v1/payments/confirm", buff)
	req.Header.Add("Authorization", "Basic "+basicAuth(secretKey, ""))
	req.Header.Add("Content-Type", "application/json")
	resp, err := client.Do(req)

	if err != nil {
		panic(err)
	}
	defer resp.Body.Close()

	data, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		panic(err)
	}
	fmt.Println(string(data))
	fmt.Fprintf(w, "\n\n== 승인 응답 결과 ==\n")
	fmt.Fprintf(w, string(data))
}

func failUrlHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "%s 실패 처리.\n", r.URL.Path[1:]) // r.URL.Path 는 URL에서 도메인이나 IP주소 다음에 나오는 경로를 반환함.
	fmt.Fprintf(w, "URL: %s\n\n", r.URL.Path[:])
	//fmt.Fprintf(w, "Query: %s\n", r.URL.Query())
	fmt.Fprintf(w, "code: %s\n", r.URL.Query().Get("code"))
	fmt.Fprintf(w, "message: %s\n", r.URL.Query().Get("message"))

	fmt.Println("code = " + r.URL.Query().Get("code"))
	fmt.Println("message = " + r.URL.Query().Get("message"))
}

func payReqHandler(w http.ResponseWriter, r *http.Request) {
	title := r.URL.Path[len("/"):]
	p, err := loadPage(title)
	if err != nil {
		p = &Page{Title: title}
	}
	renderTemplate(w, "index", p)
}

func main() {
	http.HandleFunc("/", payReqHandler)
	http.HandleFunc("/successUrl/", successUrlHandler)
	http.HandleFunc("/failUrl/", failUrlHandler)
	log.Fatal(http.ListenAndServe(":9090", nil))
}
