import React, {Component} from 'react';
import {DragSource} from "react-dnd/lib/index";
import { getEmptyImage } from "react-dnd-html5-backend";


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
    }

    componentDidMount() {
        this.props.connectDragPreview(getEmptyImage());
    }

    render(){
        const { connectDragSource } = this.props;
        return connectDragSource(<div style={{width: "100%", height: "30px", background: "blue"}}></div>);
    }
}
export default DragSource("directory", directorySource, collect)(DirectoryDragableHeader);
