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
import s from './Userlist.module.scss';





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
        {/*<h3 className="mb-lg">
          <span className="glyphicon glyphicon-user" />
            User List:
        </h3>*/}

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
              {this.props.fetchData ? (
                <TableComponent data={this.props.fetchData} />
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
    fetchData: state.auth.fetchData,
  };
}


export default withRouter(connect(mapStateToProps)(Userlist));
