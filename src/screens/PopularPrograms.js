import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Dimensions,
    ScrollView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BASIC_GRAY, TIMEFREE_BG_COLOR } from '../config/constants';
import EStyleSheet from 'react-native-extended-stylesheet';
import { EvilIcons } from '@expo/vector-icons';
import * as DATA from '../config/listData';
import RenderList from '../components/RenderList';
import normailize from '../components/normailizeText';

const { width } = Dimensions.get('window');

class PopularProgramsScreen extends Component{
    state = {
        section_1: DATA.topTimefree.slice(0, 3),
        section_2: DATA.topLive.slice(0, 3),
    }

    render() {
        const { navigation } = this.props;
        const route = 'Play_from_home';
        const timefreeList = this.state.section_1.map(item => 
            RenderList(item, route, navigation
        ));
        const liveList = this.state.section_2.map(item => 
            RenderList(item, route, navigation
        ));
        return (
            <View style={{flex:1, backgroundColor: TIMEFREE_BG_COLOR}}>
                <ScrollView contentContainerStyle={styles.container}>
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>タイムフリーの人気番組</Text>
                        <Text style={styles.sectionDescription}>過去1週間、よく聴かれた番組をピックアップしてご紹介！</Text>
                        {timefreeList}
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => navigation.push('PopularTimefree')}
                        >
                            <Text style={styles.more}>もっと見る</Text>
                            <EvilIcons 
                                name="chevron-right" 
                                size={32} 
                                color={BASIC_GRAY} 
                                style={styles.icon}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>ライブの人気番組</Text>
                        <Text style={styles.sectionDescription}>生で聴くのがラジオの醍醐味。聴取予約もおすすめです！</Text>
                        {liveList}
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => navigation.push('PopularLive')}
                        >
                            <Text style={styles.more}>もっと見る</Text>
                            <EvilIcons 
                                name="chevron-right" 
                                size={32} 
                                color={BASIC_GRAY} 
                                style={styles.icon}
                            />
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

export default function(props) {
    const navigation = useNavigation();
    return <PopularProgramsScreen {...props} navigation={navigation} />
}

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
        paddingTop: 22,
        paddingHorizontal: 14,
        marginBottom: 20,
        backgroundColor: 'white'
    },
    sectionTitle: {
        fontSize: normailize(17),
        marginBottom: 11,
        fontWeight: '300'
    },
    sectionDescription: {
        fontSize: normailize(12),
        marginBottom: 5,
        lineHeight: normailize(15)
    },
    more: {
        fontSize: '1rem',
        fontWeight: '500',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 8,
        paddingVertical: 14,
    },
    icon: {
        position: 'absolute',
        right: 10,
    },
})