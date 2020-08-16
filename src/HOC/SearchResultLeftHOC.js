import React, { Component } from 'react';
import { TIMEFREE_BG_COLOR } from '../config/constants';
import { connect } from 'react-redux';
import SearchResultList from '../components/SearchResultList';

class SearchResultsTimefreeHOC extends Component {
    render() {
        const newProps = {
            type: 'timefree',
            data: this.props.timefree_data,
            playingRoute: 'PlaySearch',
            bgStyle: {
                backgroundColor: TIMEFREE_BG_COLOR
            }
        }
        return (
            <SearchResultList {...newProps} />
        )
    }
}

const mapStateToProps = state => {
    const { dataLeft } = state.search;
    return {
        timefree_data: dataLeft,
    }
}
export default connect(mapStateToProps)(SearchResultsTimefreeHOC);