import {AUTH_LOGIN_SUCCESS, AUTH_LOGIN_ERROR} from './action-types';

const initialState = {
  isLogin: false,
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case AUTH_LOGIN_SUCCESS:
      return {
        ...state,
        isLogin: true,
      };
    case AUTH_LOGIN_ERROR:
      return {
        ...state,
        isLogin: false,
      };
    default:
      return state;
  }
};
