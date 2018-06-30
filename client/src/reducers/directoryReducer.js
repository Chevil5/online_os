import {OPEN_DIRECTORY} from '../actions/types';

export default function (state = null, action){
    switch (action.type) {
        case OPEN_DIRECTORY:
            action.payload.open_dir = true;
            return action.payload || false;
        default:
            return state;
    }
}