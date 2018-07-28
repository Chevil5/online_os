import React, { Component } from 'react';
import Directory from './Directory';
import * as actions from '../actions';
import {connect} from 'react-redux';
import {DropTarget} from "react-dnd/lib/index";
import {findDOMNode} from "react-dom";

const directoryTarget = {
    hover(props, monitor, component) {
        let newStyle = {};
        newStyle.left = monitor.getSourceClientOffset().x;
        newStyle.top = monitor.getSourceClientOffset().y;
        newStyle.opacity = 1;
        newStyle.zIndex = 1;
        newStyle.dir_id = monitor.getItem().props.dir_id;
        props.moveDirectory(newStyle);
        return props;
    },

    drop(props, monitor, component) {
        let newStyle = {};
        newStyle.left = monitor.getSourceClientOffset().x;
        newStyle.top = monitor.getSourceClientOffset().y;
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

class Directories extends Component {
    render() {
        const { connectDropTarget } = this.props;

        let directory = [];
        if(this.props.directories){
            for(let id in this.props.directories){
                directory.push(<Directory key={id} dir_id={this.props.directories[id].dir_id}/>);
            }
        }

        return connectDropTarget(<div style={{height: window.innerHeight}} className="Directories">{directory}</div>);

    }
}

function mapStateToProps({directories}) {
    return {directories};
}
export default connect(mapStateToProps, actions)(DropTarget("directory", directoryTarget, collect)(Directories));
