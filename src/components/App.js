import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router';
import { HashRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import * as auth from '../lib/token';

import ErrorPage from '../pages/error';

import '../styles/theme.scss';
import LayoutComponent from '../components/Layout';
//import DocumentationLayoutComponent from '../documentation/DocumentationLayout';
import { isLoggedIn } from '../lib/token';
import Login from "../pages/login";
import Register from '../pages/register';
import Maps from '../pages/maps/Map';
import ViewMap from '../pages/maps/ViewMap';
import { logoutUser } from '../actions/user';

const PrivateRoute = ({ dispatch, component, ...rest }) => {
  if (!isLoggedIn()) {
    dispatch(logoutUser());
    return <Redirect to="/login" />;
  } else {
    return (
      // eslint-disable-line
      <Route
        {...rest}
        render={props => React.createElement(component, props)}
      />
    );
  }
};

const CloseButton = ({ closeToast }) => <i onClick={closeToast} className="la la-close notifications-close" />

class App extends React.PureComponent {
  render() {
    return (
      <div>
        <ToastContainer
          autoClose={5000}
          hideProgressBar
          closeButton={<CloseButton />}
        />
        <HashRouter>
          <Switch>
            <Route path="/" exact render={() => <Redirect to="/app/main" />} />
            <Route path="/app" exact render={() => <Redirect to="/app/main" />} />
            <PrivateRoute path="/app" dispatch={this.props.dispatch} component={LayoutComponent} />
            <Route path="/documentation" exact
              render={() => <Redirect to="/documentation/getting-started/overview" />} />
            {/* <Route path="/documentation" component={DocumentationLayoutComponent}/> */}
            <Route path="/register" exact component={Register} />
            <Route path="/login" exact component={Login} />
            <Route path="/error" exact component={ErrorPage} />
            <Route path="/map/:id" exact component={Maps} />
            <Route path="/viewMap/:id" exact component={ViewMap} />
          </Switch>
        </HashRouter>
      </div>

    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(App);
