import React, { useState, useEffect} from 'react';
import {
        View,
        Text,
        TextInput,
        Dimensions,
        TouchableOpacity,
       } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { MaterialIcons, EvilIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { 
    updateData, 
    UPDATE_DATA_LEFT, 
    UPDATE_DATA_RIGHT
} from '../actions/resultsAction';
import * as DATA from '../config/listData';

import { MAIN_BLUE, SEARCH_BG_COLOR } from '../config/constants';

import normailize from '../components/normailizeText';

const { width } = Dimensions.get('window');
const SELECTED_FONTSIZE = normailize(16.8);
const searchIconSize = 0.08 * width;
const chevronIconSize = 0.082 * width;

const Search = ({ navigation, route, dispatchData }) => {
    const [date, setDate] = useState('すべて');
    const [area, setArea] = useState('全国')
    const [inputtext, updateInputtext] = useState('');
    const [isValidInput, setIsValidInput] = useState(false);

    toFilterScreen = (type, value) => {
        navigation.push('SearchFilter', {
            type,
            value,
        })
    }

    onChangeText = text => {
        let regex = /\S+/;
        let isNonSpace = regex.test(text);
        updateInputtext(text);
        setIsValidInput(isNonSpace);
    }

    useEffect(() => {
        if (route.params?.date) {
            setDate(route.params?.date);
        }
        if (route.params?.area) {
            setArea(route.params?.area);
        } 
    }, [route.params?.date, route.params?.area]);

    dipatchAndNavigate = () => {
        dispatchData(UPDATE_DATA_LEFT, DATA.search_timefree);
        dispatchData(UPDATE_DATA_RIGHT, DATA.search_next);
        navigation.push('SearchResult', { text: inputtext.trim()})
    }


    return (
        <View style={styles.container}>
            <View style={styles.searchSection}>
                <MaterialIcons style={styles.searchIcon} name="search" size={searchIconSize} />
                <TextInput
                    style={styles.textInput}
                    placeholder="番組名・出演者・キーワードで検索する"
                    onChangeText={(text) => onChangeText(text)}
                    value={inputtext}
                    autoCorrect={false}
                    autoCapitalize="none"
                    clearButtonMode="while-editing"
                    underlineColorAndroid="transparent"
                />
            </View>
            <View style={[styles.searchFilterSection, {marginTop:30}]}>
                <Text style={styles.filterText}>日付で絞り込み</Text>
                <TouchableOpacity style={styles.picker}
                    onPress={() => {toFilterScreen('date', date)}}>
                    <Text style={styles.selected}>{date}</Text>
                    <EvilIcons 
                        style={styles.chevronIcon} 
                        name="chevron-down" 
                        size={chevronIconSize} 
                        color={MAIN_BLUE} 
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.searchFilterSection}>
                <Text style={styles.filterText}>エリアで絞り込み</Text>
                <TouchableOpacity style={styles.picker}
                    onPress={()=>{toFilterScreen('area', area)}}>
                    <Text style={styles.selected}>{area}</Text>
                    <EvilIcons 
                        style={styles.chevronIcon} 
                        name="chevron-down" 
                        size={chevronIconSize} 
                        color={MAIN_BLUE} 
                    />
                </TouchableOpacity>
            </View>
            <TouchableOpacity
                style={styles.searchButton}
                disabled={isValidInput === false ? true : false}
                onPress={() => dipatchAndNavigate()}>
                <View>
                    <Text 
                        style={[
                            styles.searchButtonText, 
                            { color: isValidInput === false 
                                ? '#c8c8cd' 
                                : MAIN_BLUE 
                            }
                        ]}
                    >
                        番組を検索する
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
        
    );
}

const mapDispatchToProps = dispatch => {
    return {
        dispatchData: (TYPE, data) => dispatch(updateData(TYPE, data))
    }
}
export default connect(null, mapDispatchToProps)(Search);

const styles = EStyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        paddingTop: '10%',
        alignItems: 'center',
        backgroundColor: SEARCH_BG_COLOR,
    },
    searchSection: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    searchIcon: {
        paddingLeft: '0.6rem',
        paddingRight: '0.6rem',
    },
    textInput: {
        flex: 1,
        borderWidth: 0,
        fontSize: normailize(14),
        paddingTop: '0.9rem',
        paddingBottom: '0.9rem',
        paddingLeft: 3,
        paddingRight: 5,
        backgroundColor: '#FFF'
    },
    searchFilterSection: {
        paddingVertical: '1.5rem',
        width: '93%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    filterText: {
        fontSize: normailize(17),
        flex: 5.3,
    },
    picker: {
        flex: 4.7,
        flexDirection: 'row',
        alignItems: 'center',
    },
    selected: {
        fontSize: SELECTED_FONTSIZE,
        color: MAIN_BLUE
    },
    chevronIcon: {
        position: 'absolute',
        right: '1%'
    },
    searchButton: {
        height: '10%',
        width: '100%',
        position: 'absolute',
        top: '55%',
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center'
    },
    searchButtonText: {
        fontSize: '1.1rem',
    }
});