export const UPDATE_DATA_LEFT = 'UPDATE_DATA_LEFT';
export const UPDATE_DATA_RIGHT = 'UPDATE_DATA_RIGHT';

export const UPDATE_LEFT_LENGTH = 'UPDATE_LEFT_LENGTH';
export const UPDATE_RIGHT_LENGTH = 'UPDATE_RIGHT_LENGTH';

export function updateData(TYPE, data) {
    return {
        type: TYPE,
        payload: data
    }
}

export function updateLength(TYPE, num) {
    return {
        type: TYPE,
        value: num
    }
}