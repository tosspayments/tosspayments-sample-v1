import 'package:example/screens/intro.dart';
import 'package:example/screens/result.dart';
import 'package:example/screens/tosspayments/home.dart';
import 'package:example/screens/tosspayments_widget/widget_home.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:get/get.dart';

/// The main entry point for the application.
void main() {
  runApp(const TosspaymentsSampleApp());
}

/// TosspaymentsSampleApp represents the root widget of the application.
///
/// This is a [StatelessWidget] which runs MaterialApp with a theme and home
/// page which is 'TosspaymentsSampleHome'.
class TosspaymentsSampleApp extends StatelessWidget {
  /// Creates a TosspaymentsSampleApp.
  const TosspaymentsSampleApp({Key? key}) : super(key: key);

  /// Describes the part of the user interface represented by this widget.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Tosspayments Flutter Sample',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: const TosspaymentsSampleHome(title: 'Tosspayments Flutter Sample'),
    );
  }
}

/// TosspaymentsSampleHome is a widget that represents the home screen of the
/// application.
///
/// This is a [StatefulWidget] which maintains the state of the home screen.
class TosspaymentsSampleHome extends StatefulWidget {
  /// Creates a TosspaymentsSampleHome with a given title.
  const TosspaymentsSampleHome({Key? key, required this.title}) : super(key: key);

  /// The title displayed on the home screen.
  final String title;

  /// Creates the mutable state for this widget at a given location in the tree.
  @override
  State<TosspaymentsSampleHome> createState() => _TosspaymentsSampleHomeState();
}

/// _TosspaymentsSampleHomeState is the logic and internal state for a [TosspaymentsSampleHome] widget.
class _TosspaymentsSampleHomeState extends State<TosspaymentsSampleHome> {
  static const Color primaryColor = Color(0x0f0064ff);

  /// Describes the part of the user interface represented by this widget.
  ///
  /// This function returns a [GetMaterialApp] with the [primaryColor] theme.
  @override
  Widget build(BuildContext context) {
    SystemChrome.setSystemUIOverlayStyle(const SystemUiOverlayStyle(
      systemNavigationBarColor: Colors.transparent,
      statusBarColor: Colors.transparent,
    ));
    SystemChrome.setEnabledSystemUIMode(SystemUiMode.edgeToEdge);

    return GetMaterialApp(
      initialRoute: '/',
      theme: ThemeData(
        primaryColor: primaryColor,
      ),
      getPages: [
        GetPage(name: '/', page: () => const Intro()),
        GetPage(name: '/home', page: () => const Home()),
        GetPage(name: '/widget_home', page: () => const WidgetHome()),
        GetPage(name: '/result', page: () => const ResultPage())
      ],
    );
  }
}
