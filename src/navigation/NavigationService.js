import {NavigationActions} from 'react-navigation';

let navigator;

function setTopLevelNavigator(navigatorRef) {
  navigator = navigatorRef;
}

function navigate(routeName, params) {
  navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    }),
  );
}

function goBack() {
  navigator._navigation.goBack();
}

export default {
  goBack,
  navigate,
  setTopLevelNavigator,
};
