import React, { Component } from 'react';
import DesktopColumn from './DesktopColumn';
import DesktopCreateIcon from './DesktopCreateIcon';
import DesktopEditIcon from './DesktopEditIcon';
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
        let modal_window = "";
        if(this.props.adding_form && this.props.adding_form.status){
            if(this.props.adding_form.info.type === "adding_form"){
                modal_window = <DesktopCreateIcon number={this.props.adding_form.info.value}/>
            }
            if(this.props.adding_form.info.type === "editing_form"){
                modal_window = <DesktopEditIcon item={this.props.adding_form.info.value}/>
            }
        }
        return (
            <div onClick={this.onClick} className="Desktop">
                {modal_window}
                {Array.from(Array(20).keys()).map((column) => {
                    return (<DesktopColumn desktop={this.props.desktop} key={column+"column"} column={column}/>);
                })}
            </div>
        );
    }
}
function mapStateToProps({desktop, adding_form}) {
    return {desktop, adding_form};
}
export default connect(mapStateToProps, actions)(DragDropContext(HTML5Backend)(Desktop));