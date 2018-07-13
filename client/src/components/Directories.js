import React, { Component } from 'react';
import Directory from './Directory';
import * as actions from '../actions';
import {connect} from 'react-redux';

class Directories extends Component {
    render() {
        let directory = [];
        if(this.props.directories){
            for(let id in this.props.directories){
                directory.push(<Directory key={id} dir_id={this.props.directories[id].dir_id}/>);
            }
        }

        return (<div className="Directories">{directory}</div>);

    }
}

function mapStateToProps({directories}) {
    return {directories};
}
export default connect(mapStateToProps, actions)(Directories);
