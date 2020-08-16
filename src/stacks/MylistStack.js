import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HeaderLeft from '../components/HeaderLeft';
import HeaderRight from '../components/HeaderRight';
import PlayingScreen from '../HOC/PlayingScreenHOC';
import MyListResultTabsView from '../tabs/MyListResultTabsView';
import { HeaderTitleText } from '../components/CustomText';
import MyListTabsView from '../tabs/MyListTabsView';
import { BASIC_GRAY } from '../config/constants';

const Stack = createStackNavigator();

const MyListNavigator = () => (
    <Stack.Navigator
        initialRouteName="MyList"
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
            name="MyList"
            component={MyListTabsView}
            options={({ navigation }) => ({
                hheaderBackTitleVisible: false,
                headerTitle: () => <HeaderTitleText>マイリスト</HeaderTitleText>,
                headerLeft: () => <HeaderLeft navigation={navigation} />,
                headerLeftContainerStyle:{
                    marginLeft: 12,
                }
            })}
        />
        <Stack.Screen
            name="SearchSubscribed"
            component={MyListResultTabsView}
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
            name="PlaySubscribed" 
            component={PlayingScreen}
            options={({ route }) => ({
                headerTitle: () => <HeaderTitleText children={route.params.title} />,
                headerTintColor: BASIC_GRAY,
            })} 
        />
    </Stack.Navigator>
);

export default MyListNavigator;