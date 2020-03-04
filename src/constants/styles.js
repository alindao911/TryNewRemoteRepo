import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    width: '80%',
    marginBottom: 10,
    borderRadius: 5,
  },
  inputMessage: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    width: '85%',
    marginBottom: 10,
    borderRadius: 20,
  },
  btnText: {
    color: 'darkblue',
    fontSize: 20,
    marginTop: 10,
  },
  bottomBar: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 2,
    height: 60,
  },
});

export default styles;
