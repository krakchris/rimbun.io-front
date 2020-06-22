import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import Icon from '../Icon';
import LinksGroup from './LinksGroup/LinksGroup';

import s from './Sidebar.module.scss';
import { getLoggedInUser } from '../../lib/localData';
import { ADMIN_ROLE_TAG } from '../../constants';

const Sidebar = () => {
  const isAdmin = (getLoggedInUser().role === ADMIN_ROLE_TAG);
  return (
  <nav className={s.root}>
    <header className={s.logo}>
      <Link to="/app/main">
        <Icon glyph="logo" />
      </Link>
    </header>
    <ul className={s.nav}>
      <LinksGroup header="Maps" headerLink="/app/main" glyph="dashboard" />
      {isAdmin && <LinksGroup header="User Management" headerLink="/app/userList" glyph="user" />}
      <LinksGroup header="Stories" headerLink="/app/stories" glyph="components" />
    </ul>
  </nav>
)};

function mapStateToProps(store) {
  return {
    sidebarOpened: store.navigation.sidebarOpened,
    sidebarStatic: store.navigation.sidebarStatic,
  };
}

export default withRouter(connect(mapStateToProps)(Sidebar));
