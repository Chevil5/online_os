import React, { Component } from 'react';
import '../css/App.css';
import * as actions from '../actions';


import Desktop from './Desktop';
import Directories from './Directories';
import {DragDropContext, DropTarget} from "react-dnd/lib/index";
import HTML5Backend from "react-dnd-html5-backend/lib/index";
import {connect} from "react-redux";


class App extends Component {
    componentDidMount() {
        this.props.fetchUser();
        console.log('app');
    }

      render() {
        return (
          <div className="App">
              <Directories/>
              <Desktop/>
          </div>
        );
      }
}

export default connect(null, actions)(DragDropContext(HTML5Backend)(App));
