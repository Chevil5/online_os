import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import { connect } from 'react-redux';

import DesktopIcon from './DesktopIcon';
import DesktopContextMenu from './DesktopContextMenu';
import * as actions from '../actions';




const rowTarget = {
    drop(props, monitor) {
        props.updateIconNumber(1, props.icon, props.number)
    }

};
function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver()
    };
}

class DesktopRow extends Component{

    constructor(props) {
        super(props);

        // This binding is necessary to make `this` work in the callback
        this.onRightClick = this.onRightClick.bind(this);
    }

    //Event handlers
    onRightClick(event){
        this.props.showContextMenu(this.props.number);
        event.preventDefault();
    }

    renderDesktopItem(item){
        return <DesktopIcon key={item.name} item={item}/>
    }
    render (){
        const { connectDropTarget, isOver } = this.props;
        let contextMenu = "";
        if(this.props.context_menu && this.props.context_menu === this.props.number){
            contextMenu = <DesktopContextMenu number={this.props.number} item={this.props.item?this.props.item:false}/>;
        }
        return connectDropTarget(<div onContextMenu={event => {this.onRightClick(event)}} key={this.props.number +"row"} className="DesktopRow" id={"row"+this.props.number}>{this.props.item?this.renderDesktopItem(this.props.item):this.props.item}{isOver}{contextMenu}</div>)
    }
}

let ItemTypes = {
    ICON: 'icon'
};
function mapStateToProps({icon, context_menu}) {
    return {icon, context_menu};
}
export default connect(mapStateToProps, actions)(DropTarget(ItemTypes.ICON, rowTarget, collect)(DesktopRow));
