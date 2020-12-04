/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import DetailScreen from './src/screens/DetailScreen';
import AddScreen from './src/screens/AddScreen';
// import { SafeAreaProvider } from "react-native-safe-area-context";
import DataProvider from './DataProvider'
import { navigate } from '@react-navigation/routers/lib/typescript/src/CommonActions';

export default () => {
  const Stack = createStackNavigator();
  useEffect(() => {

    // fetch('https://jsonplaceholder.typicode.com/photos')
    //   .then(res => res.json())
    //   .then(res => console.log(res.length, 'res'))
    //   .catch(e => console.log(e, 'e'))
  }, [])

  const navigationRef = React.useRef()
  return (
    <DataProvider>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator
          mode='modal'
          screenOptions={{
            headerRight: () => (
              <TouchableOpacity onPress={() => navigationRef.current?.navigate('Add')}>
                <Text style={{ paddingHorizontal: 20 }}>Add</Text>
              </TouchableOpacity>
            ),
            gestureEnabled: true,
            cardOverlayEnabled: true,
          }}
          initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen
            name="Detail" component={DetailScreen} />
          <Stack.Screen
            options={{
              headerShown: false,
              gestureEnabled: true,
              cardOverlayEnabled: true,
              cardStyle: { backgroundColor: 'white' },
              ...TransitionPresets.ModalPresentationIOS,
            }}
            name="Add" component={AddScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </DataProvider>

  );
}

