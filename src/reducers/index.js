import dataReducer from './dataReducer';
import { combineReducers } from 'redux';

const mainReducers = combineReducers({
    data: dataReducer,
})

export default mainReducers;