import React, { Component } from 'react';
import '../css/App.css';

import Desktop from './Desktop';
import Directories from './Directories';
import {DragDropContext} from "react-dnd/lib/index";
import HTML5Backend from "react-dnd-html5-backend/lib/index";


class App extends Component {
  render() {
    return (
      <div className="App">
          <Directories/>
          <Desktop/>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);