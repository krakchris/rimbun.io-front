import React, { lazy, Suspense } from "react";
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router';
import { BrowserRouter, withRouter } from "react-router-dom";
import { ToastContainer } from 'react-toastify';

import ErrorBoundary from '../pages/error';
import NotFound from "../pages/notFound";

import '../styles/theme.scss';
import LayoutComponent from '../components/Layout';
import Loader from '../components/Loader';
import { isLoggedIn } from '../lib/token';
import Login from "../pages/login";
import Register from '../pages/register';
import { logoutUser } from '../actions/user';
import * as Routes from '../constants/routes';

const ViewMap = lazy(() => import('../pages/maps/ViewMap'));
const EditMap = lazy(() => import('../pages/maps/Map'));



const PrivateRoute = ({ dispatch, component, ...rest }) => {
  if (!isLoggedIn()) {
    dispatch(logoutUser());
    return <Redirect to={Routes.login} />;
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
      <ErrorBoundary>
        <div>
            <ToastContainer
                autoClose={5000}
                hideProgressBar
                closeButton={<CloseButton/>}
            />
        <BrowserRouter>
                <Switch>
                    <Route path={Routes.root} exact render={() => <Redirect to={Routes.dashboard} />}/>
                    <Route path={Routes.app} exact render={() => <Redirect to={Routes.dashboard} />}/>
                    <PrivateRoute path={Routes.app} dispatch={this.props.dispatch} component={LayoutComponent}/>
                    <Route path={Routes.documentation} exact
                           render={() => <Redirect to="/documentation/getting-started/overview"/>}/>
                    <PrivateRoute path={Routes.register} exact dispatch={this.props.dispatch} component={Register}/>

                    <Route path={Routes.login} exact component={Login}/>
                    {/*<Route path={Routes.error} exact component={ErrorBoundary}/>*/}

                    <Suspense fallback={<Loader visible/>}>
                      <PrivateRoute path={Routes.editMap} exact dispatch={this.props.dispatch} component={EditMap}/>
                      <PrivateRoute path={Routes.viewMap} exact dispatch={this.props.dispatch} component={ViewMap} />
                    </Suspense>
                    
                      <PrivateRoute dispatch={this.props.dispatch} component={NotFound} />
                </Switch>
        </BrowserRouter>
        </div>
      </ErrorBoundary>

    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(App);
