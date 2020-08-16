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
import getImages from '../../assets/images/getImages';
import { 
    MAIN_BLUE, 
    MAIN_PINK, 
    LIVE_BG_COLOR, 
    NEXT_BG_COLOR, 
    TIMEFREE_BG_COLOR,
    title_medium,
    time_large,
} from '../config/constants';

const { width } = Dimensions.get('window');
const imageWidth = width * 0.39;
const now = 20190803212400;

const getBgColorByTime = (start, end) => {
    let bgColor;
    if (start > now) {
        bgColor = NEXT_BG_COLOR
    } else if (start < now && end > now) {
        bgColor = LIVE_BG_COLOR
    } else {
        bgColor = TIMEFREE_BG_COLOR
    }
    return bgColor;
}

const getTextColorByTime = (end) => {
    let textColor;
    if (end < now) {
        textColor = MAIN_PINK
    } else {
        textColor = MAIN_BLUE
    }
    return textColor;
}

const Badge = () => (
    <View style={styles.badge}>
        <Text style={styles.badgeText}>ライブ</Text>
    </View>
);

class TimefreeList extends React.Component {
    state = {
        data: this.props.data
    }

    _keyExtractor = (item) => item.id;

    _renderItem = ({item}) => {
        const { id, title, onAirDate, onAirTime, startAt, endAt, description } = item;
        const { cover } = getImages(id);
        let bgColor = getBgColorByTime(startAt, endAt);
        let textColor = getTextColorByTime(endAt);
        let type = endAt > now && now >= startAt ? 'live' : ( now >= endAt ? 'timefree' : 'coming');
        return (
            <View style={[styles.itemWrapper, {backgroundColor: bgColor}]}>
                <TouchableOpacity 
                    style={styles.touchableContentContainer}
                    onPress={() => this.playTheRadio(id, title, onAirDate, onAirTime, description, type)}
                >
                    <View style={styles.imageCard}>
                        <Image width={imageWidth} source={cover} style={styles.image} /> 
                    </View>
                    <View style={styles.textView}>
                        <Text numberOfLines={2} style={styles.title}>{title}</Text>
                        {
                            type === 'live' ? (
                                <View style={styles.badgeAndTimeContainer}>
                                    <Badge />
                                    <Text style={[styles.time, {color: textColor}]}>{onAirTime}</Text>
                                </View>
                            ) : (
                                <Text style={[styles.time, {color: textColor}]}>{onAirTime}</Text>
                            )
                        }
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    playTheRadio(id, title, onAirDate, onAirTime, description, type) {
        const { navigation } = this.props;
        navigation.navigate('PlayAny', {
            id,
            title, 
            onAirDate,
            onAirTime,
            description,
            type
        })
    }

    render() {
        return (
            <View style={styles.contentContainer}>
                <FlatList
                    data={this.state.data}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                />
            </View>
        )
    }
}

export default function(props) {
    const navigation = useNavigation();
    return <TimefreeList {...props} navigation={navigation} />
}

const styles = EStyleSheet.create ({
    $cardWidth: width,
    contentContainer: {
        minHeight:'100%',
        flex: 1, 
        backgroundColor: TIMEFREE_BG_COLOR, 
    },
    itemWrapper: {
        width: '$cardWidth',
        alignItems: 'center',
    },
    touchableContentContainer: {
        width: '0.92 * $cardWidth', 
        marginVertical:20, 
        flexDirection:'row', 
        justifyContent:'flex-start', 
        alignItems:'center', 
    },
    imageCard: {
        maxWidth: '0.5 * $cardWidth',
        backgroundColor: 'white',
        marginRight: 14, 
        paddingHorizontal: '3%',
        paddingVertical: '3%',
        borderRadius: 10,
        alignItems: 'center',
        '@media ios': {
            shadowColor: 'rgba(214,214,214,0.5)',
            shadowOffset: {width:2, height:4},
            shadowOpacity: 1,
            shadowRadius: 3,
        },
    },
    textView: {
        maxWidth: '0.45 * $cardWidth',
        display:'flex', 
        alignItems:'flex-start'
    },
    title: {
        fontSize: title_medium, 
        marginBottom:6,
        fontWeight: '300',
    },
    time: {
        fontWeight: '400',
        fontSize: time_large,
    },
    badgeAndTimeContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    badge: {
        backgroundColor: MAIN_BLUE,
        borderRadius: 3,
        marginRight: 13.5,
    },
    badgeText: {
        color: '#FFF',
        fontSize: '0.7rem',
        fontWeight: '600',
        marginVertical: 3,
        marginHorizontal: 7,
    }
});