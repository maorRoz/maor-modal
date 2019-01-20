import React, { Component } from 'react';
import './DialogContainer.css';
import FocusLock from 'react-focus-lock';
import Modal from './Modal';


const createModalWrapper = () => {
  const modalWrapper = document.createElement('span');
  modalWrapper.setAttribute('id', 'modal-root');
  document.body.appendChild(modalWrapper);
};

const removeModalWrapper = () => {
  const modalWrapper = document.getElementById('modal-root');
  document.body.removeChild(modalWrapper);
};

class DialogContainer extends Component {
  constructor(props){
    super(props);
    this.state = { isDialogOpen: false };

    createModalWrapper();
  }

  openDialog = () => {
    this.setState({ isDialogOpen: true });
  }

  firstInteractableElementRef = React.createRef();

  setFocus = () => {
    this.firstInteractableElementRef.current.focus();
  }

  closeDialog = () => this.setState({ isDialogOpen: false });

  escFunction = event => event.key === 'Escape' ? this.closeDialog() : undefined;

  componentDidMount(){
    document.addEventListener('keydown', this.escFunction, false);
  }

  componentDidUpdate(){
    const toFocus = this.firstInteractableElementRef.current;
    return toFocus ? toFocus.focus() : undefined;
  }

  componentWillUnmount(){
    document.removeEventListener('keydown', this.escFunction, false);
    removeModalWrapper();
  }

  render() {
    const { content, visualOverlay, dialogContent } = this.props;
    const { isDialogOpen } = this.state;
    return(
      <section>
        <div id='sectionContent' aria-hidden={isDialogOpen} onClick={isDialogOpen ? this.closeDialog : undefined}>
          {visualOverlay(isDialogOpen)}
          {content(this.openDialog)}
        </div>
        <div id='dialogPlaceholder'>
          <Modal>
            <div>{visualOverlay(isDialogOpen)}</div>
            { isDialogOpen && <dialog open>
              <div role='document'>
                <FocusLock returnFocus>
                  {dialogContent(this.closeDialog, this.firstInteractableElementRef)}
                </FocusLock>
              </div>
            </dialog> }
          </Modal>
        </div>
      </section>);
  }
}

export default DialogContainer;
