import React, {Component} from 'react';
import {DragSource} from "react-dnd/lib/index";

import DesktopColumn from './DesktopColumn';

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
        isDragging: monitor.isDragging()
    }
}
class Directory extends Component {

    constructor(props){
        super(props);
        this.closeDirectory = this.closeDirectory.bind(this);
    }
    async componentDidMount(){
        this.props.fetchDirectory({user_id: 1, dir_id: this.props.dir_id});
    }

    closeDirectory(){
        this.props.closeDirectory({dir_id: this.props.dir_id, status: 'close'});
    }
    render(){
        if(typeof this.props.directory_data !== 'undefined'){
            this.directory_data = this.props.directory_data;
        }
        const { connectDragSource } = this.props;
        return connectDragSource(<div className="Directory" draggable="false" style={{
            // cursor: 'move',
            top: typeof this.props.directory_dnd !== 'undefined'? this.props.directory_dnd.top: "100",
            left: typeof this.props.directory_dnd !== 'undefined'? this.props.directory_dnd.left: "100",
            opacity: typeof this.props.directory_dnd !== 'undefined'? this.props.directory_dnd.opacity: 1,
            zIndex: typeof this.props.directory_dnd !== 'undefined'? this.props.directory_dnd.zIndex: 1,
        }}>
            <p className="CloseDirectory" onClick={this.closeDirectory}>X</p>
            <p>{this.props.dir_id}</p>
            {Array.from(Array(5).keys()).map((column) => {
                return (<DesktopColumn dir_id={this.props.dir_id} desktop={this.directory_data} key={column+"column"} column={column}/>);
            })}
        </div>);
    }
}
function mapStateToProps({directory_data, directory_dnd}, props) {


    let result = {};

    if(directory_data !== null && directory_data.length !== 0){
        console.log(props);
        if(directory_data[0].dir_id === props.dir_id){
            result.directory_data = directory_data;
        }
    }

    if(directory_dnd !== null){
        console.log(directory_dnd);
        if(directory_dnd.dir_id === props.dir_id){
            result.directory_dnd = directory_dnd;
        }
    }

    return result;
}
export default connect(mapStateToProps, actions)(DragSource("directory", directorySource, collect)(Directory));
