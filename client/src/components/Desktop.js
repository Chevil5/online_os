import React, { Component } from 'react';
import DesktopColumn from './DesktopColumn';
import DesktopCreateIcon from './DesktopCreateIcon';
import DesktopEditIcon from './DesktopEditIcon';
import * as actions from '../actions';
import {connect} from 'react-redux';



class Desktop extends Component {

    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    async componentDidMount(){
        this.props.fetchDesktop({user_id: 1, dir_id: 0});
    }

    onClick(){
        this.props.showContextMenu(false);
    }

    render(){
        let modal_window = "";
        if(typeof this.dirs_id === 'undefined'){
            this.dirs_id = [];
        }

        if(this.props.adding_form && this.props.adding_form.status){
            if(this.props.adding_form.info.type === "adding_form"){
                modal_window = <DesktopCreateIcon info={this.props.adding_form.info}/>
            }
            if(this.props.adding_form.info.type === "editing_form"){
                modal_window = <DesktopEditIcon item={this.props.adding_form.info.value}/>
            }
        }

        return (
            <div onClick={this.onClick} className="Desktop">
                {modal_window}
                {Array.from(Array(20).keys()).map((column) => {
                    return (<DesktopColumn dir_id="0" desktop={this.props.desktop} key={column+"column"} column={column}/>);
                })}
            </div>
        );
    }
}
function mapStateToProps({desktop, adding_form}) {
    return {desktop, adding_form};
}
export default connect(mapStateToProps, actions)(Desktop);