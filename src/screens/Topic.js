import React, { Component } from 'react';
import { View, Text } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import normailize from '../components/normailizeText';

class TopicScreen extends Component {
    state = {
        data: Object.assign({}, this.props.route.params),
    }

    render() {
        const { type, title, main, date } = this.state.data;
        return (
            <View style={ styles.container }>
                <View style={ styles.topic}>
                    <View style={ styles.topRow }>
                        <Text style={styles.type}>{type}</Text>
                        <Text style={styles.type}>{date}</Text>
                    </View>
                    <Text style={ styles.title }>{title}</Text>
                    <Text style={ styles.main}>{main}</Text>
                </View>
            </View>
        )
    }
}

export default TopicScreen;

const styles = EStyleSheet.create({
    $topRowText: normailize(13),
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: '100%',
        backgroundColor: '#fafbfc',
    },
    topic: {
        width: '91%',
        marginTop: '8%',
        padding: '4%',
        backgroundColor: '#FFF',
        shadowColor: 'rgba(214,214,214,0.5)',
        shadowOffset: {width:2, height:2},
        shadowOpacity: 1,
        shadowRadius: 3,
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    type: {
        fontSize: '$topRowText',
    },
    date: {
        fontSize: '$topRowText',
    },
    title: {
        fontSize: normailize(14),
        marginTop: '8%',
        fontFamily: 'HiraginoSans-W3',
    },
    main: {
        fontSize: normailize(12),
        marginTop: '5%',
        fontFamily: 'HiraginoSans-W3',
    }
});