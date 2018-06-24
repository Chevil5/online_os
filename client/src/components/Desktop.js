import React, { Component } from 'react';
import DesktopColumn from './DesktopColumn';
import DesktopCreateIcon from './DesktopCreateIcon';
import * as actions from '../actions';
import {connect} from 'react-redux';



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
        this.props.showContextMenu(false);
    }

    render(){
        let notification = "";
        if(this.props.adding_form && this.props.adding_form.status){
            notification = <DesktopCreateIcon number={this.props.adding_form.number}/>
        }
        return (
            <div onClick={this.onClick}>
                {notification}
                {Array.from(Array(10).keys()).map((column) => {
                    return (<DesktopColumn desktop={this.props.desktop} key={column+"column"} column={column} className="column" style={{width:"100px", float:"left"}}/>);
                })}
            </div>
        );
    }
}
function mapStateToProps({desktop, adding_form}) {
    return {desktop, adding_form};
}
export default connect(mapStateToProps, actions)(DragDropContext(HTML5Backend)(Desktop));