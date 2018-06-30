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

export const createIcon = (user_id, data, number, dir_id, icon_type) => async dispatch => {
    let main_data = "";
    if(icon_type === 0){
        main_data = '&link='+data;
    } else {
        main_data = '&name='+data;
    }
    const res = await axios.post('/desktop/icon/add?user_id='+user_id + main_data +'&number='+number+'&dir_id='+dir_id+'&type='+icon_type);
    dispatch({type: types.FETCH_DESKTOP, payload: res.data});
};
export const editIcon = (user_id, item) => async dispatch => {
    const res = await axios.post('/desktop/icon/edit?user_id='+user_id + '&id='+item._id+'&name='+item.name + '&link='+item.link);
    dispatch({type: types.FETCH_DESKTOP, payload: res.data});
};
export const deleteIcon = (user_id, icon_id) => async dispatch => {
    const res = await axios.post('/desktop/icon/delete?user_id='+user_id + '&icon_id='+icon_id);
    dispatch({type: types.FETCH_DESKTOP, payload: res.data});
};

export const showAddingForm = (status, info) => dispatch => {
    dispatch({type: types.SHOW_ADDING_FORM, payload: {status, info}})
};

export const showEditingForm = (status, info) => dispatch => {
    dispatch({type: types.SHOW_EDITING_FORM, payload: {status, info}})
};
export const showContextMenu = (number) => dispatch => {
    dispatch({type: types.SHOW_CONTEXT_MENU, payload: number})
};

export const openDirectory = (data) => dispatch => {
    dispatch({type: types.OPEN_DIRECTORY, payload: data})
};

