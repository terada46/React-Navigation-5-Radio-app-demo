import React, { Component } from 'react';
import { LIVE_BG_COLOR } from '../config/constants';
import { connect } from 'react-redux';
import SearchResultList from '../components/SearchResultList';

class MyListResultstComingHOC extends Component {
    render() {
        const newProps = {
            type: 'coming',
            data: this.props.coming_data,
            playingRoute: 'PlaySubscribed',
            bgStyle: {
                backgroundColor: LIVE_BG_COLOR
            }
        }
        return (
            <SearchResultList {...newProps} />
        )
    }
}

const mapStateToProps = state => {
    const { dataRight } = state.mylist;
    return {
        coming_data: dataRight,
    }
}
export default connect(mapStateToProps)(MyListResultstComingHOC);