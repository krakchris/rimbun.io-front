import React, { PureComponent } from 'react';
import {
    Row,
    Col,
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    ButtonGroup,
    Breadcrumb,
    BreadcrumbItem,
} from 'reactstrap';
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import Widget from '../../components/Widget';
import { toast } from "react-toastify";
import { createUser } from "../../actions/user";

import s from './Profile.module.scss';
import { OFFICIAL_ROLE_TAG } from '../../constants/index';
import Loader from '../../components/Loader';


class Profile extends PureComponent {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        isLoading: PropTypes.bool,
        isError: PropTypes.bool,
        errorMessage: PropTypes.string
    };

    static defaultProps = {
        isLoading: false,
        isError: false,
        errorMessage: null
    };

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            role: OFFICIAL_ROLE_TAG,
            email: "",
            password: "",
            passwordConfirm: "",
            formErrors: {}
        };

        this.initialState = this.state;
    }

    handleFormValidation() {
        const { name, email, password, passwordConfirm } = this.state;
        let formErrors = {};
        let formIsValid = true;

        //user name
        if (!name) {
            formIsValid = false;
            formErrors["nameErr"] = "User Name is required.";
        }

        //Email
        if (!email) {
            formIsValid = false;
            formErrors["emailErr"] = "Email id is required.";
        } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            formIsValid = false;
            formErrors["emailErr"] = "Invalid email id.";
        }

        //password
        if (!password) {
            formIsValid = false;
            formErrors["passwordErr"] = "Password is required.";
        }

        //passwordConfirm
        if (!passwordConfirm) {
            formIsValid = false;
            formErrors["passwordConfirmErr"] = "Please confirm Password";
        } else if (password !== passwordConfirm) {
            formIsValid = false;
            formErrors["passwordConfirmErr"] =
                "Password and Confirm password doesn't match";
        }

        this.setState({ formErrors: formErrors });
        return formIsValid;
    }

    handleChange = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    onSubmit = e => {
        e.preventDefault();
        if (this.handleFormValidation()) {
            const { name, role, email, password, passwordConfirm } = this.state;
            this.props.dispatch(createUser({ name, role, email, password, passwordConfirm }));
            this.setState(this.initialState);
        }
    };

    render() {
        const {
            nameErr,
            emailErr,
            passwordErr,
            passwordConfirmErr
        } = this.state.formErrors;
        return (
            <div className={s.root}>
                <Loader visible={this.props.isLoading} />
                <h1>Create User</h1>
                <Row>
                    <Col sm={6}>
                        <Widget
                            title={
                                <h5>
                                    User Profile <span className="fw-semi-bold">Form</span>
                                </h5>
                            }
                        >
                            <Form onSubmit={this.onSubmit}>
                                <FormGroup>
                                    <Label for="input-name">Name</Label>
                                    <Input
                                        bsSize="lg"
                                        type="text"
                                        name="name"
                                        id="input-name"
                                        value={this.state.name}
                                        onChange={this.handleChange}
                                        className={nameErr ? " showError" : ""}
                                    />
                                    {nameErr && (
                                        <div style={{ color: "red", paddingBottom: 10 }}>
                                            {nameErr}
                                        </div>
                                    )}
                                </FormGroup>
                                <FormGroup>
                                    <Label for="input-email">Email</Label>
                                    <Input
                                        bsSize="lg"
                                        type="text"
                                        name="email"
                                        id="input-email"
                                        onChange={this.handleChange}
                                        value={this.state.email}
                                        className={emailErr ? " showError" : ""}
                                    />
                                    {emailErr && (
                                        <div style={{ color: "red", paddingBottom: 10 }}>
                                            {emailErr}
                                        </div>
                                    )}
                                </FormGroup>
                                <FormGroup>
                                    <Label for="input-password">Password</Label>
                                    <Input
                                        bsSize="lg"
                                        type="password"
                                        name="password"
                                        id="input-password"
                                        onChange={this.handleChange}
                                        value={this.state.password}
                                    />
                                    {passwordErr && (
                                        <div style={{ color: "red", paddingBottom: 10 }}>
                                            {passwordErr}
                                        </div>
                                    )}
                                </FormGroup>
                                <FormGroup>
                                    <Label for="input-password">Confirm Password</Label>
                                    <Input
                                        bsSize="lg"
                                        type="text"
                                        name="passwordConfirm"
                                        id="input-confirm-password"
                                        onChange={this.handleChange}
                                        value={this.state.passwordConfirm}
                                    />
                                    {passwordConfirmErr && (
                                        <div style={{ color: "red", paddingBottom: 10 }}>
                                            {passwordConfirmErr}
                                        </div>
                                    )}
                                </FormGroup>
                                <div className="d-flex justify-content-between align-items-center">
                                    <ButtonGroup className="pull-right">
                                        {/*<Button className="ml-sm" color="default">Cancel</Button>*/}
                                        <Button color="global-theme-color">Save</Button>
                                    </ButtonGroup>
                                </div>
                            </Form>
                        </Widget>
                    </Col>
                </Row>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isLoading: state.auth.isLoading,
        isError: state.auth.isError,
        errorMessage: state.auth.errorMessage
    };
}


export default withRouter(connect(mapStateToProps)(Profile));
