import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';

import LoginView from '../../../pages/Setting/LoginView';
import MainScreen from '../components/MainScreen';
import RegPhone from '../../../pages/Setting/RegPhone'
import Tab from '../components/Tab'
export const AppNavigator = StackNavigator({
  Tab:{ screen :Tab,},
  Main: { screen: MainScreen },
  Login: { screen: LoginView },
  RegPhone:{screen:RegPhone},
});

const AppWithNavigationState = ({ dispatch, nav }) => (
  <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
);

AppWithNavigationState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  nav: state.nav,
});

export default connect(mapStateToProps)(AppWithNavigationState);
