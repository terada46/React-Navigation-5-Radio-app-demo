import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { MAIN_BLUE } from '../config/constants';
import { TabText } from '../components/CustomText';
import { connect } from 'react-redux';

class CustomTabbar extends Component {
    render() {
        const { navigation, tabTexts } = this.props;
        const { routes, index } = this.props.state;
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
                                        {tabTexts[idx]}
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
                            <TabText style={textStyle}>{tabTexts[idx]}</TabText>
                        </TouchableOpacity>
                    );
                })}
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        tabTexts:[
            '今すぐ聴ける：' + state.search.dataLeft_length + '件', 
            'これから配信：' + state.search.dataRight_length + '件',
        ]
    }
}
export default connect(mapStateToProps)(CustomTabbar);

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