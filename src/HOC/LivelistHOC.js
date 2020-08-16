import React, { Component } from 'react';
import LiveList from '../components/List';
import { LIVE_BG_COLOR } from '../config/constants';
import * as DATA from '../config/listData';

export default class LiveListHOC extends Component {
    render() {
        const newProps = {
            type: 'live',
            data: DATA.live,
            bgStyle: {
                backgroundColor: LIVE_BG_COLOR
            }
        }
        return (
            <LiveList {...newProps} />
        )
    }
}
