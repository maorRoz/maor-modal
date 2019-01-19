# maor-modal

Available props:

*@content* - the content which should be overlayed by the modal element

*@visualOverlay* - the visual overlay effect/animation

*@dialogContent* - the content which the modal dialog should display

Example:

```
import React, { Component } from 'react';
import './App.css';
import MaorModal from 'maor-modal';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <MaorModal
        content={<p>overlay me!</p>}
        visualOverlay={<p>*some overlay visuals*</p>}
        dialogContent={<button>Click Me!</button>}/>
      </div>
    );
  }
}

export default App;

```