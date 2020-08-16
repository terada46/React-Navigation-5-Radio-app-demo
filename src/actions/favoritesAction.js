export const ADD_ITEM = 'ADD_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';
export const EDIT_TITLE = 'EDIT_TITLE';
export const TOGGLE_NOTIFICATION = 'TOGGLE_NOTIFICATION';

export function addItem(obj) {
    return {
        type: ADD_ITEM,
        payload: obj
    }
}

export function deleteItem(id) {
    return {
        type: DELETE_ITEM,
        id
    }
}

export function editTitle(id, title) {
    return {
        type: EDIT_TITLE,
        id,
        title
    }
}

export function toggleNotification(id) {
    return {
        type: TOGGLE_NOTIFICATION,
        id
    }
}