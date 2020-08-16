import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { MAIN_BLUE } from '../config/constants';
import { TabText } from '../components/CustomText';
import MyFavorites from '../screens/MyFavorites';
import MySongs from '../screens/MySongs';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const CustomTabbar = ({ navigation, state }) => {
    const naviTitles = ['番組', 'オンエア曲'];
    const { routes, index } = state;
    const {
        containerStyle,
        tabStyle,
        textStyle,
        selectedTextStyle,
        textWrapper,
    } = styles;
    return (
        <View style={containerStyle}>
            {routes.map((route, idx) => {
                if (index === idx) {
                    return (
                        <View key={idx} style={tabStyle}>
                            <View style={textWrapper}>
                                <TabText 
                                    style={[textStyle, selectedTextStyle]}
                                    selected={true}
                                >
                                    {naviTitles[idx]}
                                </TabText>
                            </View>
                        </View>
                    );
                }
                return (
                    <TouchableOpacity
                        style={tabStyle}
                        key={idx}
                        onPress={() => { navigation.navigate(route.name);}}
                    >
                        <TabText style={textStyle}>{naviTitles[idx]}</TabText>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

const Tab = createMaterialTopTabNavigator();

const MyListTabsView = () => (
    <Tab.Navigator
        initialRouteName="ResultTimefree"
        tabBar={props => <CustomTabbar {...props} />}
    >
        <Tab.Screen name="ResultTimefree" component={MyFavorites} />
        <Tab.Screen name="ResultNext" component={MySongs} />
    </Tab.Navigator>
);

const styles = EStyleSheet.create({
    containerStyle: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#FFF',
    },
    tabStyle: {
        flex: 1,
        height: 46,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
    },
    textStyle: {
        textAlign: 'center',
    },
    selectedTextStyle: {
        color: MAIN_BLUE,
    },
    textWrapper: {
        borderBottomColor: MAIN_BLUE,
        borderBottomWidth: 3,
        alignSelf: 'center',
        paddingBottom: 6,
    }
});

export default MyListTabsView;