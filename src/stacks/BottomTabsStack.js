import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeNavigator from '../stacks/HomeStack';
import TimefreeNavigator from '../stacks/TimefreeStack';
import SearchNavigator from '../stacks/SearchStack';
import MyListNavigator from '../stacks/MylistStack';
import normailize from '../components/normailizeText';

import { Ionicons } from '@expo/vector-icons';
import { MAIN_BLUE, BASIC_GRAY } from '../config/constants';

const MyTabLabel = ({ tintColor, children }) => (
    <Text style={{ 
        color:tintColor, 
        marginTop:2.5, 
        fontSize:normailize(10), 
        fontWeight: '500' 
    }}>
      {children}
    </Text>
);

const IconComponent = ({ tintColor, iconName }) => (
  <Ionicons style={{ paddingTop:6 }} name={iconName} size={28} color={tintColor} />
);

const Tab = createBottomTabNavigator();

const BottomTabsNavigator = () => (
  <Tab.Navigator
    initialRouteName="Home"
    tabBarOptions={{
      activeTintColor: MAIN_BLUE,
      inactiveTintColor: BASIC_GRAY
    }}
    options={{
        style: {
          height: 53,
          paddingBottom: 3,
        },
    }}
  >
    <Tab.Screen 
      name="Home" 
      component={HomeNavigator}
      options={{
          tabBarLabel: ({ color }) => (
            <MyTabLabel tintColor={color}>ホーム</MyTabLabel>
          ),
          tabBarIcon: ({ color }) => (
            <IconComponent tintColor={color} iconName='md-home' />
          ),
      }}
    />
    <Tab.Screen 
      name="Timefree" 
      component={TimefreeNavigator} 
      options={{
          tabBarLabel: ({ color }) => (
            <MyTabLabel tintColor={color}>番組表</MyTabLabel>
          ),
          tabBarIcon: ({ color }) => (
            <IconComponent tintColor={color} iconName='md-pricetags' />
          )
      }}
    />
    <Tab.Screen 
      name="SearchNavigator" 
      component={SearchNavigator} 
      options={{
          tabBarLabel: ({ color}) => (
            <MyTabLabel tintColor={color}>さがす</MyTabLabel>
          ),
          tabBarIcon: ({ color }) => (
            <IconComponent tintColor={color} iconName='ios-search' />
          ),
      }}
    />
    <Tab.Screen 
      name="Mylist" 
      component={MyListNavigator} 
      options={{
          tabBarLabel: ({ color }) => (
            <MyTabLabel tintColor={color}>マイリスト</MyTabLabel>
          ),
          tabBarIcon: ({ color }) => (
            <IconComponent tintColor={color} iconName='ios-settings' />
          )
      }}
    />
  </Tab.Navigator>
);

export default BottomTabsNavigator;