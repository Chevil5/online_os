import {MOVE_DIRECTORY} from '../actions/types';

export default function (state = {}, action){
    switch (action.type) {
        case MOVE_DIRECTORY:
            return action.payload || false;
        default:
            return state;
    }
}