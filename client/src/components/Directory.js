import React, {Component} from 'react';
import DesktopColumn from './DesktopColumn';

import * as actions from '../actions';
import {connect} from "react-redux";

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
        return (<div className="Directory">
            <p className="CloseDirectory" onClick={this.closeDirectory}>X</p>
            <p>{this.props.dir_id}</p>
            {Array.from(Array(5).keys()).map((column) => {
                return (<DesktopColumn dir_id={this.props.dir_id} desktop={this.props.directory_data} key={column+"column"} column={column}/>);
            })}
        </div>);
    }
}
function mapStateToProps({directory_data}, props) {
    if(directory_data !== null && directory_data.length !== 0){
        if(directory_data[0].dir_id === props.dir_id){
            return {directory_data};
        }
    } else {
        return {};
    }
}
export default connect(mapStateToProps, actions)(Directory);