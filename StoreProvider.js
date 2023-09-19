/* eslint-disable react-native/no-inline-styles */
import 'react-native-gesture-handler';
import React from 'react';
import App from './App';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'jotai';

const StoreProvider = () => (
  <GestureHandlerRootView style={{ flex: 1 }}>
    <Provider>
      <App />
    </Provider>
  </GestureHandlerRootView>
);

export default StoreProvider;
