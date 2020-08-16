import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
} from 'react-native';
import { EvilIcons, Feather } from '@expo/vector-icons';
import EStyleSheet from 'react-native-extended-stylesheet';
import TextInputLines from '../components/TextInputLines';

import { MAIN_BLUE, TOPIC_BG_COLOR, BASIC_GRAY } from '../config/constants';
import { MenuTitle, LabelText } from '../components/CustomText';
import normailize from '../components/normailizeText';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';
import { deleteItem, editTitle } from '../actions/favoritesAction';

const formSection2 = [
    {
        title: '時刻',
        value: '23:30',
    },
    {
        title: 'プッシュ通知',
        value: '',
    },
    {
        title: '通知タイミング',
        value: '5分前',
    },
    {
        title: '繰り返し',
        value: 'しない'
    }
];

class EditDrawer extends Component {
    state = {
        text: this.props.route.params.title
    }
    
    sectionRenderer = (data) => {
        const { $iconSize } = styles;
        return data.map((item, index) => (
                <TouchableOpacity key={index} style={styles.picker} activeOpacity={0.7}>
                    <View style={styles.left}>
                        <LabelText>{item.title}</LabelText>
                    </View>
                    <View style={styles.rightContainer}>
                        <LabelText>{item.value}</LabelText>
                        <EvilIcons name="chevron-down" size={$iconSize} color={MAIN_BLUE} />
                    </View>   
                </TouchableOpacity>
            )
        );
    }

    deleteAndGoback = id => {
        const { delete_item, navigation } = this.props;
        delete_item(id);
        navigation.goBack();
    }

    saveAndGoBack = id => {
        const { edit_title, navigation } = this.props;
        edit_title(id, this.state.text);
        navigation.goBack();

    }

    render() {
        const { id } = this.props.route.params; 
        const { $iconSize } = styles;
        return (
            <SafeAreaView style={{flex:1, backgroundColor: '#FFF'}}>
                <View style={styles.header}>
                    <MenuTitle style={styles.menu}>編集</MenuTitle>
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
                        <View style={styles.firstSection}>
                            <View style={styles.picker}>
                                <View style={styles.left}>
                                    <LabelText>タイトル</LabelText>
                                </View>
                                <View style={styles.rightContainer}>
                                    <TextInputLines
                                        style={ styles.textInput }
                                        onChangeText={(text) => this.setState({text})}
                                        value={this.state.text}
                                        numberOfLines={3}
                                        autoFocus={false}
                                    />
                                    <Feather name="edit-3" size={$iconSize*0.7} color={MAIN_BLUE} />
                                </View>   
                            </View>
                            <View style={styles.picker}>
                                <View style={styles.left}>
                                    <LabelText>放送局</LabelText>
                                </View>
                                <View style={styles.rightContainer}>
                                    <LabelText>ニッポン放送</LabelText>
                                </View>   
                            </View>
                        </View>
                        <View style={styles.secondSection}>
                            <LabelText>プッシュ通知 設定</LabelText>
                            {this.sectionRenderer(formSection2)}
                        </View>
                    </View>
                    <TouchableOpacity
                        style={styles.bottom}
                        onPress={() => {this.saveAndGoBack(id)}}
                    >
                        <Text style={styles.logout}>保存する</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginTop:20, marginBottom: 50, alignItems:'center'}}
                        onPress={() => {this.deleteAndGoback(id)}}
                    >
                        <Text style={styles.delete}>マイリストから削除</Text>
                    </TouchableOpacity>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        delete_item: id => dispatch(deleteItem(id)),
        edit_title: (id, title) => dispatch(editTitle(id, title))
    }
}

const ConnectEditDrawer = connect(null, mapDispatchToProps)(EditDrawer);

export default function(props) {
    const navigation = useNavigation();
    return <ConnectEditDrawer {...props} navigation={navigation} />;
}

const styles = EStyleSheet.create({
    $closeIconSize: '1.7rem',
    $iconSize: 32,
    $textColor: 'rgb(37,38,39)',
    contentsContainer: {
        marginBottom: 20,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: TOPIC_BG_COLOR,
    },
    defaultTextStyle: {
        fontWeight: '300',
        fontSize: '1.3rem',
        color: '$textColor',
    },
    menu: {
        fontSize: '1.3rem',
    },
    header: {
        width: '100%',
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 33,
    },
    icon: {
        position: 'absolute',
        top: 1,
        right: 15,
    },
    picker: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 30,
    },
    left: {
        flex: 4.5,
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingLeft: '2%',
    },
    rightContainer: {
        flex: 5.5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    right: {
        flex: 0.1,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    firstSection: {
        marginTop: 40,
        width: '90%',
        alignItems: 'center',
    },
    secondSection: {
        marginTop: 40,
        width: '90%',
        alignItems: 'center',
    },
    bottom: {
        marginTop: 30,
        marginBottom: 15,
        width: '100%',
        backgroundColor: '#FFF',
        height: 58,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logout: {
        color: MAIN_BLUE,
        fontSize: normailize(15),
        fontWeight: '500'
    },
    delete: {
        fontSize: normailize(17),
        fontWeight: '500',
        color: '$textColor',
    },
    textInput: {
        flex: 1,
        borderWidth: 0,
        fontSize: normailize(17),
        color: '$textColor',
        paddingLeft: 5,
        paddingRight: 5,
        backgroundColor: TOPIC_BG_COLOR
    },
})