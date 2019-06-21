import {
    FETCH_PROFILE, 
    EDIT_PROFILE, 
    ADD_SALARY, 
    SUBT_SALARY, 
    SIGN_OUT,
    RESET_SALARY
} from '../actions/types';

export default (state = {}, action) => {
    switch(action.type){
        case FETCH_PROFILE: 
            return {...state, ...action.payload};
        case EDIT_PROFILE: case ADD_SALARY: case SUBT_SALARY: case RESET_SALARY:
            return {...state, ...action.payload};
        case SIGN_OUT:
            return {};
        default:
            return state;
    }
};