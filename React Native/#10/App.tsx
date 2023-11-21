import React from 'react';
import 'react-native-gesture-handler';
import {Router} from './src/navigation/Router';
import {LanguageProvider} from './src/providers/LanguageContext';

function App(): JSX.Element {
  return (
    <LanguageProvider>
      <Router />
    </LanguageProvider>
  );
}

export default App;
