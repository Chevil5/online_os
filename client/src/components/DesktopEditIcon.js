import React, {Component} from 'react';
import * as actions from '../actions/index';
import {connect} from 'react-redux';

class DesktopEditIcon extends Component {
    constructor(props) {
        super(props);
        this.editIcon = this.editIcon.bind(this);
    }
    editIcon(){
        this.props.editIcon(1, {name: this.name.value, link: this.link.value, _id: this.props.item._id});
        this.props.showEditingForm(false, false);
    }
    render(){
        return (<div className="DesktopEditIcon">
            <input defaultValue={this.props.item.name} type='text' ref={input => {this.name = input;}}/>
            <input defaultValue={this.props.item.link} type='text' ref={input => {this.link = input;}}/>
            <button onClick={this.editIcon}>Edit</button>
        </div>);
    };
}

export default connect(null, actions)(DesktopEditIcon);
