import React, { Component } from 'react';
import { TouchableOpacity, Animated } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import TabBar from 'react-native-underline-tabbar';
import EStyleSheet from 'react-native-extended-stylesheet';
import { MAIN_BLUE, TIMEFREE_BG_COLOR } from '../config/constants';

import TimefreeList from '../components/TimefreeList';

import * as DATA from '../config/TimefreeData';
import * as IMAGES from '../../assets/images/images';

const styles = EStyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: TIMEFREE_BG_COLOR,
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },
    instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
      fontSize: 28,
    },
    tabBarStyle: { 
      backgroundColor: '#FFF', 
      marginTop:0, 
      paddingBottom: 7, 
      borderTopColor: '#d2d2d2', 
      borderTopWidth:0 
    }
});

const Tab = ({ tab, page, onPressHandler, onTabLayout, styles }) => {
    const { icon } = tab;
    const style = {
      marginHorizontal: 12,
      paddingVertical: 8,
    };
    const containerStyle = {
      paddingHorizontal: 4,
      paddingVertical: 0,
      borderRadius: 0,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: styles.backgroundColor,
      opacity: styles.opacity,
      transform: [{ scale: styles.opacity }],
    };
    const iconStyle = {
      tintColor: styles.textColor,
      resizeMode: 'cover',
      width: 84,
      height: 34,
      
    };
    return (
      <TouchableOpacity style={style} onPress={onPressHandler} onLayout={onTabLayout} key={page}>
        <Animated.View style={containerStyle}>
          <Animated.Image style={iconStyle} source={icon} />
        </Animated.View>
      </TouchableOpacity>
    );
};

const iconsSet = {
    jqr: require('../../assets/images/stations/logo_medium_jqr.png'),
    tbs: require('../../assets/images/stations/logo_medium_tbs.png'),
    lfr: require('../../assets/images/stations/logo_medium_lfr.png'),
    tfm: require('../../assets/images/stations/logo_medium_tfm.png'),
    jwave: require('../../assets/images/stations/logo_medium_jwave.png'),
    nack5: require('../../assets/images/stations/logo_medium_nack5.png'),
};

  

class TimefreeTabsView extends Component {
    _scrollX = new Animated.Value(0);
  
    interpolators = Array.from({ length: 6 }, (_, i) => i).map(idx => ({
        scale: this._scrollX.interpolate({
            inputRange: [idx - 1, idx, idx + 1],
            outputRange: [1, 1.7, 1],
            extrapolate: 'clamp',
        }),
        opacity: this._scrollX.interpolate({
            inputRange: [idx - 1, idx, idx + 1],
            outputRange: [0.8, 1, 0.8],
            extrapolate: 'clamp',
        }),
        /* backgroundColor: this._scrollX.interpolate({
            inputRange: [idx - 1, idx, idx + 1],
            outputRange: ['rgba(0,0,0,0.1)', '#000', 'rgba(0,0,0,0.1)'],
            extrapolate: 'clamp',
        }), */
    }));
    render() {
        return( 
          <ScrollableTabView
              initialPage={0}
              renderTabBar={() => (
                  <TabBar 
                      underlineColor={MAIN_BLUE}
                      underlineHeight={3}
                      tabBarStyle={styles.tabBarStyle}
                      renderTab={(tab, page, isTabActive, onPressHandler, onTabLayout) => (
                          <Tab
                              key={page}
                              tab={tab}
                              page={page}
                              isTabActive={isTabActive}
                              onPressHandler={onPressHandler}
                              onTabLayout={onTabLayout}
                              styles={this.interpolators[page]}
                          />
                      )}
                  />
              )}         
              onScroll={(x) => this._scrollX.setValue(x)}            
          >
              <TimefreeList tabLabel={{icon: iconsSet.jqr}} data={DATA.joqr} images={IMAGES.joqr} />
              <TimefreeList tabLabel={{icon: iconsSet.tbs}} data={DATA.tbs} images={IMAGES.tbs} />
              <TimefreeList tabLabel={{icon: iconsSet.lfr}} data={DATA.lfr} images={IMAGES.lfr} />
              <TimefreeList tabLabel={{icon: iconsSet.tfm}} data={DATA.tfm} images={IMAGES.tfm} />
              <TimefreeList tabLabel={{icon: iconsSet.jwave}} data={DATA.jwave} images={IMAGES.jwave} />
              <TimefreeList tabLabel={{icon: iconsSet.nack5}} data={DATA.nack5} images={IMAGES.nack5} />
          </ScrollableTabView>  
        );
    }
}

export default TimefreeTabsView;