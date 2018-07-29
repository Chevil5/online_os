import { combineReducers } from 'redux';
import desktopReducer from './desktopReducer';
import contextMenuReducer from './contextMenuReducer';
import iconReducer from './iconReducer';
import addingFormReducers from './addingFormReducers';
import directoryReducers from './directoryReducer';
import directoryDataReducers from './directoryDataReducer';
import directoryDnd from './directoryDnd';
import userReducer from './userReducer';
import backgroundReducer from './backgroundReducer';

export default combineReducers({
    desktop: desktopReducer,
    icon: iconReducer,
    adding_form: addingFormReducers,
    context_menu: contextMenuReducer,
    directories: directoryReducers,
    directory_data: directoryDataReducers,
    directory_dnd: directoryDnd,
    user: userReducer,
    background: backgroundReducer,
})