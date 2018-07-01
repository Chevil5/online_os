import React, {Component} from 'react';
import * as actions from '../actions/index';
import {connect} from 'react-redux';

class DesktopEditIcon extends Component {
    constructor(props) {
        super(props);
        this.editIcon = this.editIcon.bind(this);
    }
    editIcon(){
        this.props.editIcon(1, {name: this.name.value, link: typeof this.link !== "undefined" ? this.link.value : "", _id: this.props.item._id, dir_id: this.props.item.dir_id});
        this.props.showEditingForm(false, false);
    }
    render(){
        let edit_line = "";
        if(this.props.item.type === 0) {
            edit_line = <input defaultValue={this.props.item.link} type='text' ref={input => {this.link = input;}}/>
        }
        return (<div className="DesktopEditIcon">
            <input defaultValue={this.props.item.name} type='text' ref={input => {this.name = input;}}/>
            {edit_line}
            <button onClick={this.editIcon}>Edit</button>
        </div>);
    };
}

export default connect(null, actions)(DesktopEditIcon);
