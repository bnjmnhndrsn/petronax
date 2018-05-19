import API from '../api';

const SET_YEAR = 'SET_YEAR'
const TOGGLE_ERROR = 'TOGGLE_ERROR'

const initialState = {
    year: '',
    showError: false
};

export default function photosReducer (state = {}, action) {
    switch (action.type) {
        case SET_YEAR:
            return Object.assign({}, {year: action.year })
        case TOGGLE_ERROR:
            return Object.assign({}, {showError: action.toggle })
        default:
            return state
    }
}

function setYear(year){
    return { type: SET_YEAR, year };
}

function toggleError(toggle){
    return { type: TOGGLE_ERROR, toggle };
}

export const actions = {
    setYear,
    toggleError
};
