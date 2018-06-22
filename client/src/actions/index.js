import axios from 'axios';
import {FETCH_DESKTOP} from './types';
import {MOVE_FROM} from './types';

export const fetchDesktop = (user_id) => async dispatch => {
    const res = await axios.get('/desktop?userId='+user_id);
    dispatch({type: FETCH_DESKTOP, payload: res.data});
};

export const moveIconFrom = (icon_id) => async dispatch =>{
    dispatch({type: MOVE_FROM, payload: icon_id});
};

export const updateIconNumber= (user_id, icon_id, new_number) => async dispatch => {
    const res = await axios.get('/desktop/update_icon_number?user_id='+user_id + '&icon_id='+icon_id+'&new_number='+new_number);
    dispatch({type: FETCH_DESKTOP, payload: res.data});
};
