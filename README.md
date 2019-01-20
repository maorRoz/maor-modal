# maor-modal

Available props:

*@content* - the content which should be overlayed by the modal element. this should be a function which 
receive only one argument - the dialog open event.

*@visualOverlay* - the visual overlay effect/animation. this should be a function which receive only one argument - 
a boolean which deterime if the dialog is open or close at that time.

*@dialogContent* - the content which the modal dialog should display. this should be a function which receive two arguments - the dialog close event, and a React.RefObject that will focus the chosen element, using the ref property.

Example:

```
import React, { Component } from 'react';
import './App.css';
import MaorModal from 'maor-modal';

const PageContent = handleOpen => (
  <div>
    <h1>Overlay This!</h1>
    <label>Name: </label>
    <input type='text' autoFocus onClick={handleOpen} />
    <button >Submit</button>
  </div>
);

const VisualOverlay = isOpen => (
  isOpen && <div className='void'/>
);

const DialogContent = (handleClose, focusRef) => (
  <div>
    <h1>Join Us!</h1>
    <label>Email: </label>
    <input type='text'/>
    <input type='text'/>
    <input ref={focusRef} type='text'/>
    <button onClick={handleClose}>Submit</button>
  </div>
);

class App extends Component {
  render() {
    return (
      <div className='App'>
        <MaorModal
          content={PageContent}
          visualOverlay={VisualOverlay}
          dialogContent={DialogContent}/>
      </div>
    );
  }
}


export default App;

```