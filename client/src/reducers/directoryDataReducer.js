import {FETCH_DIRECTORY} from '../actions/types';

export default function (state = null, action){
    switch (action.type) {
        case FETCH_DIRECTORY:
            return action.payload || false;
        default:
            return state;
    }
}