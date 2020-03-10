import {AUTH_LOGIN_SUCCESS, AUTH_LOGIN_ERROR} from './action-types';

export const authLoginSuccess = () => ({
  type: AUTH_LOGIN_SUCCESS,
});

export const authLoginError = () => ({
  type: AUTH_LOGIN_ERROR,
});
