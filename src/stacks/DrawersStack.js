import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MenuDrawer from '../screens/MenuDrawer';
import LocationDrawer from '../screens/LocationDrawer';
import BottomTabsNavigator from './BottomTabsStack';

const Stack = createStackNavigator();

const DrawersStack = () => (
  <Stack.Navigator
    initialRouteName="Main"
    headerMode="none"
  >
    <Stack.Screen name="Main" component={BottomTabsNavigator} />
    <Stack.Screen 
      name="Right" 
      component={MenuDrawer}
      options={{
        gestureDirection: 'horizontal'
      }} 
    />
    <Stack.Screen 
      name="Left" 
      component={LocationDrawer}
      options={{
        gestureDirection: 'horizontal-inverted'
      }}
    />
  </Stack.Navigator>
)

export default DrawersStack;