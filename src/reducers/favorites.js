import { 
    ADD_ITEM, 
    DELETE_ITEM, 
    TOGGLE_NOTIFICATION, 
    EDIT_TITLE,
} from '../actions/favoritesAction';
 
const initialList = [
    {
        title: 'A&Gリクエストアワー 阿澄佳奈のキミまち！',
        onAirTime: '19:00 - 21:00',
        onAirDate: '2019/8/3(土)',
        id: 'joqr_2',
        notification: false
    }
]

export default function favoritesReducer(state = initialList, action) {
    switch (action.type) {
        case ADD_ITEM:
            const LIST = state.filter(item => item.id !== action.payload.id);
            return [...LIST, Object.assign({}, action.payload)];
        case TOGGLE_NOTIFICATION:
            return state.map(item => 
                item.id === action.id ? {...item, notification: !item.notification} : item
            )
        case DELETE_ITEM:
            return state.filter(item => item.id !== action.id);
        case EDIT_TITLE: 
            return state.map(item =>
                item.id === action.id ? {...item, title: action.title} : item
            )
        default:
            return state
    }
}