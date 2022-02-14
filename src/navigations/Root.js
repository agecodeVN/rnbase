import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Navigator from 'navigations/navigator';
import {View} from 'react-native-ui-lib';

const Stack = createNativeStackNavigator();

import TabNavigation from './TabNavigation';

export default function () {
  const onRef = ref => {
    Navigator.setContainer(ref);
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
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name={'TabNavigation'} component={TabNavigation} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}
