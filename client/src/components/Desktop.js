import React, { Component } from 'react';
import DesktopColumn from './DesktopColumn';
import * as actions from '../actions';
import {connect} from 'react-redux';



import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';



class Desktop extends Component {

    async componentDidMount(){
        this.props.fetchDesktop(1);
    }


    render(){
        return (
            <div>
                {Array.from(Array(10).keys()).map((column) => {
                    return (<DesktopColumn key={column+"column"} column={column} className="column" style={{width:"100px", float:"left"}}/>);
                })}
            </div>
        );
    }
}
export default connect(null, actions)(DragDropContext(HTML5Backend)(Desktop));