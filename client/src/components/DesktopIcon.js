import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import * as actions from '../actions';
import {connect} from "react-redux";


const iconSource = {
    beginDrag(props) {
        props.moveIconFrom(props.item);
        return {};
    }
};
function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
        connectDragPreview: connect.dragPreview(),
    }
}

class DesktopIcon extends Component {
    componentDidMount() {
        let icon = new Image();
        icon.src = this.props.item.image;
        this.props.connectDragPreview(icon);
    }
    constructor(props) {
        super(props);
        this.openLink = this.openLink.bind(this);
        this.state = {iconImage: null}
    }
    openLink(){
        if(Number(this.props.item.type) === 0){
            window.open(this.props.item.link);
        } else {
            this.props.openDirectory({dir_id: this.props.item._id, status: 'open'})
        }
    }
    render(){
        const { connectDragSource, isDragging } = this.props;

        return connectDragSource(<div className="DesktopIcon" onDoubleClick={this.openLink} style={{
            opacity: isDragging ? 0.5 : 1,
            cursor: 'move'
        }}>
            <img alt="Icon" onError={(el)=>{this.setState({iconImage: '/images/icon.png'})}} src={this.props.item.image?(this.state.iconImage||this.props.item.image):"/images/directory.png"}/>
            <span id={this.props.item._id}>{this.props.item.name}</span>
        </div>);
    }
}
let ItemTypes = {
    ICON: 'icon'
};
export default connect(null, actions)(DragSource(ItemTypes.ICON, iconSource, collect)(DesktopIcon));

