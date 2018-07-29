import {SHOW_ADDING_FORM, SHOW_EDITING_FORM, SHOW_CHANGING_BACKGROUNG_FORM} from '../actions/types';

export default function (state = null, action){
    switch (action.type) {
        case SHOW_ADDING_FORM:
            return action.payload || false;
        case SHOW_EDITING_FORM:
            return action.payload || false;
        case SHOW_CHANGING_BACKGROUNG_FORM:
            return action.payload || false;
        default:
            return state;
    }
}