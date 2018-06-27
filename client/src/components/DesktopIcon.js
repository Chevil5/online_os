import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import * as actions from '../actions';
import {connect} from "react-redux";


const iconSource = {
    beginDrag(props) {
        props.moveIconFrom(props.item._id);
        return {};
    }
};
function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
}

class DesktopIcon extends Component {
    constructor(props) {
        super(props);
        this.openLink = this.openLink.bind(this);
    }
    openLink(){
        window.open(this.props.item.link);
    }
    render(){
        const { connectDragSource, isDragging } = this.props;

        return connectDragSource(<div className="DesktopIcon" onDoubleClick={this.openLink} style={{
            opacity: isDragging ? 0.5 : 1,
            cursor: 'move'
        }}>
            <img alt="" src={this.props.item.image}/>
            <span id={this.props.item._id}>{this.props.item.name}</span>
        </div>);
    }
}
let ItemTypes = {
    ICON: 'icon'
};
export default connect(null, actions)(DragSource(ItemTypes.ICON, iconSource, collect)(DesktopIcon));

// export default DesktopIcon;
