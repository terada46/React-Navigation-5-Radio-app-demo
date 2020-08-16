import React from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import { MAIN_PINK } from '../config/constants';
import EStyleSheet from 'react-native-extended-stylesheet';
import Image from 'react-native-scalable-image';
import getImages from '../../assets/images/getImages';

const { width, height } = Dimensions.get('window');
const coverWidth = width * 0.34;
const stationHeight = 0.1 * height;

const RenderList = (item, route, navigation) => {
    const { id, title, onAirTime, onAirDate } = item;
    const { cover, station } = getImages(id);
    return (
        <TouchableOpacity 
            style={styles.touchableContentContainer}
            key={id}
            onPress={() => navigation.navigate(route, 
                Object.assign(item, {type: 'timefree'})
            )}
        >
            <View style={styles.imageCard}>
                <Image width={stationHeight} source={station} style={styles.image} />
                <Image width={coverWidth} source={cover} style={styles.image} /> 
            </View>
            <View style={styles.textView}>
                <Text numberOfLines={2} style={ styles.title }>{title}</Text>
                <Text style={styles.time}>{onAirDate}</Text>
                <Text style={styles.time}>{onAirTime}</Text>
            </View>
        </TouchableOpacity>
    ) 
}

export default RenderList;

const styles = EStyleSheet.create({
    $cardWidth: width,
    $sectionWidth: '0.93 * $cardWidth',
    touchableContentContainer: {
        width: '0.94 * $sectionWidth', 
        marginVertical:10, 
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
        fontSize:'1.14rem', 
        marginBottom:6,
        fontWeight: '300',
    },
    time: {
        fontWeight: '400',
        fontSize: '1.1rem',
        color: MAIN_PINK,
    },
})