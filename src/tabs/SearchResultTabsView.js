import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import SearchResultLeftHOC from '../HOC/SearchResultLeftHOC';
import SearchResultRightHOC from '../HOC/SearchResultRightHOC';
import CustomTabbar from '../components/CustomTabBar_results';

const Tab = createMaterialTopTabNavigator();

const SearchResultTabView = () => (
    <Tab.Navigator
        initialRouteName="ResultTimefree"
        tabBar={props => <CustomTabbar {...props} />}
    >
        <Tab.Screen name="ResultTimefree" component={SearchResultLeftHOC} />
        <Tab.Screen name="ResultNext" component={SearchResultRightHOC} />
    </Tab.Navigator>
);

export default SearchResultTabView;