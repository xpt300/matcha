import * as actionTypes from '../actions/actionTypes';

const initialState = {
    state: {
        longitude: null,
        latitude: null,
        distance: 50,
        min_age: 25,
        max_age: 35,
        genre: '',
        target: ''
    }
}

const reglage = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.NEW_ADRESS_XY:
            return {
                ...state
            }
        case actionTypes.RECHERCHE:
            return {
                ...state
            }
        default:
            return state;
    }
}

export default reglage;