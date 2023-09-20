import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {Button, SafeAreaView, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {RootStackParamList} from '../types/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export function HomeScreen({navigation}: Props) {
  return (
    <SafeAreaView
      style={{
        backgroundColor: Colors.lighter,
      }}>
      <View
        style={{
          backgroundColor: Colors.lighter,
        }}
      />
      <Button
        onPress={() => {
          navigation.navigate('PaymentWidgetFullWebView');
        }}
        title="결제위젯 Full WebView로 결제하기"
        color="#841584"
      />

      <Button
        onPress={() => {
          navigation.navigate('PaymentWidgetHalfWebView');
        }}
        title="결제위젯 Half WebView로 결제하기"
        color="red"
      />
    </SafeAreaView>
  );
}
