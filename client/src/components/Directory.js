import React, {Component} from 'react';
import DesktopColumn from './DesktopColumn';

import * as actions from '../actions';
import {connect} from "react-redux";

class Directory extends Component {

    async componentDidMount(){
        this.props.fetchDirectory({user_id: 1, dir_id: this.props.dir_id});
    }

    render(){
        return (<div className="Directory">
            {Array.from(Array(5).keys()).map((column) => {
                return (<DesktopColumn dir_id={this.props.dir_id} desktop={this.props.directory_data} key={column+"column"} column={column}/>);
            })}
        </div>);
    }
}
function mapStateToProps({directory_data}) {
    return {directory_data};
}
export default connect(mapStateToProps, actions)(Directory);