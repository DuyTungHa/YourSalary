import yoursalary from '../apis/yoursalary';
import history from '../history';
import {SIGN_IN, SIGN_OUT, CREATE_SESSION} from './types';

export const signIn = (userId) => {
    return async (dispatch) => {
        const response = await yoursalary.post('/users/signin', { googleId: userId});
        dispatch({type: SIGN_IN, payload: response.data.token});
    }
}

export const signOut = () => {
    return {
        type: SIGN_OUT
    };
};

export const createSession = (formValues) => {
    return async (dispatch, getState) => {
        const {userId} = getState().auth;
        const config = { headers: {'Authorization': 'bearer ' + userId}}
        const response = await yoursalary.post('/sessions', formValues, config);
        dispatch({type: CREATE_SESSION, payload: response.data});
        history.push('/');
    }
}