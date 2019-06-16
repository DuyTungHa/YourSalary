import _ from 'lodash';
import {
    FETCH_SESSION,
    FETCH_SESSIONS,
    CREATE_SESSION,
    EDIT_SESSION,
    DELETE_SESSION
} from '../actions/types';

export default (state = {}, action) => {
    switch(action.type){
        case FETCH_SESSIONS:
            return {...state, ..._.mapKeys(action.payload, '_id')};
        case FETCH_SESSION:
            return {...state, [action.payload._id]: action.payload};
        case CREATE_SESSION:
            return {...state, [action.payload._id]: action.payload};
        case EDIT_SESSION:
            return {...state, [action.payload._id]: action.payload};
        case DELETE_SESSION:
            return _.omit(state, action.payload._id);
        default:
            return state;
    }
};