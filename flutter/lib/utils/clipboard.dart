import 'package:flutter/services.dart';

void copyToClipboard(String textToCopy) {
  Clipboard.setData(ClipboardData(text: textToCopy)).then((result) {

  });
}