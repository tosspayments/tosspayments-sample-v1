import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {HomeScreen} from './HomeScreen';
import {PaymentWidgetFullWebViewCheckoutScreen} from './PaymentWidgetFullWebviewCheckoutScreen';
import {PaymentWidgetHalfWebViewCheckoutScreen} from './PaymentWidgetHalfWebviewCheckoutScreen';

const Stack = createNativeStackNavigator();

export function RootStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen as any}
          options={{title: 'Welcome'}}
        />
        <Stack.Screen
          name="PaymentWidgetFullWebView"
          component={PaymentWidgetFullWebViewCheckoutScreen as any}
        />
        <Stack.Screen
          name="PaymentWidgetHalfWebView"
          component={PaymentWidgetHalfWebViewCheckoutScreen as any}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
