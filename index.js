/**
 * @format
 */

import React from 'react';
import {AppRegistry} from 'react-native';
import {
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import App from './App';
import {name as appName} from './app.json';

const theme = {
  colors: {
    ...DefaultTheme.colors,
    primary: '#6750a4',
    secondary: 'yellow',
    tertiary: 'blue',
    surface: '#8c516e',
  },
};

export default function AppComponent() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <App />
      </NavigationContainer>
    </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => AppComponent);