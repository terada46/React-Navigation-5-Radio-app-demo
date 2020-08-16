import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SimpleLineIcons, EvilIcons } from '@expo/vector-icons';
import { MAIN_BLUE } from '../config/constants';
import EStyleSheet from 'react-native-extended-stylesheet';
import { connect } from 'react-redux';

const HeaderLeft = ({ navigation, location }) => (
    <TouchableOpacity activeOpacity={0.7}
        onPress={()=> navigation.navigate('Left')}
        >
        <View style={styles.container}>
            <SimpleLineIcons 
                name="location-pin" 
                size={styles.$locationIconSize}
                color={MAIN_BLUE} 
            />
            <View style={styles.rightColumn}>
                <Text style={styles.free}>エリアフリー</Text>
                <View style={styles.erea}>
                    <Text style={styles.ereaText}>{location}</Text>
                    <EvilIcons 
                        name="chevron-down" 
                        size={styles.$chevronDownIconSize} 
                        color={MAIN_BLUE}
                    />
                </View>
            </View>
        </View>
    </TouchableOpacity>
)

const mapStateToProps = state => {
    return { location: state.location.text }
};

export default connect(mapStateToProps)(HeaderLeft);

const styles = EStyleSheet.create({
    $locationIconSize: '1.67rem',
    $chevronDownIconSize: '1.4rem',
    container: {
        flexDirection: 'row',
    },
    rightColumn: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    erea: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    free: {
        fontSize: '0.68rem',
        color: MAIN_BLUE,
    },
    ereaText: {
        fontSize: '0.8rem',
        marginRight: 9,
        color: MAIN_BLUE,
    }
})