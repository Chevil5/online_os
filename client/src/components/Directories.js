import React, { Component } from 'react';
import Directory from './Directory';
import * as actions from '../actions';
import {connect} from 'react-redux';


class Directories extends Component {
    constructor(props){
        super(props);
        this.dirs_id = [];
    }

    render() {
        let directory = [];
        if(this.props.directory){
            if(this.dirs_id.indexOf(this.props.directory.dir_id) === -1){
                this.dirs_id.push(this.props.directory.dir_id);
            }
            for(let i = 0; i < this.dirs_id.length; i++){
                directory.push(<Directory key={i} dir_id={this.props.directory.dir_id}/>);
            }
        }

        return (<div className="Directories">{directory}</div>);

    }
}

function mapStateToProps({directory}) {
    return {directory};
}
export default connect(mapStateToProps, actions)(Directories);