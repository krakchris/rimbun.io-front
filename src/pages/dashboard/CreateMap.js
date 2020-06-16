/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { PureComponent } from "react";
import {
    Button, Modal, ModalHeader, ModalBody, ModalFooter, Form,
  FormGroup, Label, Input, Alert } from 'reactstrap';
import Select from '../../components/SelectDropdown';
import s from "./Dashboard.module.scss";



class CreateMap extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      mapName: "",
      selectedtagName: null,
      formErrors: {}
    };

    this.initialState = this.state;
  }

  handleFormValidation() {
    const { mapName, selectedtagName } = this.state;
    let formErrors = {};
    let formIsValid = true;

    //user name
    if (!mapName) {
      formIsValid = false;
      formErrors["mapNameErr"] = "Map Name is required.";
    }

    //Tag Name
    if (!selectedtagName) {
      formIsValid = false;
      formErrors["tagNameErr"] = "Select atleast one Tag Name";
    }

    this.setState({ formErrors: formErrors });
    return formIsValid;
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSelectChange = selectedtagName => {
    this.setState({ selectedtagName });
  };

  onSubmit = e => {
    e.preventDefault();
    if (this.handleFormValidation()) {
      const { mapName, selectedtagName } = this.state;
      this.props.createMap({ mapName, selectedtagName });
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
      formErrors: { mapNameErr, tagNameErr },
      selectedtagName,
      mapName
    } = this.state;
    
    const selectOptions = this.props.tagNames.map(item => {
      return {
        label: item.tagName,
        value: item._id,
        key: item._id
      };
    });

    return (
      <div className={s.alignEnd}>
        <Button color="success" size="lg" onClick={this.toggle}>
          Create Map
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
            <ModalHeader toggle={this.toggle}>Create Map</ModalHeader>
            <ModalBody>
              {this.props.errorMessage && (
                <Alert className="alert-sm" color="danger">
                  {this.props.errorMessage}
                </Alert>
              )}
              {this.props.mapCreateStatus && (
                <Alert className="alert-sm" color="success">
                  Map Created Sucessfully!
                </Alert>
              )}
              <FormGroup>
                <Label for="map-name">Name</Label>
                <Input
                  bsSize="lg"
                  type="text"
                  name="mapName"
                  id="map-name"
                  value={mapName}
                  onChange={this.handleChange}
                  className={mapNameErr ? " showError" : ""}
                />
                {mapNameErr && (
                  <div style={{ color: "red", paddingBottom: 10 }}>
                    {mapNameErr}
                  </div>
                )}
              </FormGroup>
              <FormGroup>
                <Label for="input-email">Tag Name</Label>
                <Select
                  value={this.props.selectedtagName}
                  selectedOptions={selectedtagName}
                  selectOptions={selectOptions}
                  isMulti
                  handleSelectChange={this.handleSelectChange}
                  className={tagNameErr ? " showError" : ""}
                />
                {tagNameErr && (
                  <div style={{ color: "red", paddingBottom: 10 }}>
                    {tagNameErr}
                  </div>
                )}
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="success">Create</Button>{" "}
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

export default CreateMap;