import React, { Component } from 'react';
import List from '../components/List';
import { TIMEFREE_BG_COLOR } from '../config/constants';
import * as DATA from '../config/listData';

export default class RecomListHOC extends Component {
    render() {
        const newProps = {
            type: 'timefree',
            data: DATA.recom,
            bgStyle: {
                backgroundColor: TIMEFREE_BG_COLOR
            }
        }
        return (
            <List {...newProps} />
        )
    }
}
