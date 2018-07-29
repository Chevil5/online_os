import * as types from '../actions/types';

export default function (state = null, action){
    switch (action.type) {
        case types.CHECK_BACKGROUND:
            return action.payload || false;
        default:
            return state;
    }
}
