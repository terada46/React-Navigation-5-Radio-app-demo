import React, { Component } from 'react';
import { View, Text, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import Image from 'react-native-scalable-image';
import EStyleSheet from 'react-native-extended-stylesheet';
import { title_small, time_small } from '../config/constants';
import { connect } from 'react-redux';
import { addItem } from '../actions/favoritesAction';

import { Feather, AntDesign } from '@expo/vector-icons';
import getImages from '../../assets/images/getImages';

const { width } = Dimensions.get('window');
const logoWidth = 0.28 * width;
const coverWidth = 0.9 * 0.94 * width;
const IconSize = 24;

class PlayingScreen extends Component {
    state = {
        data: Object.assign({}, this.props.route.params)
    }

    render() {
        const { id, title, onAirDate, onAirTime, description, type } = this.state.data;
        const { station, cover } = getImages(id);
        const { textColor } = this.props;
        return (
            <ScrollView contentContainerStyle={styles.container}> 
                <View style={ styles.logoView }>
                    <Image width={logoWidth} 
                        source={station} />
                    <Text>お知らせ</Text>
                </View>
                <View style={styles.main}>
                    <Image width={coverWidth} source={cover} />
                    <Text style={styles.title}>{title}</Text>
                    <Text style={[styles.time, textColor]}>
                        { type === 'coming' ? 
                            onAirDate + onAirTime + ' 配信予定' :
                            onAirDate + onAirTime}
                    </Text>
                    <View style={styles.favouriteAndShare}>
                        <TouchableOpacity style={styles.functions}
                            onPress={() => this.props.add_item({id, title, onAirDate, onAirTime})}
                        >
                            <AntDesign name="staro" size={IconSize} />
                            <Text style={ styles.iconText }>あとで聴く</Text>
                        </TouchableOpacity>
                        <View style={styles.functions}>
                            <Feather name="share" size={IconSize} />
                            <Text style={ styles.iconText}>友達に教える</Text>
                        </View>
                    </View>
                </View>
                <Text style={ styles.description }>{description}</Text>
            </ScrollView>
        )
    }
}

const mapDispatchtoProps = dispatch => {
    return {
        add_item: obj => dispatch(addItem(obj))
    }
}

export default connect(null, mapDispatchtoProps)(PlayingScreen);

const styles = EStyleSheet.create({
    $viewWidth: '94%',
    container: {
        alignItems:'center', 
        minHeight: '100%',
    },
    main: {
        backgroundColor: '#FFF',
        paddingTop: '6.5%',
        paddingBottom: '7%',
        paddingHorizontal: '5.5%',
        marginHorizontal: '2%'
    },
    logoView: {
        marginTop: '6%',
        width: '$viewWidth',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: title_small,
        marginTop: 20,
    },
    time: {
        fontSize: time_small,
        fontWeight: '500',
        marginTop: 10,
    },
    favouriteAndShare: {
        marginTop: 30,
        flexDirection: 'row', 
        justifyContent: 'space-around',
    },
    functions: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    iconText: {
        marginLeft: 8,
        fontSize: '1rem'
    },
    description: {
        width: '0.95 * $viewWidth',
        marginTop: '7%',
        fontSize: '0.93rem',
        lineHeight: '1.2rem',
        fontFamily: 'HiraginoSans-W3',
        paddingBottom: '5%'
    }
})