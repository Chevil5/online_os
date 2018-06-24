import * as types from '../actions/types';

export default function (state = null, action){
    switch (action.type) {
        case types.SHOW_CONTEXT_MENU:
            return action.payload || false;
        default:
            return state;
    }
}