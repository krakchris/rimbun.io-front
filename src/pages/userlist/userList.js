import React, { PureComponent } from 'react';

import {
  Row,
  Col,
  Button,

} from 'reactstrap';

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Widget from '../../components/Widget';
import { fetchUsers } from '../../actions/user'
import TableComponent from './Table';
import Loader from '../../components/Loader'
import s from './Userlist.module.scss';
import Loader from '../../components/Loader';





class Userlist extends PureComponent {


  constructor(props) {
    super(props);

  }

  componentDidMount() {
    this.props.dispatch(fetchUsers());
  }

  createUser = () => {
    this.props.history.push('/app/profile');
  }

  render() {

    return (
      <div className={s.root}>
      <Loader visible={this.props.isFetching} />
        {/*<h3 className="mb-lg">
          <span className="glyphicon glyphicon-user" />
            User List:
        </h3>*/}
        <Loader visible={isFetching} />
        <Row>
          <Col sm={12} md={6}>
            <Widget
              title={
                <div>
                  <div className="pull-right mt-0 mb-3">
                    <Button
                      size="sm"
                      className="mr-sm mb-xs bg-success text-white"
                      onClick={this.createUser}
                    >
                      {/* <span className="glyphicon glyphicon-plus" /> */}
                      Create User
                    </Button>
                  </div>
                  <h5 className="mt-0 mb-3">
                    <i className="fa fa-user mr-xs opacity-70" /> Users
                  </h5>
                </div>
              }
            >
              {this.props.userList ? (
                <TableComponent data={this.props.userList} />
              ) : null}
            </Widget>
          </Col>
        </Row>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    userList: state.auth.userList,
    isFetching: state.auth.isFetching
  };
}


export default withRouter(connect(mapStateToProps)(Userlist));
