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
import { MAIN_BLUE, MAIN_PINK, title_medium, time_large } from '../config/constants';
import getImages from '../../assets/images/getImages';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');
const coverWidth = width * 0.39;
const stationHeight = 0.1 * height;

class List extends React.Component {
    state = {
        data: this.props.data
    }

    _keyExtractor = (item) => item.id;

    _renderItem = ({ item }) => {
        const { id, title, onAirDate, onAirTime, description } = item;
        const { type } = this.props;
        const { station, cover } = getImages(id);
        let textStyle = { 
            color: type === 'live' ? MAIN_BLUE : MAIN_PINK,
        };
        return (
            <TouchableOpacity 
                style={ styles.touchableContentContainer }
                onPress={() => this.playTheRadio(id, title, onAirDate, onAirTime, description)}
            >
                <View style={styles.imageCard}>
                    <Image width={stationHeight} source={station} style={styles.image} />
                    <Image width={coverWidth} source={cover} style={styles.image} /> 
                </View>
                <View style={ styles.textView }>
                    <Text numberOfLines={2} style={styles.title}>{title}</Text>
                    <Text style={[styles.time, textStyle]}>{onAirTime}</Text>
                </View>
              
            </TouchableOpacity>
        )
    }

    playTheRadio(id, title, onAirDate, onAirTime, description) {
        const { navigation, type } = this.props;
        navigation.navigate('Play_from_home', {
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

export default function(props) {
    const navigation = useNavigation();
    return <List {...props} navigation={navigation} />
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
    },
    imageCard: {
        maxWidth: '0.5 * $cardWidth',
        backgroundColor: 'white',
        marginRight:14, 
        paddingHorizontal: '3%',
        paddingVertical: '3%',
        borderRadius: 10,
        alignItems: 'center',
        '@media ios': {
            shadowColor: 'rgba(214,214,214,0.5)',
            shadowOffset: {width:1, height:1},
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
    }
});