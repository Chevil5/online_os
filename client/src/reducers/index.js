import { combineReducers } from 'redux';
import desktopReducer from './desktopReducer';
import iconReducer from './iconReducer';

export default combineReducers({
    desktop: desktopReducer,
    icon: iconReducer,
})