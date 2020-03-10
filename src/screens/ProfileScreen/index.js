import {connect} from 'react-redux';
import Screen from './Screen';

const mapStateToProps = state => ({
  user: state.user.user,
});

export default connect(mapStateToProps)(Screen);
