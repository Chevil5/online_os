import React, { Component } from 'react';
import DesktopColumn from './DesktopColumn';
import * as actions from '../actions';
import {connect} from 'react-redux';
import Helper from '../helpers/Helper';



import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';



class Desktop extends Component {

    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    async componentDidMount(){
        this.props.fetchDesktop(1);
    }

    onClick(){
        Helper.closeAllContextMenus();
    }


    render(){
        return (
            <div onClick={this.onClick}>
                {Array.from(Array(10).keys()).map((column) => {
                    return (<DesktopColumn desktop={this.props.desktop} key={column+"column"} column={column} className="column" style={{width:"100px", float:"left"}}/>);
                })}
            </div>
        );
    }
}
function mapStateToProps({desktop}) {
    return {desktop};
}
export default connect(mapStateToProps, actions)(DragDropContext(HTML5Backend)(Desktop));