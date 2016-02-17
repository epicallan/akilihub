import React, { Component, PropTypes } from 'react';
import { Modal, Button } from 'react-bootstrap';

export default class ModalClass extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    showModal: PropTypes.bool,
  }

  constructor(props) {
    this.props = props;
  }

  render() {
    return (
      <div className="static-modal">
      <Modal.Dialog show={this.props.showModal} >
        <Modal.Header>
          <Modal.Title>{this.props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.props.content}
        </Modal.Body>
        <Modal.Footer>
          <Button>Close</Button>
          <Button bsStyle="primary">Save changes</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
  }
}
