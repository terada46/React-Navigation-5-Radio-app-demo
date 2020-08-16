import React, { Component } from 'react';
import {
    FlatList, 
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    SafeAreaView
    } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { searchDate, searchArea } from '../config/searchData';
import { BASIC_GRAY , MAIN_BLUE, MAIN_PINK } from '../config/constants';
import { EvilIcons } from '@expo/vector-icons';
import nomailize from '../components/normailizeText';

const { width, height } = Dimensions.get('window');

class SearchFilter extends Component {
    constructor(props) {
        super(props);
        const { params } = this.props.route;
        this.state = {
            type: params.type,
            value: params.value,
            data: params.type === 'date' ? searchDate : searchArea,
        }
    }

    goBack(data) {
        const { navigation: { navigate } } = this.props;
        navigate('Search', data);
    }

    _keyExtractor = (item) => item.id.toString();

    _renderDate = (item, index) => {
        let { date } = item;
        let length = this.state.data.length;
        let itemColor = index > 8 || index < 1 ? MAIN_BLUE : MAIN_PINK;
        return (
            <TouchableOpacity 
                style={EStyleSheet.child(styles, 'textContainer', index, length)}
                onPress={() => {this.goBack({date: date})}}>
                <Text style={[styles.item, { color: itemColor }]}>{date}</Text>
            </TouchableOpacity>
        )
    }

    _renderArea = (item, index) => {
        let { area } = item;
        let length = this.state.data.length;
        return (
            <TouchableOpacity 
                style={EStyleSheet.child(styles, 'textContainer', index, length)}
                onPress={() => {this.goBack({area: area})}}>
                <Text style={[styles.item, { color: MAIN_BLUE }]}>{area}</Text>
            </TouchableOpacity>
        )
    }

    render() {
        const { type, value } = this.state;
        return (
            <SafeAreaView style={{flex:1}}>
                <View style={{paddingTop: 10, backgroundColor: '#FFF'}}>
                    <TouchableOpacity 
                        style={styles.selectedView}
                        onPress={() => this.props.navigation.goBack()}>
                        <Text style={styles.selectedText}>{value}</Text>
                        <EvilIcons style={[styles.icon, {
                                right: type === 'date' && value !== 'すべて' ? '23%' : '32%'}
                            ]} 
                            name="chevron-up" size={34} 
                            color={BASIC_GRAY} />
                    </TouchableOpacity>
                    <FlatList
                        data={this.state.data}
                        keyExtractor={this._keyExtractor}
                        renderItem={
                            ({ item,index }) => this.state.type === 'date' ? 
                                this._renderDate(item, index) : 
                                this._renderArea(item, index)
                            }
                        contentContainerStyle={styles.container}
                    />
                </View>
            </SafeAreaView>
        )
    }
}

export default SearchFilter;

const styles = EStyleSheet.create({
    $width: width,
    $height: height,
    $topicWidth: '0.94 * $width',
    wrapper: {
        backgroundColor: '#FFF'
    },
    container: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: '$height',
    },
    selectedView: {
        marginBottom: '0.027 * $height',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectedText: {
        fontSize: nomailize(17),
        textAlign: 'center',
        color: BASIC_GRAY,
        width: '100%',
        height: '100%'
    },
    icon: {
       position: 'absolute',
       right: '32%',
    },
    textContainer: {
        alignItems: 'center',
        marginTop: '0.026 * $height',
    },
    'textContainer:first-child': {
        marginTop: 0,
    },
    item: {
        fontSize: nomailize(17),
        color: MAIN_BLUE,
        fontWeight: '300',
    },
});