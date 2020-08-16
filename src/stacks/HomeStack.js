import React from 'react';
import { Dimensions } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeTabView from '../tabs/HomeTabsView';
import TopicScreen from '../screens/Topic';
import PlayingScreen from '../HOC/PlayingScreenHOC';
import PopularTimefreeScreen from '../screens/PopularTimefree';
import PopularLiveScreen from '../screens/PopularLive';
import HeaderLeft from '../components/HeaderLeft';
import HeaderRight from '../components/HeaderRight';
import { HeaderTitleText } from '../components/CustomText';
import { BASIC_GRAY } from '../config/constants';

import Image from 'react-native-scalable-image';
const { width } = Dimensions.get('window');
const logoWidth = width * 0.23;

const HeaderImage = () => (
    <Image width={logoWidth} source={require('../../assets/images/logo.png')} />
)

const Stack = createStackNavigator();

const HomeNavigator = () => (
    <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
            headerRight: () => <HeaderRight />,
            headerRightContainerStyle:{
                marginRight: 13,
            },
            headerStyle: { 
                borderBottomWidth: 0,
            }
        }}
    >
        <Stack.Screen 
            name="Home" 
            component={HomeTabView}
            options={({ navigation }) => ({
                headerBackTitleVisible: false,
                headerTitle: () => <HeaderImage />,
                headerLeft: () => <HeaderLeft navigation={navigation} />,
                headerLeftContainerStyle: {
                    marginLeft: 12,
                },
            })}
        />
        <Stack.Screen 
            name="Play_from_home" 
            component={PlayingScreen}
            options={({ route }) => ({
                headerTitle: () => <HeaderTitleText children={route.params.title} />,
                headerTintColor: BASIC_GRAY,
                headerBackTitleVisible: false
            })} />
        <Stack.Screen 
            name="Topic" 
            component={TopicScreen} 
            options={({ route }) => ({
                headerTitle: () => <HeaderTitleText children={route.params.type} />,
                headerTintColor: BASIC_GRAY,
                headerBackTitleVisible: false
            })}
        />
        <Stack.Screen 
            name="PopularTimefree" 
            component={PopularTimefreeScreen}
            options={{
                headerTitle: () => <HeaderTitleText children={'タイムフリーの人気番組'} />,
                headerBackTitleVisible: false
            }}
        />
        <Stack.Screen
            name="PopularLive"
            component={PopularLiveScreen}
            options={{
                headerTitle: () => <HeaderTitleText children={'ライブの人気番組'} />,
                headerBackTitleVisible: false
            }}
        />
    </Stack.Navigator>
);

export default HomeNavigator;