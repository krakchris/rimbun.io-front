import React, { Component } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
  Col,
  Alert,
  Button,
  ButtonGroup,
  Breadcrumb,
  BreadcrumbItem,
  Progress,
  Badge,
  ListGroup,
  ButtonDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Table
} from "reactstrap";
import classnames from "classnames";
import Widget from '../../components/Widget';

import { fetchPosts } from '../../actions/posts';
import s from './Dashboard.module.scss';

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1',
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

 

  render() {
    return (
      <section className={s.root}>
        <h1 className="page-title mb-lg">
          Dashboard
        </h1>

        {/* tabs */}
        <Nav className="mb-lg" tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "1" })}
              onClick={() => {
                this.toggle("1");
              }}
            >
              <span>Maps</span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "2" })}
              onClick={() => {
                this.toggle("2");
              }}
            >
              <span>Charts</span>
            </NavLink>
          </NavItem>
        </Nav>

        {/* tab content */}

        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <div>
              <h5>
                No Maps Available
              </h5>
              <Row className="icon-list">
               
              </Row>
            </div>
          </TabPane>
        </TabContent>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="2">
            <div>
              <h5>
                No Charts Available
              </h5>
              <Row className="icon-list">

              </Row>
            </div>
          </TabPane>
        </TabContent>
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    isFetching: state.posts.isFetching,
    posts: state.posts.posts,
  };
}

export default connect(mapStateToProps)(Dashboard);
