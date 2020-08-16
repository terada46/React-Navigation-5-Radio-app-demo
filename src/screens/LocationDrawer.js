import React, { Component, Fragment } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView
} from 'react-native';
import { connect } from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';

import { EvilIcons } from '@expo/vector-icons';
import { MAIN_BLUE, TOPIC_BG_COLOR, BASIC_GRAY } from '../config/constants';
import { ScrollView } from 'react-native-gesture-handler';
import { MenuTitle } from '../components/CustomText';
import { locationData } from '../config/locationData';

import { setLocation } from '../actions/locationAction'

class LocationDrawer extends Component {
    state = {
        data: locationData,
        value: '東京都',
    }

    onPress = value => {
        this.setState({
            value: value
        })
    }

    render() {
        return (
            <SafeAreaView style={{flex:1, backgroundColor: '#FFF'}}>
                <View style={styles.header}>
                    <MenuTitle>エリアを選ぶ：{this.props.location}</MenuTitle>
                    <TouchableOpacity 
                        activeOpacity={0.8} 
                        style={styles.icon} 
                        onPress={()=> this.props.navigation.goBack()}
                    >
                        <EvilIcons 
                            name="close" 
                            size={styles.$closeIconSize} 
                            color={BASIC_GRAY}
                        />
                    </TouchableOpacity>
                </View>
                <ScrollView 
                    contentContainerStyle={styles.contentContainer}
                    style={{backgroundColor: TOPIC_BG_COLOR}}
                >
                    <TouchableOpacity
                        style={styles.default}
                        onPress={() => this.props.navigation.goBack()}>
                        <View 
                            style={styles.circle} 
                        >
                            <View style={styles.checkedCircle} />
                        </View>
                        <Text style={styles.defaultValue}>現在地: ({this.props.location})</Text>
                    </TouchableOpacity>
                    <Text style={styles.description}>都道府県から選ぶ</Text>
                    <Text>(エリアフリー)</Text>
                    {
                        this.state.data.map((item, index) => (
                            <Fragment key={index}>
                                <Text style={styles.area}>{item.area}</Text>
                                <View style={styles.areaContainer}> 
                                    {item.locations.map((obj, i) => {
                                        return (
                                            <TouchableOpacity key={i}
                                                activeOpacity={0.8} 
                                                style={styles.buttonContainer}
                                                onPress={() => {
                                                        this.props.navigation.goBack();
                                                        this.props.setLocation(obj)
                                                    }
                                                }
                                            >
                                                <View 
                                                    style={styles.circle} 
                                                >
                                                    { this.props.location === obj && (<View style={styles.checkedCircle} />) } 
                                                </View>
                                                <Text style={styles.location}>{obj}</Text>
                                            </TouchableOpacity>
                                        )
                                    })}
                                </View>
                            </Fragment>
                        ))
                    }           
                </ScrollView>
            </SafeAreaView>
        )
    }
}

const mapStateToProps = state => {
    return { location: state.location.text }
};

const mapDispatchtoProps = dispatch => {
    return {
        setLocation: value => dispatch(setLocation(value))
    }
}

export default connect(mapStateToProps, mapDispatchtoProps)(LocationDrawer);

const styles = EStyleSheet.create({
    $closeIconSize: '1.7rem',
    $RadioButtonWidth: 15,
    contentContainer: {
        padding: 30,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    circle: {
        height: '$RadioButtonWidth',
        width: '$RadioButtonWidth',
        borderRadius: '$RadioButtonWidth * 0.5',
        borderWidth: 0,
        backgroundColor: '#ebebeb',
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkedCircle: {
        height: '$RadioButtonWidth * 0.5',
        width: '$RadioButtonWidth * 0.5',
        borderRadius: '$RadioButtonWidth * 0.5 * 0.5',
        backgroundColor: MAIN_BLUE,
        width: '$RadioButtonWidth - 2',
        height: '$RadioButtonWidth - 2',
        borderWidth: 2,
        borderColor: '#ebebeb'
    },
    header: {
        width: '100%',
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 33,
    },
    icon: {
        position: 'absolute',
        top: 1,
        right: 15,
    },
    default: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    defaultValue: {
        fontSize: '1.2rem',
        fontWeight: '500',
        marginLeft: 10,
        color: MAIN_BLUE,
    },
    description: {
        fontSize: '1.1rem',
    },
    areaContainer: {
        width: '74%',
        marginLeft: '37% * 0.26',
        paddingTop: 15,
        paddingBottom: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    area: {
        fontSize: '1rem',
        marginTop: 30,
        marginBottom: 16,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 20,
        flexBasis: '50%',
    },
    location: {
        fontSize: '1.1rem',
        fontWeight: '500',
        marginLeft: 10,
        color: MAIN_BLUE,
    }
})