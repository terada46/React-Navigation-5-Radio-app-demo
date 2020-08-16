import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MyListResultLeftHOC from '../HOC/MyListResultLeftHOC';
import MyListResultRightHOC from '../HOC/MyListResultRightHOC';
import CustomTabbar from '../components/CustomTabBar_results';

const Tab = createMaterialTopTabNavigator();

const MyListResultTabView = () => (
    <Tab.Navigator
        initialRouteName="ResultTimefree"
        tabBar={props => <CustomTabbar {...props} />}
    >
        <Tab.Screen name="ResultTimefree" component={MyListResultLeftHOC} />
        <Tab.Screen name="ResultNext" component={MyListResultRightHOC} />
    </Tab.Navigator>
);

export default MyListResultTabView;