import React from 'react';
import { 
    View,
    Text,
    Dimensions,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import Image from 'react-native-scalable-image';
import EStyleSheet from 'react-native-extended-stylesheet';
import { useNavigation } from '@react-navigation/native';
import { MAIN_BLUE, MAIN_PINK } from '../config/constants';
import { 
    updateLength, 
    UPDATE_LEFT_LENGTH, 
    UPDATE_RIGHT_LENGTH 
} from '../actions/resultsAction';
import { connect } from 'react-redux';

import getImages from '../../assets/images/getImages';
const { width, height } = Dimensions.get('window');
const imageWidth = width * 0.39;
const StationImageHeight = 0.088 * height;

class List extends React.Component {
    state = {
        data: this.props.data
    }

    _keyExtractor = (item) => item.id;

    componentDidMount() {
        const { 
            type, 
            data, 
            update_timefree, 
            update_coming 
        } = this.props;
        if (type === 'timefree') {
            update_timefree(UPDATE_LEFT_LENGTH, data.length)
        } 
        if (type === 'coming') {
            update_coming(UPDATE_RIGHT_LENGTH, data.length)
        } 
    }

    _renderItem = ({item}) => {
        const { id, title, onAirDate, onAirTime, description } = item;
        const { type } = this.props;
        let cardStyle = { 
            paddingVertical: '4%',
            borderRadius: 12
        }
        let textStyle = { 
            color: type === 'timefree' ? MAIN_PINK : MAIN_BLUE,
        };
        const { station, cover } = getImages(id);
        return (
            <TouchableOpacity 
                style={ styles.touchableContentContainer }
                onPress={() => this.playTheRadio(id, title, onAirDate, onAirTime, description)}
            >
                <View style={[ styles.imageCard, cardStyle ]}>
                    <Image width={ StationImageHeight } source={station} style={ styles.image } />
                    <Image width={ imageWidth } source={cover} style={ styles.image } /> 
                </View>
                <View style={ styles.textView }>
                    <Text numberOfLines={2} style={ styles.title }>{title}</Text>
                    <Text style={[ styles.time, textStyle ]}>{onAirDate}</Text>
                    <Text style={[ styles.time, textStyle ]}>{onAirTime}</Text>
                </View>
              
            </TouchableOpacity>
        )
    }

    playTheRadio(id, title, onAirDate, onAirTime, description) {
        const { navigation, type, playingRoute } = this.props;
        navigation.navigate(playingRoute, {
            id,
            title, 
            onAirDate,
            onAirTime,
            description,
            type
        })
    }

    render() {
        const { bgStyle } = this.props;
        return (
            <View style={ bgStyle }>
                <FlatList
                    data={this.state.data}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                    contentContainerStyle={[styles.listContentContainer, bgStyle ]}
                />
            </View>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        update_timefree: (type, num) => dispatch(updateLength(type, num)),
        update_coming: (type, num )=> dispatch(updateLength(type, num))
    }
}

const ConnectList = (connect(null, mapDispatchToProps)(List));

export default function(props) {
    const navigation = useNavigation();
    return <ConnectList {...props} navigation={navigation} />
}

const styles = EStyleSheet.create ({
    $cardWidth: 0.92 * width,
    listContentContainer: {
        alignItems:'center', 
        marginTop:10, 
        minHeight:'100%',
        paddingBottom: '12%',
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
        fontSize:'1.14rem', 
        marginBottom:6,
        fontWeight: '300',
    },
    time: {
        fontWeight: '400',
        fontSize: '1.2rem',
    }
});