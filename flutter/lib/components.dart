import 'package:flutter/material.dart';

/// 파란색 배경을 가진 커스텀 버튼 위젯입니다.
///
/// 이 버튼은 [onPressed] 콜백, 표시할 [text], [backgroundColor], [borderRadius], [minimumSize]와 같은 다양한 속성으로 커스터마이징할 수 있습니다.
/// 이러한 속성 중 하나라도 제공되지 않는 경우, 기본값이 사용됩니다.
///
/// 사용 예시:
/// ```dart
/// BlueButton(
///   onPressed: () {},
///   text: 'Click me',
///   backgroundColor: Colors.blue,
///   borderRadius: 8.0,
///   minimumSize: Size(120, 48),
/// )
/// ```
class BlueButton extends StatelessWidget {
  final void Function() onPressed;
  final String text;
  final Color? backgroundColor;
  final double? borderRadius;
  final Size? minimumSize;

  const BlueButton({
    Key? key,
    required this.onPressed,
    required this.text,
    this.backgroundColor,
    this.borderRadius,
    this.minimumSize,
  }) : super(key: key);

  BlueButton copyWith({
    void Function()? onPressed,
    String? text,
    Color? backgroundColor,
    double? borderRadius,
    Size? minimumSize,
  }) {
    return BlueButton(
      onPressed: onPressed ?? this.onPressed,
      text: text ?? this.text,
      backgroundColor: backgroundColor ?? this.backgroundColor,
      borderRadius: borderRadius ?? this.borderRadius,
      minimumSize: minimumSize ?? this.minimumSize,
    );
  }

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      onPressed: onPressed,
      style: ElevatedButton.styleFrom(
        backgroundColor: backgroundColor ?? Colors.blue,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(borderRadius ?? 12.0),
        ),
        minimumSize: minimumSize ?? const Size(0, 56),
      ),
      child: Center(
        child: Text(
          text,
          style: const TextStyle(
            fontSize: 16,
            color: Colors.white,
          ),
        ),
      ),
    );
  }
}
