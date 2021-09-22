import {combineReducers} from 'redux';
import drawerReducer from './drawer';
import errorReducer from './error';

export default combineReducers(
    {
        drawer: drawerReducer,
        error: errorReducer,
    }
);