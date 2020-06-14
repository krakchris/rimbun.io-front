/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { Component } from 'react';
import {
    Button, Modal, ModalHeader, ModalBody, ModalFooter, Form,
  FormGroup, Label, Input, Alert } from 'reactstrap';
import Select from '../../components/SelectDropdown/SelectDropdown';
import s from "./Dashboard.module.scss";



class ShareMap extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      mapName: "",
      selectedUser: null,
      formErrors: {}
    };

    this.initialState = this.state;
  }

  handleFormValidation() {
    const { mapName, selectedUser } = this.state;
    let formErrors = {};
    let formIsValid = true;

    //user name
    if (!mapName) {
      formIsValid = false;
      formErrors["mapNameErr"] = "Map Name is required.";
    }

    //Tag Name
    if (!selectedUser) {
      formIsValid = false;
      formErrors["UserErr"] = "Select atleast one Tag Name";
    }

    this.setState({ formErrors: formErrors });
    return formIsValid;
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSelectChange = selectedUser => {
    this.setState({ selectedUser });
  };

  onSubmit = e => {
    e.preventDefault();
    if (this.handleFormValidation()) {
      const { mapName, selectedUser } = this.state;
      this.props.createMap({ mapName, selectedUser });
      setTimeout(() => this.toggle('AUTO'), 4000);
    }
  };

  toggle = (autoFlag="") => { 
    this.setState((prevState, props) => {
      let modalStatus;
      modalStatus =
        autoFlag === "AUTO" && !prevState.modal
          ? prevState.modal
          : !prevState.modal;
      return { modal: modalStatus };
    });
  };

  onClosed = () => {
    this.setState(this.initialState);
    this.props.onModalClose();
  }

  render() {
    console.log("usrs====>", this.props.users);
    const {
      formErrors: { mapNameErr, UserErr },
      selectedUser,
      mapName
    } = this.state;

    const selectOptions = this.props.users.map(item => {
      return {
        label: `${item.name} (${item.email})`,
        value: item._id,
        key: item._id
      };
    });

    return (
      <div className={s.alignEnd}>
        <Button color="success" size="lg" onClick={this.toggle}>
          Share Map
        </Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          backdrop={"static"}
          keyboard={false}
          unmountOnClose
          onClosed={this.onClosed}
          returnFocusAfterClose={false}
        >
          <Form onSubmit={this.onSubmit}>
            <ModalHeader toggle={this.toggle}>Share Map</ModalHeader>
            <ModalBody>
              {this.props.errorMessage && (
                <Alert className="alert-sm" color="danger">
                  {this.props.errorMessage}
                </Alert>
              )}
              {this.props.mapCreateStatus && (
                <Alert className="alert-sm" color="success">
                  Map shared with selected users Sucessfully!
                </Alert>
              )}
              <FormGroup>
                <Label for="map-name">Name</Label>
                {mapName ? mapName : '' }
              </FormGroup>
              <FormGroup>
                <Label for="input-email">Official Users</Label>
                <Select
                  value={this.props.selectedUser}
                  selectedOptions={selectedUser}
                  selectOptions={selectOptions}
                  isMulti
                  handleSelectChange={this.handleSelectChange}
                  className={UserErr ? " showError" : ""}
                />
                {UserErr && (
                  <div style={{ color: "red", paddingBottom: 10 }}>
                    {UserErr}
                  </div>
                )}
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="success">Share</Button>{" "}
              {/* <Button color="secondary" onClick={this.toggle}>
                Cancel
                </Button>*/}
            </ModalFooter>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default ShareMap;