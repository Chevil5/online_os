import {MOVE_FROM} from '../actions/types';

export default function (state = null, action){
    switch (action.type) {
        case MOVE_FROM:
            return action.payload || false;
        default:
            return state;
    }
}