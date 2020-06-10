import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class DeleteMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false
        }
    }

    toggle = () => {
        this.setState((prevState, props) => {
            return { modal: !prevState.modal };
        });
    };

    render() {
        return (
            <React.Fragment>
                <button style={{ background: 'none', border: 'none', outline: 'none' }} onClick={this.toggle}><i className="glyphicon glyphicon-trash text-success mr-sm mb-xs" /></button>
                <Modal 
                isOpen={this.state.modal} 
                toggle={this.toggle}
                backdrop={"static"}
                keyboard={false} 
                >
                    <ModalHeader toggle={this.toggle} >Delete Map</ModalHeader>
                    <ModalBody>
                        Are You Sure you want to
                    </ModalBody>
                    <ModalFooter>
                        <Button color="success" onClick={this.toggle}>Delete</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </React.Fragment>
        );

    }
}
export default DeleteMap;