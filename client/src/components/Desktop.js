import React, { Component } from 'react';
import DesktopColumn from './DesktopColumn';
import DesktopCreateIcon from './DesktopCreateIcon';
import DesktopEditIcon from './DesktopEditIcon';
import * as actions from '../actions';
import {connect} from 'react-redux';
import {findDOMNode} from "react-dom";
import {DropTarget} from "react-dnd/lib/index";

const directoryTarget = {
    hover(props, monitor, component) {
        let newStyle = {};
        newStyle.left = monitor.getClientOffset().x-findDOMNode(component).getBoundingClientRect().left+'px';
        newStyle.top = monitor.getClientOffset().y-findDOMNode(component).getBoundingClientRect().top+'px';
        newStyle.opacity = 1;
        newStyle.zIndex = 1;
        newStyle.dir_id = monitor.getItem().props.dir_id;
        props.moveDirectory(newStyle);
        return props;
    },

    drop(props, monitor, component) {
        let newStyle = {};
        newStyle.left = monitor.getClientOffset().x-findDOMNode(component).getBoundingClientRect().left+'px';
        newStyle.top = monitor.getClientOffset().y-findDOMNode(component).getBoundingClientRect().top+'px';
        newStyle.opacity = 1;
        newStyle.zIndex = 1;
        props.moveDirectory(newStyle);
        return props;
    }
};
function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver()
    };
}

class Desktop extends Component {

    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    async componentDidMount(){
        this.props.fetchDesktop({user_id: 1, dir_id: 0});
    }

    onClick(){
        this.props.showContextMenu(false);
    }

    render(){
        let modal_window = "";
        const { connectDropTarget } = this.props;

        if(typeof this.dirs_id === 'undefined'){
            this.dirs_id = [];
        }

        if(this.props.adding_form && this.props.adding_form.status){
            if(this.props.adding_form.info.type === "adding_form"){
                modal_window = <DesktopCreateIcon info={this.props.adding_form.info}/>
            }
            if(this.props.adding_form.info.type === "editing_form"){
                modal_window = <DesktopEditIcon item={this.props.adding_form.info.value}/>
            }
        }
        const height = window.innerHeight;
        return connectDropTarget(
            <div onClick={this.onClick} className="Desktop" style={{height}}>
                {modal_window}
                {Array.from(Array(20).keys()).map((column) => {
                    return (<DesktopColumn dir_id="0" height={height} width="5%" desktop={this.props.desktop} key={column+"column"} column={column}/>);
                })}
            </div>
        );
    }
}
function mapStateToProps({desktop, adding_form}) {
    if(desktop !== null){
        desktop = desktop.data;
    };
    return {desktop, adding_form};
}

export default connect(mapStateToProps, actions)(DropTarget("directory", directoryTarget, collect)(Desktop));
