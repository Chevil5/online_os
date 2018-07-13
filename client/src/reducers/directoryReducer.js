import {OPEN_DIRECTORY, CLOSE_DIRECTORY} from '../actions/types';

export default function (state = {}, action){
    switch (action.type) {
        case OPEN_DIRECTORY:
            state[action.payload.dir_id] = action.payload;
            return Object.assign({}, state);
        case CLOSE_DIRECTORY:
            delete state[action.payload.dir_id];
            return Object.assign({}, state);
        default:
            return state;
    }
}