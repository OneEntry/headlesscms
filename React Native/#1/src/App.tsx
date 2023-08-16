/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import {SafeAreaProvider} from 'react-native-safe-area-context';
import {AuthProvider} from './providers/AuthProvider';
import {NavigationProvider} from './providers/NavigationProvider';

function App(): JSX.Element {
  return (
    <AuthProvider>
      <SafeAreaProvider>
        <NavigationProvider></NavigationProvider>
      </SafeAreaProvider>
    </AuthProvider>
  );
}

export default App;
