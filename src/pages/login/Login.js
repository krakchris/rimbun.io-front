import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { 
  Alert, 
  Button, 
  FormGroup, 
  Input, 
  Row,
  Col,
  Form
} from 'reactstrap';
import s from './Login.module.scss';
import Widget from '../../components/Widget';
import Footer from "../../components/Footer";
import { loginUser } from '../../actions/user';
import logo from "../../images/rimbun_colored_logo.png";

class Login extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    isFetching: PropTypes.bool,
    location: PropTypes.any, // eslint-disable-line
    errorMessage: PropTypes.string,
  };

  static defaultProps = {
    isAuthenticated: false,
    isFetching: false,
    location: {},
    errorMessage: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      login: '',
      password: '',
    };
  }

  changeLogin = (event) => {
    this.setState({login: event.target.value});
  }

  changePassword = (event) => {
    this.setState({password: event.target.value});
  }

  doLogin = (e) => {
    this.props.dispatch(
      loginUser({
        login: this.state.login,
        password: this.state.password,
      }),
    );
    e.preventDefault();
  }

  componentDidUpdate(){
    const { from } = this.props.location.state || {
      from: { pathname: '/app' },
    };
    if (this.props.isAuthenticated) {
      this.props.history.push(from);
    }
  }

  render() {
    const {from} = this.props.location.state || {
      from: {pathname: '/app'},
    };

    // if (this.props.isAuthenticated) {
    //   console.log('this does the redirection');
    //   // cant access login page while logged in
    //   return <Redirect to={from} />;
    // }

        return (
          <div className={s.root}>
            <Row>
              <Col
                xs={{ size: 10, offset: 1 }}
                sm={{ size: 6, offset: 3 }}
                lg={{ size: 4, offset: 4 }}
              >
                <div className="text-center">
                  <img src={logo} alt="" height="80" />
                </div>
                <Widget className={s.widget}>
                  <h4 className="mt-0">Login to your Web App</h4>
                  <p className="fs-sm text-muted">
                    User your username and password to sign in
                    <br />
                  </p>
                  <Form className="mt" onSubmit={this.doLogin}>
                    {this.props.errorMessage && (
                      <Alert size="sm" color="danger">
                        {this.props.errorMessage}
                      </Alert>
                    )}
                    <FormGroup className="form-group">
                      <Input
                        className="no-border"
                        value={this.state.login}
                        onChange={this.changeLogin}
                        type="email"
                        required
                        name="username"
                        placeholder="Username"
                      />
                    </FormGroup>
                    <FormGroup>
                      <Input
                        className="no-border"
                        value={this.state.password}
                        onChange={this.changePassword}
                        type="password"
                        required
                        name="password"
                        placeholder="Password"
                      />
                    </FormGroup>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <Button color="success" size="sm" type="submit">
                          {this.props.isFetching ? "Loading..." : "Login"}
                        </Button>
                      </div>
                    </div>
                  </Form>
                </Widget>
              </Col>
            </Row>
            <Footer className="text-center" />
          </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isFetching: state.auth.isFetching,
        isAuthenticated: state.auth.isAuthenticated,
        errorMessage: state.auth.errorMessage,
    };
}

export default withRouter(connect(mapStateToProps)(Login));

