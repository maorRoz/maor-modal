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
    this.state = { isDialogOpen: true, isSectionContentHidden: true };

    createModalWrapper();
  }

  closeDialog = () => this.setState({ isDialogOpen: false, isSectionContentHidden: false });

  keyFunction = (event) => {
    switch(event.key){
      case 'Escape': return this.closeDialog();
      default: return undefined;
    }
  }

  componentDidMount(){
    document.addEventListener('keydown', this.keyFunction, false);
  }

  componentWillUnmount(){
    document.removeEventListener('keydown', this.keyFunction, false);
    removeModalWrapper();
  }

  render() {
    const { content, visualOverlay, dialogContent } = this.props;
    const { isDialogOpen, isSectionContentHidden } = this.state;
    return(
      <section>
        <div id='sectionContent' aria-hidden={isSectionContentHidden} onClick={this.closeDialog}>
          {isDialogOpen && visualOverlay}
          {content}
        </div>
        <div id='dialogPlaceholder'>
          {isDialogOpen && <Modal>
            <div>{visualOverlay}</div>
            <FocusLock autoFocus returnFocus>
              <dialog open>
                <div role='document'>
                  {dialogContent}
                </div>
              </dialog>
            </FocusLock>
          </Modal>}
        </div>
      </section>);
  }
}

export default DialogContainer;
