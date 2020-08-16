const initialLocation = {
    text: "東京都",
}

export default function locationReducer(state = initialLocation, action) {
    switch (action.type) {
        case 'SET_LOCATION':
            return Object.assign({}, state, {
                text: action.value
            })
        default: 
            return state
    }
}