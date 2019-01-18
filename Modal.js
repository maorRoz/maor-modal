import { Component } from 'react';
import ReactDOM from 'react-dom';

class Modal extends Component {
  constructor(props) {
    super(props);
    this.modal = document.createElement('div');
  }

  componentDidMount() {
    this.modalWrapper = document.getElementById('modal-root');
    this.modalWrapper.appendChild(this.modal);
  }

  componentWillUnmount() {
    this.modalWrapper.removeChild(this.modal);
  }

  render() {
    return ReactDOM.createPortal(
      this.props.children,
      this.modal,
    );
  }
}

export default Modal;
