/**
 * Flatlogic Dashboards (https://flatlogic.com/admin-dashboards)
 *
 * Copyright © 2015-present Flatlogic, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import cx from 'classnames';
import { Switch, Route, withRouter } from 'react-router';

import s from './Layout.module.scss';
import Header from '../Header';
import Footer from '../Footer';
import Sidebar from '../Sidebar';

// Dashboard component is loaded directly as an example of server side rendering
import Dashboard from '../../pages/dashboard'
import NotFound from '../../pages/notFound'
import Notifications from '../../pages/notifications'
import Profile from '../../pages/profile'
import userList from '../../pages/userlist/userList'
import Privacy from '../../pages/privacy';
import Stories from '../../pages/stories';
import * as Routes from "../../constants/routes";

class Layout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sidebarOpen: false,
    };
  }

  render() {
    return (
      <div className={s.root}>
        <Sidebar />
        <div
          className={cx(s.wrap, { [s.sidebarOpen]: this.state.sidebarOpen })}
        >
          <Header
            sidebarToggle={() =>
              this.setState({
                sidebarOpen: !this.state.sidebarOpen
              })
            }
          />
          <main className={s.content}>
            <Switch>
              <Route path={Routes.dashboard} exact component={Dashboard} />
              <Route path={Routes.privacy} exact component={Privacy} />
              <Route path={Routes.stories} exact component={Stories} />
              <Route path={Routes.userList} exact component={userList} />
              <Route path={Routes.profile} exact component={Profile} />
              <Route path={Routes.notifications} exact component={Notifications} />
              <Route component={NotFound} />
            </Switch>
          </main>
          <Footer />
        </div>
      </div>
    );
  }
}

export default withRouter(Layout);
