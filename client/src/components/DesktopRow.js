import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';


const rowTarget = {
    drop(props, monitor) {
        console.log(monitor);
    }

};
function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver()
    };
}

class DesktopRow extends Component{
    render (){
        const { connectDropTarget, isOver } = this.props;

        return connectDropTarget(<div key={this.props.number +"row"} className="row" id={this.props.number} style={{width:"100%", float:"left", height:"100px", border: "1px solid black"}}>{this.props.item}{isOver}</div>)
    }
}

let ItemTypes = {
    ICON: 'icon'
};
export default DropTarget(ItemTypes.ICON, rowTarget, collect)(DesktopRow);
