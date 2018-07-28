import React, {Component} from 'react';
import {DragSource} from "react-dnd/lib/index";
import { getEmptyImage } from "react-dnd-html5-backend";

import * as actions from '../actions';
import {connect} from "react-redux";

const directorySource = {
    beginDrag(props, monitor, component) {
        return {props};
    }
};
function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
        connectDragPreview: connect.dragPreview(),
    }
}
class DirectoryDragableHeader extends Component {
    constructor(props){
        super(props);
        this.closeDirectory = this.closeDirectory.bind(this);
    }

    closeDirectory(){
        this.props.closeDirectory({dir_id: this.props.dir_id, status: 'close'});
    }

    componentDidMount() {
        this.props.connectDragPreview(getEmptyImage());
    }

    render(){
        const { connectDragSource } = this.props;
        return connectDragSource(<div className="DirectoryDragableHeader" style={{width: "100%", height: "30px", background: "blue"}}>
            <div>{this.props.dir_info.name}</div>
            <div className="CloseDirectory" onClick={this.closeDirectory}>x</div>
        </div>);
    }
}
export default connect(null, actions)(DragSource("directory", directorySource, collect)(DirectoryDragableHeader));
