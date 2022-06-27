import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Navigator from 'navigations/navigator';
import { View } from 'react-native-ui-lib';
import { useSelector } from 'react-redux';

const Stack = createNativeStackNavigator();

import TabNavigation from './TabNavigation';
import Signin from 'containers/auth/Signin';

export default function () {
  const auth = useSelector(state => state.auth);

  const onRef = ref => {
    Navigator.setContainer(ref);
  };

  const getInitialRouteName = () => {
    let initialRouteName = 'Signin';
    if (auth?.isLogged) {
      initialRouteName = 'TabNavigation';
    }
    return initialRouteName;
  };

  return (
    <View flex bg-white>
      <StatusBar
        translucent
        backgroundColor={'transparent'}
        barStyle={'dark-content'}
      />
      <NavigationContainer ref={onRef}>
        <Stack.Navigator
          initialRouteName={getInitialRouteName()}
          screenOptions={{
            headerShown: false
          }}>
          <Stack.Screen name={'Signin'} component={Signin} />
          <Stack.Screen name={'TabNavigation'} component={TabNavigation} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}
