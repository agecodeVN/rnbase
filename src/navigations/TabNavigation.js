import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

import Home from 'containers/home';

const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false
      }}>
      <Tab.Screen name={'Home'} component={Home} />
    </Tab.Navigator>
  );
};

export default TabNavigation;
