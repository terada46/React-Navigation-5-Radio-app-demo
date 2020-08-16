import React, { Component } from 'react';
import { 
    View, 
    Text, 
    Dimensions,
    FlatList,
    TouchableOpacity, 
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Image from 'react-native-scalable-image';
import { connect } from 'react-redux';
import { Feather, Ionicons, FontAwesome } from '@expo/vector-icons';
import { toggleNotification } from '../actions/favoritesAction';
import { 
    updateData, 
    UPDATE_DATA_LEFT, 
} from '../actions/resultsAction';

import normailize from '../components/normailizeText';
import getImages from '../../assets/images/getImages';
import { TOPIC_BG_COLOR, BASIC_GRAY, MAIN_BLUE } from '../config/constants';
const { width, height } = Dimensions.get('window');
const imageWidth = width * 0.39;
const StationImageHeight = 0.11 * height;

class MyFavoritesScreen extends Component {
    _keyExtractor = (item) => item.id;

    _renderItem = ({item}) => {
        const { id, title, onAirDate, onAirTime } = item;
        const { $iconSize } = styles;
        let notiColor = item.notification ? MAIN_BLUE : BASIC_GRAY;
        const { station, cover } = getImages(id);
        return (
            <>
                <TouchableOpacity 
                    style={styles.touchableContentContainer}
                    onPress={() => this.searchTitle(id, title, onAirDate, onAirTime, station, cover)}
                >
                    <View style={styles.imageCard}>
                        <Image width={StationImageHeight} source={station} style={styles.image} />
                        <Image width={imageWidth} source={cover} style={styles.image} /> 
                    </View>
                    <View style={styles.textView}>
                        <Text numberOfLines={2} style={styles.title}>{title}</Text>
                        <Text style={styles.time}>{onAirDate}</Text>
                        <Text style={styles.time}>{onAirTime}</Text>
                    </View>
                
                </TouchableOpacity>
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity 
                        style={styles.button} 
                        activeOpacity={0.8}
                        onPress={() => this.play(id, title, onAirDate, onAirTime, station, cover)}
                    >
                        <FontAwesome name="play-circle" size={$iconSize} color={BASIC_GRAY} />
                        <Text style={styles.buttonText}>聴く</Text>
                    </TouchableOpacity>
                    <TouchableOpacity  
                        style={styles.button}
                        activeOpacity={0.8}
                        onPress={() => this.props.toggle_Notification(id)}
                    >
                        <Ionicons name="md-notifications-outline" size={$iconSize} color={notiColor} />
                        <Text style={styles.buttonText}>通知</Text>
                    </TouchableOpacity>
                    <TouchableOpacity  
                        style={styles.button} 
                        activeOpacity={0.8}
                        onPress={() => this.props.navigation.navigate('EditModal', {id, title})}
                    >
                        <Feather name="edit-3" size={$iconSize} color={BASIC_GRAY} />
                        <Text style={styles.buttonText}>編集</Text>
                    </TouchableOpacity>
                </View>
            </>
        )
    }

    searchTitle(id, title, onAirDate, onAirTime, station, cover) {
        this.props.dispatchData(
            UPDATE_DATA_LEFT, 
            {id, title, onAirDate, onAirTime, station, cover}
        );
        this.props.navigation.push('SearchSubscribed', { text: title })
    }

    play(id, title, onAirDate, onAirTime, station, cover) {
        this.props.navigation.navigate('PlaySubscribed', {
            id,
            title,
            onAirDate,
            onAirTime,
            station,
            cover,
            type: 'timefree'
        })
    }

    render() {
        return (
            <View style={{ backgroundColor:TOPIC_BG_COLOR }}>
                <FlatList
                    data={this.props.data}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                    contentContainerStyle={styles.listContentContainer}
                />
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        data: [...state.favorites]
    }
}
const mapDispatchToProps = dispatch => {
    return {
        dispatchData: (TYPE, data) => dispatch(updateData(TYPE, data)),
        toggle_Notification: id => dispatch(toggleNotification(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyFavoritesScreen);

const styles = EStyleSheet.create ({
    $cardWidth: 0.92 * width,
    $iconSize: '2rem',
    listContentContainer: {
        alignItems:'center', 
        marginTop:10, 
        minHeight:'100%',
        paddingBottom: '12%',
        backgroundColor: TOPIC_BG_COLOR,
    },
    touchableContentContainer: {
        width: '$cardWidth', 
        marginTop:20, 
        flexDirection:'row', 
        justifyContent:'flex-start', 
        alignItems:'center', 
        '@media ios': {
            shadowColor: 'rgba(214,214,214,0.5)',
            shadowOffset: {width:1, height:1},
            shadowOpacity: 1,
            shadowRadius: 3,
        },
    },
    imageCard: {
        maxWidth: '0.5 * $cardWidth',
        backgroundColor: 'white',
        marginRight:14, 
        paddingHorizontal: '3%',
        paddingVertical: '3%',
        alignItems: 'center',
    },
    textView: {
        maxWidth: '0.45 * $cardWidth',
        display:'flex', 
        alignItems:'flex-start'
    },
    title: {
        fontSize: normailize(17), 
        marginBottom:6,
        fontWeight: '400',
    },
    time: {
        fontWeight: '400',
        fontSize: normailize(17),
    },
    buttonsContainer: {
        flexDirection: 'row',
        marginTop: 20,
        paddingHorizontal: 32,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    button: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        fontSize: normailize(14),
        color: BASIC_GRAY,
        marginLeft: 5,
    }
});