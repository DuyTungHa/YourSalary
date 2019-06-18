import yoursalary from '../apis/yoursalary';
import history from '../history';
import {SIGN_IN, SIGN_OUT, CREATE_SESSION, FETCH_SESSIONS, FETCH_SESSION, EDIT_SESSION, DELETE_SESSION} from './types';

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

export const fetchSessions = () => async (dispatch, getState) => {
    const {userId} = getState().auth;
    const config = { headers: {'Authorization': 'bearer ' + userId}};
    const response = await yoursalary.get('/sessions', config);
    dispatch({type: FETCH_SESSIONS, payload: response.data});
}

export const fetchSession = (id) => async (dispatch, getState) => {
    const {userId} = getState().auth;
    const config = { headers: {'Authorization': 'bearer ' + userId}};
    try{
        const response = await yoursalary.get(`/sessions/${id}`, config);
        dispatch({type: FETCH_SESSION, payload: response.data});
    } catch(e) {
        history.push('/error');
    }
}

export const editSession = (id, formValues) => async (dispatch, getState) => {
    const {userId} = getState().auth;
    const config = { headers: {'Authorization': 'bearer ' + userId}};
    const response = await yoursalary.put(`/sessions/${id}`, formValues, config);
    dispatch({type: EDIT_SESSION, payload: response.data});
    history.push('/');
}

export const deleteSession = (id) => async (dispatch, getState) => {
    const {userId} = getState().auth;
    const config = { headers: {'Authorization': 'bearer ' + userId}};
    const response = await yoursalary.delete(`/sessions/${id}`, config);
    if(response.status === 200){
        dispatch({type: DELETE_SESSION, payload: id});
        history.push('/');
    }
}