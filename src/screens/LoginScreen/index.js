import {connect} from 'react-redux';
import {authLoginSuccess, authLoginError} from './store/actions';
import Screen from './Screen';

const mapStateToProps = state => ({
  isLogin: state.auth.isLogin,
});

const mapDispatchToProps = dispatch => ({
  login: payload => dispatch(authLoginSuccess(payload)),
  logout: () => dispatch(authLoginError()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Screen);
