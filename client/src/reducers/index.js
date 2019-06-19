import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import authReducer from './authReducer';
import sessionsReducer from './sessionsReducer';
import profileReducer from './profileReducer';

export default combineReducers({
    auth: authReducer,
    form: formReducer,
    sessions: sessionsReducer,
    profile: profileReducer
});