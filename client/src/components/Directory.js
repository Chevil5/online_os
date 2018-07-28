import React, {Component} from 'react';

import DesktopColumn from './DesktopColumn';
import DirectoryDragableHeader from './DirectoryDragableHeader';

import * as actions from '../actions';
import {connect} from "react-redux";

class Directory extends Component {

    constructor(props){
        super(props);
        this.closeDirectory = this.closeDirectory.bind(this);
    }
    async componentDidMount(){
        this.props.fetchDirectory({dir_id: this.props.dir_id});
    }

    closeDirectory(){
        this.props.closeDirectory({dir_id: this.props.dir_id, status: 'close'});
    }
    render(){
        if(typeof this.props.directory_data !== 'undefined'){
            this.directory_data = this.props.directory_data;
        }
        const height = '400';
        return (<div className="Directory" style={{
            // cursor: 'move',
            top: typeof this.props.directory_dnd !== 'undefined'? this.props.directory_dnd.top: "100",
            left: typeof this.props.directory_dnd !== 'undefined'? this.props.directory_dnd.left: "100",
            opacity: typeof this.props.directory_dnd !== 'undefined'? this.props.directory_dnd.opacity: 1,
            zIndex: typeof this.props.directory_dnd !== 'undefined'? this.props.directory_dnd.zIndex: 1,
            height: height+'px'
        }}>
            <DirectoryDragableHeader dir_id={this.props.dir_id} dir_info={typeof this.props.dir_info !== 'undefined'?this.props.dir_info[0]:''}/>
            {Array.from(Array(10).keys()).map((column) => {
                return (<DesktopColumn height={height} width="10%" dir_id={this.props.dir_id} desktop={this.directory_data} key={column+"column"} column={column}/>);
            })}
        </div>);
    }
}
function mapStateToProps({directory_data, directory_dnd}, props) {

    let result = {};

    if(directory_data !== null){
        if(directory_data.dir_id === props.dir_id){
            result.directory_data = directory_data.data;
            result.dir_info = directory_data.dir_info;
        }
    }

    if(directory_dnd !== null){
        if(directory_dnd.dir_id === props.dir_id){
            result.directory_dnd = directory_dnd;
        }
    }

    return result;
}
export default connect(mapStateToProps, actions)(Directory);
