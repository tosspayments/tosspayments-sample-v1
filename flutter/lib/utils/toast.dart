import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';

void toast(BuildContext context, String title, String description) {
  Fluttertoast.showToast(
      msg: "$title : $description",
      toastLength: Toast.LENGTH_SHORT,
      gravity: ToastGravity.BOTTOM,
      timeInSecForIosWeb: 1,
      backgroundColor: Colors.red,
      textColor: Colors.white,
      fontSize: 16.0);
}
