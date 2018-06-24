import axios from 'axios';
import * as types from './types';

export const fetchDesktop = (user_id) => async dispatch => {
    const res = await axios.get('/desktop?userId='+user_id);
    dispatch({type: types.FETCH_DESKTOP, payload: res.data});
};

export const moveIconFrom = (icon_id) => async dispatch =>{
    dispatch({type: types.MOVE_FROM, payload: icon_id});
};

export const updateIconNumber= (user_id, icon_id, new_number) => async dispatch => {
    const res = await axios.get('/desktop/update_icon_number?user_id='+user_id + '&icon_id='+icon_id+'&new_number='+new_number);
    dispatch({type: types.FETCH_DESKTOP, payload: res.data});
};

export const createIcon = (user_id, icon, number) => async dispatch => {
    const res = await axios.post('/desktop/icon/add?user_id='+user_id + '&icon='+icon+'&number='+number);
    dispatch({type: types.FETCH_DESKTOP, payload: res.data});
};
export const deleteIcon = (user_id, icon_id) => async dispatch => {
    const res = await axios.post('/desktop/icon/delete?user_id='+user_id + '&icon_id='+icon_id);
    dispatch({type: types.FETCH_DESKTOP, payload: res.data});
};

export const showAddingForm = (status, number) => dispatch => {
    dispatch({type: types.SHOW_ADDING_FORM, payload: {status, number}})
};
export const showContextMenu = (number) => dispatch => {
    dispatch({type: types.SHOW_CONTEXT_MENU, payload: number})
};

