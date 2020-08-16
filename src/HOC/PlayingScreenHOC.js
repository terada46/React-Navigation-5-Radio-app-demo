import React, { Component } from 'react';
import { View } from 'react-native';
import { 
    LIVE_BG_COLOR, 
    TIMEFREE_BG_COLOR,
    BASIC_GRAY,
    MAIN_BLUE,
    MAIN_PINK
} from '../config/constants';
import PlayingScreen from '../screens/Playing';
import { HeaderTitleText } from '../components/CustomText';

class PlayingScreenHOC extends Component {
    render() {
        const { type } = this.props.route.params;
        let bgColor = type === 'timefree' ? TIMEFREE_BG_COLOR : LIVE_BG_COLOR;
        let textColor = { color: type === 'timefree' ? MAIN_PINK : MAIN_BLUE };
        let newProps = {
            textColor
        }
        return (
            <View style={{ backgroundColor: bgColor }}>
                <PlayingScreen {...this.props} {...newProps} />
            </View>
        )
    }
}

export default PlayingScreenHOC;