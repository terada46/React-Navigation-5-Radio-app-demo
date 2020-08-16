import React, { Component } from 'react';
import {
    View,
    Text,
    FlatList,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { useNavigation } from '@react-navigation/native';

import { topicsData } from '../config/topicsData';
import { TOPIC_BG_COLOR } from '../config/constants';
import normalize from '../components/normailizeText';

const { width, height } = Dimensions.get('window');

class TopicsList extends Component {
    state = {
        data: topicsData
    }

    _keyExtractor = (item) => item.id;

    _renderItem = ({item}) => {
        const { type, date, title, main, source } = item;
        return(
            <TouchableOpacity 
                style={styles.topic}
                onPress={() => this.showTopic(type,date,title,main)}
                >
                <View>
                    <View style={styles.topRow}>
                        <Text style={styles.type}>{type}</Text>
                        <Text>{date}</Text>
                    </View>
                    <Text style={styles.title}>{title}</Text>
                </View>
                <Text style={styles.source}>{source}</Text>
            </TouchableOpacity>
        )
    }

    showTopic(type, date, title, main) {
        const { navigation } = this.props;
        navigation.push('Topic', {
            type,
            date,
            main,
            title
        })
    }

    render() {
        return (
            <View style={styles.wrapper}>
                <FlatList
                    data={this.state.data}
                    renderItem={this._renderItem}
                    keyExtractor={this._keyExtractor}
                    contentContainerStyle={styles.container}
                />
            </View>
        )
    }
}

export default function(props) {
    const navigation = useNavigation();
    return <TopicsList {...props} navigation={navigation} />;
}

const styles = EStyleSheet.create({
    $width: width,
    $height: height,
    $topicWidth: '0.94 * $width',
    wrapper: {
        backgroundColor: TOPIC_BG_COLOR
    },
    container: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: '$height',
        backgroundColor: '#fafbfc',
    },
    topic: {
        width: '$topicWidth',
        height: '0.20 * $height',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginTop: '0.03 * $height',
        padding: '3% 3% 0 3%',
        backgroundColor: '#FFF',
        '@media ios': {
            shadowColor: 'rgba(214,214,214,0.5)',
            shadowOffset: {width:1, height:1},
            shadowOpacity: 1,
            shadowRadius: 3,
        },
    },
    topRow: {
        width: '0.94 * $topicWidth', 
        flexDirection: 'row',
        justifyContent:'space-between',
    },
    type: {
        fontSize: '0.9rem'
    },
    title: {
        fontSize: normalize(15),
        lineHeight: normalize(17),
        marginTop: '0.02 * $height',
    },
    source: {
        fontSize: '0.9rem',
        marginBottom: '0.016 * $height',
    },
});