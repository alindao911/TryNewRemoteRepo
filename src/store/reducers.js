import {combineReducers} from 'redux';
import authReducers from './../screens/LoginScreen/store/reducer';
import userReducers from './../screens/HomeScreen/store/reducer';

export default combineReducers({
  auth: authReducers,
  user: userReducers,
});
