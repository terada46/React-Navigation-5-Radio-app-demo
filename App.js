import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import EStyleSheet from 'react-native-extended-stylesheet';
import SearchFilter from './src/screens/SearchFilter';
import DrawersStack from './src/stacks/DrawersStack';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './src/reducers/index';
import EditDrawer from './src/screens/EditDrawer';

const store = createStore(reducer);

const Stack = createStackNavigator();

const RootStack = () => (
  <Stack.Navigator
      initialRouteName="Main"
      mode="modal"
      headerMode="none"
      options={() => ({
        gestureEnabled: false,        
      })}
    >
      <Stack.Screen
        name="Main"
        component={DrawersStack}
        options={{ headerBackTitle: null }}
      />
      <Stack.Screen
        name="SearchFilter"
        component={SearchFilter}
        options={{ headerLeft: null }}
      />
      <Stack.Screen
        name="EditModal"
        component={EditDrawer}
        options={{ headerLeft: null }}
      />
    </Stack.Navigator>
)

EStyleSheet.build();

export default class App extends Component {
  render() {
    return (

        <Provider store={store}>
          <NavigationContainer>
            <RootStack />
          </NavigationContainer>
        </Provider>

    )
  }
}