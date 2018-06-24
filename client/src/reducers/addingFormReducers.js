import {SHOW_ADDING_FORM} from '../actions/types';

export default function (state = null, action){
    switch (action.type) {
        case SHOW_ADDING_FORM:
            return action.payload || false;
        default:
            return state;
    }
}