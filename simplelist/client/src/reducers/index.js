import { combineReducers } from 'redux';
import itemReducer from './itemReducer';

export default combineReducers({
  item: itemReducer
  //auth: authReducer //if we have auth reducer
});
