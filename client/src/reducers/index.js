import { combineReducers } from 'redux';
import desktopReducer from './desktopReducer';
import contextMenuReducer from './contextMenuReducer';
import iconReducer from './iconReducer';
import addingFormReducers from './addingFormReducers';

export default combineReducers({
    desktop: desktopReducer,
    icon: iconReducer,
    adding_form: addingFormReducers,
    context_menu: contextMenuReducer
})