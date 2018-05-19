import { combineReducers } from 'redux'
import photos from './photos'
import ui from './ui';

export default combineReducers({
    photos,
    ui
});
