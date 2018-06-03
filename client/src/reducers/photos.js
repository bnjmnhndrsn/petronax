import API from '../api';

const ADD_PHOTOS = 'ADD_PHOTOS'

export default function photosReducer (state = {}, action) {
    switch (action.type) {
        case ADD_PHOTOS:
            return Object.assign({}, state, {[action.date]: action.photos })
        default:
            return state
    }
}

function addPhotos(date, photos){
    return { type: ADD_PHOTOS, date, photos }
}

export const actions = {
    addPhotos
}

function fetchPhotos (date) {
    return dispatch => {
        return API.getPhotos(date).then(function({data}){
            return dispatch(addPhotos(date, data));
        });
    };
}

export const asyncActions = {
    fetchPhotos
};
