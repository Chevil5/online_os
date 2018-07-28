import React, {Component} from 'react';
import * as actions from '../actions/index';
import {connect} from 'react-redux';

class DesktopEditIcon extends Component {
    constructor(props) {
        super(props);
        this.editIcon = this.editIcon.bind(this);
        this.closeEditForm = this.closeEditForm.bind(this);

    }
    editIcon(){
        this.props.editIcon({name: this.name.value, link: typeof this.link !== "undefined" ? this.link.value : "", _id: this.props.item._id, dir_id: this.props.item.dir_id});
        this.props.showEditingForm(false, false);
    }

    closeEditForm(){
        this.props.showEditingForm(false, { type: 'editing_form'});
    }

    render(){
        let edit_line = "";
        if(this.props.item.type === 0) {
            edit_line = <input defaultValue={this.props.item.link} type='text' ref={input => {this.link = input;}}/>
        }
        return (<div className="DesktopEditIcon">
            <div className="CloseDirectory" onClick={this.closeEditForm}>x</div>
            <form onSubmit={this.editIcon}>
                <input defaultValue={this.props.item.name} type='text' ref={input => {this.name = input;}}/>
                {edit_line}
                <input type="submit" value="Edit" className="create_submit"/>
            </form>
        </div>);
    };
}

export default connect(null, actions)(DesktopEditIcon);
