import React, { Component } from 'react';
import {
    Text,
    View,
    Dimensions,
    ScrollView
} from 'react-native';
import { TIMEFREE_BG_COLOR } from '../config/constants';
import EStyleSheet from 'react-native-extended-stylesheet';
import * as DATA from '../config/listData';
import RenderList from '../components/RenderList';
import Image from 'react-native-scalable-image';

const { width } = Dimensions.get('window');
const iconWidth = 0.08 * width;

class PopularLiveScreen extends Component{
    state = {
        live: DATA.topLive,
        otherArea: DATA.otherArea,
    }

    render() {
        const { navigation } = this.props;
        const route = 'Play_from_home';
        const topLiveList = this.state.live.map(item => 
            RenderList(item, route, navigation
        ));
        const otherAreaList = this.state.otherArea.map(item => 
            RenderList(item, route, navigation
        ));
        return (
            <View style={{flex:1, backgroundColor: TIMEFREE_BG_COLOR}}>
                <ScrollView contentContainerStyle={styles.container}>
                    <View style={styles.section}>
                        <Text style={styles.sectionDescription}>生で聴くのがラジオの醍醐味。聴取予約もおすすめです！</Text>
                        {topLiveList}
                        <View style={styles.titleContainer}>
                            <Image width={iconWidth} source={require('../../assets/premium.png')} />
                            <View style={styles.textRow}>
                                <Text style={styles.sectionTitle}>
                                    他エリアの番組
                                </Text>
                                <Text style={styles.sectionDescription}>
                                    プレミアム会員になると、全国の番組を楽しめる！
                                </Text>
                            </View>
                        </View>
                        {otherAreaList}
                    </View>
                </ScrollView>
            </View>
        )
    }
}

export default PopularLiveScreen;

const styles = EStyleSheet.create({
    $cardWidth: width,
    $sectionWidth: '0.93 * $cardWidth',
    container: {
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingTop: 20,
        width: '100%',
        backgroundColor: TIMEFREE_BG_COLOR
    },
    section: {
        width: '$sectionWidth',
        paddingTop: 27,
        paddingBottom: 30,
        paddingHorizontal: 14,
        marginBottom: 20,
        backgroundColor: 'white'
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 50,
    },
    textRow: {
        alignItems: 'flex-start',
        marginLeft: 7
    },
    sectionTitle: {
        fontSize: '1.2rem',
        fontWeight: '300'
    },
    sectionDescription: {
        fontSize: '0.9rem',
        marginTop: 5,
        marginBottom: 5,
    },
})