import React, { Component } from 'react';
import { LIVE_BG_COLOR } from '../config/constants';
import { connect } from 'react-redux';
import SearchResultList from '../components/SearchResultList';

class SearchResultsComingHOC extends Component {
    render() {
        const newProps = {
            type: 'coming',
            data: this.props.timefree_data,
            playingRoute: 'PlaySearch',
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
    const { dataRight } = state.search;
    return {
        timefree_data: dataRight,
    }
}
export default connect(mapStateToProps)(SearchResultsComingHOC);