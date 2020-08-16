import { 
    UPDATE_DATA_LEFT,
    UPDATE_DATA_RIGHT,
    UPDATE_LEFT_LENGTH,
    UPDATE_RIGHT_LENGTH
 } from '../actions/resultsAction';

const initialState = {
    dataLeft: [],
    dataRight: [],
    dataLeft_length: 0,
    dataRight_length: 0,
}

export default function SearchResultsReducer(state = initialState, action) {
    switch(action.type) {
        case UPDATE_DATA_LEFT:
            return Object.assign({}, state, {dataLeft: [].concat(action.payload)});
        case UPDATE_DATA_RIGHT:
            return Object.assign({}, state, {dataRight: [].concat(action.payload)});
        case UPDATE_LEFT_LENGTH:
            return Object.assign({}, state, {dataLeft_length: action.value});
        case UPDATE_RIGHT_LENGTH:
            return Object.assign({}, state, {dataRight_length: action.value});
        default:
            return state;
    }
}