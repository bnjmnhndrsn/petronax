const SET_DATE = 'SET_DATE'

const initialState = {
    date: null
};

export default function uiReducer (state = initialState, action) {
    switch (action.type) {
        case SET_DATE:
            return Object.assign({}, {date: action.date })
        default:
            return state
    }
}

function setDate(date){
    return { type: SET_DATE, date };
}

export const actions = {
    setDate
};
