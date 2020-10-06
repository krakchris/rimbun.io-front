/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { PureComponent } from "react";
import {
    Button, Modal, ModalHeader, ModalBody, ModalFooter, Form,
  FormGroup, Label, Alert } from 'reactstrap';
import Select from '../../components/SelectDropdown/SelectDropdown';

class ShareMap extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      modal: true,
      selectedUser: null,
      formErrors: {}
    };

    this.initialState = this.state;
  }

  handleFormValidation() {
    const { selectedUser } = this.state;
    let formErrors = {};
    let formIsValid = true;
    //Official User
    if (!selectedUser || (selectedUser && !selectedUser.length)) {
      formIsValid = false;
      formErrors["UserErr"] = "Select atleast one User";
    }

    this.setState({ formErrors: formErrors });
    return formIsValid;
  }

  handleSelectChange = selectedUser => {
    this.setState({ selectedUser });
  };

  onSubmit = e => {
    e.preventDefault();
    if (this.handleFormValidation()) {
      const { selectedUser } = this.state;
      const mapId = this.props.mapData ? this.props.mapData.id : null;
      this.props.shareMap({ mapId, selectedUser });
      setTimeout(() => this.toggle("AUTO"), 4000);
    }
  };

  toggle = (autoFlag = "") => {
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
  };

  render() {
    const {
      formErrors: { UserErr },
      selectedUser
    } = this.state;
    const { mapData, isShareModalOpen } = this.props;

    const selectOptions = this.props.users.map(item => {
      return {
        label: `${item.name} (${item.email})`,
        value: item._id,
        key: item._id
      };
    });
    return (
      <React.Fragment>
        <Modal
          isOpen={!!isShareModalOpen && !!this.state.modal}
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
              {this.props.mapShareStatus && (
                <Alert className="alert-sm" color="success">
                  Map shared with selected users Sucessfully!
                </Alert>
              )}
              <FormGroup>
                <b>{mapData.name ? mapData.name : ""}</b>
              </FormGroup>
              <FormGroup>
                <Label for="input-email">
                  Select Users below to share your Map:
                </Label>
                <Select
                  selectedOptions={(selectedUser) ? selectedUser: mapData.selectedOptions}
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
              <Button color="success">Share</Button>
            </ModalFooter>
          </Form>
        </Modal>
      </React.Fragment>
    );
  }
}

export default ShareMap;