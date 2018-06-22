import {FETCH_DESKTOP} from '../actions/types';

export default function (state = null, action){
    switch (action.type) {
        case FETCH_DESKTOP:
            return action.payload || false;
        default:
            return state;
    }
}