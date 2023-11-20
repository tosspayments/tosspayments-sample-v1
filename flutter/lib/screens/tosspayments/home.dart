import 'package:example/screens/tosspayments/payment.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:get/get.dart';
import 'package:tosspayments_widget_sdk_flutter/model/paymentData.dart';

/// [Home] 위젯은 사용자에게 결제 수단 및 주문 관련 정보를 입력받아
/// 결제를 시작하는 화면을 제공합니다.
class Home extends StatefulWidget {
  /// 기본 생성자입니다.
  const Home({super.key});

  @override
  _HomeState createState() => _HomeState();
}

/// [_HomeState]는 [Home] 위젯의 상태를 관리하는 클래스입니다.
class _HomeState extends State<Home> {
  final _form = GlobalKey<FormState>();
  late String payMethod = '카드'; // 결제수단
  late String orderId; // 주문번호
  late String orderName; // 주문명
  late String amount; // 결제금액
  late String customerName; // 주문자명
  late String customerEmail; // 구매자 이메일

  /// 이 메소드는 [Home] 위젯을 빌드합니다.
  ///
  /// 사용자에게 결제 관련 정보를 입력받아 저장하며,
  /// '결제하기' 버튼을 누르면 [Payment] 위젯을 통해 결제를 시작합니다.
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('toss payments 결제 테스트'),
        centerTitle: true,
        systemOverlayStyle: SystemUiOverlayStyle.dark,
      ),
      body: SafeArea(
        minimum: const EdgeInsets.symmetric(horizontal: 15),
        child: Form(
          key: _form,
          child: ListView(
            children: [
              DropdownButtonFormField<String>(
                value: '카드',
                decoration: const InputDecoration(
                  labelText: '결제수단',
                  floatingLabelBehavior: FloatingLabelBehavior.always,
                  labelStyle: TextStyle(fontSize: 15, color: Color(0xffcfcfcf)),
                ),
                onChanged: (String? newValue) {
                  payMethod = newValue ?? '카드';
                },
                items: ['카드', '가상계좌', '계좌이체', '휴대폰', '상품권']
                    .map<DropdownMenuItem<String>>((String i) {
                  return DropdownMenuItem<String>(
                    value: i,
                    child: Text({
                          '카드': '카드',
                          '가상계좌': '가상계좌',
                          '계좌이체': '계좌이체',
                          '휴대폰': '휴대폰',
                          '상품권': '상품권'
                        }[i] ??
                        '카드'),
                  );
                }).toList(),
              ),
              TextFormField(
                decoration: const InputDecoration(
                  labelText: '주문번호(orderId)',
                ),
                initialValue:
                    'tosspaymentsFlutter_${DateTime.now().millisecondsSinceEpoch}',
                onSaved: (String? value) {
                  orderId = value!;
                },
              ),
              TextFormField(
                decoration: const InputDecoration(
                  labelText: '주문명(orderName)',
                ),
                initialValue: 'Toss T-shirt',
                onSaved: (String? value) {
                  orderName = value!;
                },
              ),
              TextFormField(
                decoration: const InputDecoration(
                  labelText: '결제금액(amount)',
                ),
                initialValue: '50000',
                keyboardType:
                    const TextInputType.numberWithOptions(decimal: true),
                onSaved: (String? value) {
                  amount = value!;
                },
              ),
              TextFormField(
                decoration: const InputDecoration(
                  labelText: '구매자명(customerName)',
                ),
                initialValue: '김토스',
                onSaved: (String? value) {
                  customerName = value!;
                },
              ),
              TextFormField(
                decoration: const InputDecoration(
                  labelText: '이메일(customerEmail)',
                ),
                initialValue: 'email@tosspayments.com',
                keyboardType: TextInputType.emailAddress,
                onSaved: (String? value) {
                  customerEmail = value!;
                },
              ),
              Container(
                  padding: const EdgeInsets.symmetric(vertical: 10),
                  child: ElevatedButton(
                    onPressed: () async {
                      _form.currentState!.save();
                      PaymentData data = PaymentData(
                          paymentMethod: payMethod,
                          orderId: orderId,
                          orderName: orderName,
                          amount: int.parse(amount),
                          customerName: customerName,
                          customerEmail: customerEmail,
                          successUrl: Constants.success,
                          failUrl: Constants.fail);
                      var result = await Get.to(
                        () => const Payment(),
                        fullscreenDialog: true,
                        arguments: data,
                      );
                      if (result != null) {
                        Get.toNamed("/result", arguments: result);
                      }
                    },
                    child: const Text(
                      '결제하기',
                      style: TextStyle(
                        fontSize: 18,
                        color: Colors.white,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ))
            ],
          ),
        ),
      ),
    );
  }
}
