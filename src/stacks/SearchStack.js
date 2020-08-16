import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Search from '../screens/Search';
import SearchResultTabsView from '../tabs/SearchResultTabsView';
import HeaderLeft from '../components/HeaderLeft';
import HeaderRight from '../components/HeaderRight';
import PlayingScreen from '../HOC/PlayingScreenHOC';

import { HeaderTitleText } from '../components/CustomText';
import { BASIC_GRAY } from '../config/constants';

const Stack = createStackNavigator();

const SearchNavigator = () => (
    <Stack.Navigator
        initialRouteName="Search"
        screenOptions={{
            headerRight: () => <HeaderRight />,
            headerRightContainerStyle: {
                marginRight: 13,
            },
            headerStyle: {
                borderBottomWidth: 0,
            },
        }}
    >  
        <Stack.Screen 
            name="Search" 
            component={Search} 
            options={({ navigation }) => ({
                headerBackTitleVisible: false,
                headerTitle: () => <HeaderTitleText>さがす</HeaderTitleText>,
                headerLeft: () => <HeaderLeft navigation={navigation} />,
                headerLeftContainerStyle: {
                    marginLeft: 12,
                },
            })}
        />
        <Stack.Screen
            name="SearchResult"
            component={SearchResultTabsView}
            options={({ route }) => ({
                headerTitle: () => <HeaderTitleText children={route.params.text} />,
                headerBackTitleVisible: false,
                headerTintColor: BASIC_GRAY,
                headerStyle: {
                    borderBottomWidth: 0,
                }   
            })}
        />
        <Stack.Screen
            name="PlaySearch"
            component={PlayingScreen}
            options={({ route }) => ({
                headerTitle: () => <HeaderTitleText children={route.params.title} />,
                headerTintColor: BASIC_GRAY,
            })}
        />
    </Stack.Navigator>
)

export default SearchNavigator;