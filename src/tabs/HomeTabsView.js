import React, { Component } from 'react';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import CustomTabBar from '../components/CustomTabBar_Live';

import LiveListHOC from '../HOC/LivelistHOC';
import RecomListHOC from '../HOC/RecomListHOC';
import TopicsList from '../screens/TopicsList';
import PopularPrograms from '../screens/PopularPrograms';

class HomeTabView extends Component {
    render() {
        return(
            <ScrollableTabView
                initialPage={0}
                renderTabBar={() =><CustomTabBar />}                     
                scrollWithoutAnimation={true}
            >
                <LiveListHOC tabLabel='ライブ' />
                <RecomListHOC tabLabel='あなたへ' />
                <TopicsList tabLabel='トッピクス' />
                <PopularPrograms tabLabel='人気番組' />
            </ScrollableTabView>
        );
    }
}

export default HomeTabView;