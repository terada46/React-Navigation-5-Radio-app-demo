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
import normailize from '../components/normailizeText';
import { songsList } from '../config/mySongsData';

import getImages from '../../assets/images/getImages';
import { TOPIC_BG_COLOR, BASIC_GRAY } from '../config/constants';
const { width } = Dimensions.get('window');
const imageWidth = width * 0.34;

class MySongsScreen extends Component {
    state = {
        data: songsList
    }
    
    _keyExtractor = (item) => item.id;

    _renderItem = ({item}) => {
        const { title, artist, date_added, time_added, from, id } = item;
        const { cover } = getImages(id);
        return (
            <TouchableOpacity 
                style={styles.touchableContentContainer}
                activeOpacity={0.7}
            >
                <View style={styles.imageCard}>
                    <Image width={imageWidth} source={cover} style={styles.image} /> 
                </View>
                <View style={styles.textView}>
                    <Text numberOfLines={2} style={styles.title}>{title}</Text>
                    <Text style={styles.artist}>{artist}</Text>
                    <Text style={styles.time}>{date_added}</Text>
                    <Text style={styles.time}>{time_added}</Text>
                    <Text numberOfLines={1} style={styles.time}>{from}</Text>
                </View>
            
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <View style={{backgroundColor: TOPIC_BG_COLOR}}>
                <FlatList
                    data={this.state.data}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                    contentContainerStyle={styles.listContentContainer}
                />
            </View>
        )
    }
}

export default MySongsScreen;

const styles = EStyleSheet.create ({
    $cardWidth: 0.9 * width,
    listContentContainer: {
        alignItems: 'center', 
        marginTop: 10, 
        minHeight: '100%',
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
        flex: 3.8,
        backgroundColor: 'white',
        marginRight: 14, 
        paddingHorizontal: '3%',
        paddingVertical: '3%',
        alignItems: 'center',
    },
    textView: {
        flex: 6,
        alignItems:'flex-start',
    },
    title: {
        fontSize: normailize(16), 
        marginBottom: 6,
        fontWeight: '400',
    },
    artist: {
        fontWeight: '300',
        fontSize: normailize(14),
        marginBottom: 4,
    },
    time: {
        fontWeight: '200',
        fontSize: normailize(13),
        color: BASIC_GRAY,
        marginBottom: 6,
    },
    from: {
        fontWeight: '300',
        fontSize: normailize(11),
    },
    buttonsContainer: {
        flexDirection: 'row',
        marginTop: 20,
        paddingHorizontal: 32,
        justifyContent: 'space-between',
        alignItems: 'center'
    }
});