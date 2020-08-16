import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TimefreeTabsView from '../tabs/TimefreeTabsView';
import PlayingScreen from '../HOC/PlayingScreenHOC';
import HeaderLeft from '../components/HeaderLeft';
import HeaderRight from '../components/HeaderRight';
import { HeaderTitleText } from '../components/CustomText';
import { BASIC_GRAY } from '../config/constants';

const Stack = createStackNavigator();

const TimefreeNavigator = () => (
    <Stack.Navigator
        initialRouteName="Timefree"
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
            name="Timefree" 
            component={TimefreeTabsView}
            options={({ navigation }) => ({
                headerBackTitleVisible: false,
                headerTitle: () => <HeaderTitleText children="2019/7/25(木)" />,
                headerLeft: () => <HeaderLeft navigation={navigation} />,
                headerLeftContainerStyle: {
                    marginLeft: 12,
                },
            })}
        />
        <Stack.Screen 
            name="PlayAny" 
            component={PlayingScreen}
            options={({ route }) => ({
                headerTitle: () => <HeaderTitleText children={route.params.title} />,
                headerTintColor: BASIC_GRAY,
                headerBackTitleVisible: false
            })}
        />
    </Stack.Navigator>
)

export default TimefreeNavigator;