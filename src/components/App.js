import React, { lazy, Suspense } from "react";
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router';
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from 'react-toastify';

import ErrorPage from '../pages/error';
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
                    <Route path={Routes.register} exact component={Register}/>
                    <Route path={Routes.login} exact component={Login}/>
                    <Route path={Routes.error} exact component={ErrorPage}/>
                    <Suspense fallback={<Loader visible/>}>
                      <Route path={Routes.editMap} exact component={EditMap}/>
                      <Route path={Routes.viewMap} exact component={ViewMap} />
                    </Suspense>
                    <Route component={NotFound} />
                </Switch>
        </BrowserRouter>
        </div>

    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(App);
