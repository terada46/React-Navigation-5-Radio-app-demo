import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    SafeAreaView
} from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
import EStyleSheet from 'react-native-extended-stylesheet';
import { MAIN_BLUE, TOPIC_BG_COLOR, BASIC_GRAY } from '../config/constants';
import { MenuTitle, LabelText} from '../components/CustomText';


export default class MenuDrawer extends Component {
    state = {
        section_1: [
            {
                title: 'バッファ時間',
                value: '15秒'
            },
            {
                title: 'オフタイマー',
                value: 'オフ'
            },
            {
                title: '選局',
                value: null 
            }
        ],
        section_2: [
            'お知らせ',
            'ラジコの楽しみ方',
            'ヘルプ',
            'アプリ情報',
            'プライバシーポリシー',
            'インフォマティブデータに関するポリシー',
            '利用規約'
        ]
    }
    
    FirstSectionRenderer = (data) => {
        return data.map((item, index) => (
                <TouchableOpacity key={index} style={styles.picker} activeOpacity={0.7}>
                    <View style={styles.left}>
                        <LabelText>{item.title}</LabelText>
                    </View>
                    <View style={styles.rightContainer}>
                        <LabelText>{item.value}</LabelText>
                        <EvilIcons name="chevron-right" size={30} color={MAIN_BLUE} />
                    </View>   
                </TouchableOpacity>
            )
        );
    }

    SecondSectionRenderer = (data) => {
        return data.map((item, index) => (
                <TouchableOpacity key={index} style={styles.picker} activeOpacity={0.7}>
                    <View style={styles.left}>
                        <LabelText>{item}</LabelText>
                    </View>
                    <View style={styles.right}>
                    <EvilIcons 
                        name={index === 2 ? "external-link" : "chevron-right"} 
                        size={30} 
                        color={MAIN_BLUE} />
                    </View>
                </TouchableOpacity>
            )
        )
    }

    render() {
        return (
            <SafeAreaView style={{flex:1, backgroundColor: '#FFF'}}>
                <View style={styles.header}>
                    <MenuTitle style={styles.menu}>メニュー</MenuTitle>
                    <TouchableOpacity 
                        style={styles.icon} 
                        onPress={()=> this.props.navigation.goBack()}
                    >
                        <EvilIcons 
                            name="close" 
                            size={styles.$closeIconSize} 
                            color={BASIC_GRAY}
                        />
                    </TouchableOpacity>
                </View>
                <ScrollView style={{backgroundColor: TOPIC_BG_COLOR}}>
                    <View style={styles.contentsContainer}>
                        <View style={styles.tool}>
                            <MenuTitle>ツール</MenuTitle>
                            {this.FirstSectionRenderer(this.state.section_1)}
                        </View>
                        <View style={styles.other}>
                            <MenuTitle>その他</MenuTitle>
                            {this.SecondSectionRenderer(this.state.section_2)}
                        </View>
                    </View>
                    <View style={styles.bottom}>
                        <TouchableOpacity>
                            <Text style={styles.logout}>ログアウト</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

const styles = EStyleSheet.create({
    $closeIconSize: '1.7rem',
    contentsContainer: {
        marginBottom: 20,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: TOPIC_BG_COLOR,
    },
    // menu: {
    //     position: 'absolute',
    //     top: 0
    // },
    header: {
        width: '100%',
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 33,
    },
    text: {

    }, 
    icon: {
        position: 'absolute',
        top: 1,
        right: 15,
    },
    left: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingLeft: '2%',
    },
    rightContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    right: {
        flex: 0.1,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    tool: {
        marginTop: 40,
        width: '90%',
        alignItems: 'center',
    },
    other: {
        marginTop: 40,
        width: '90%',
        alignItems: 'center',
    },
    picker: {
        flexDirection: 'row',
        marginTop: 30,
    },
    bottom: {
        marginTop: 30,
        marginBottom: 30,
        width: '100%',
        backgroundColor: '#FFF',
        height: 58,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logout: {
        color: MAIN_BLUE,
        fontSize: '1.2rem',
        fontWeight: '500'
    }
})