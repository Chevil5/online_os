import React, {Component} from 'react';
import * as actions from '../actions';
import {connect} from 'react-redux';

class DesktopContextMenu extends Component {

    constructor(props) {
        super(props);

        // This binding is necessary to make `this` work in the callback
        this.showAddingForm = this.showAddingForm.bind(this);
        this.showEditingForm = this.showEditingForm.bind(this);
        this.deleteIcon = this.deleteIcon.bind(this);
    }

    showAddingForm(icon_type){
        this.props.showAddingForm(true, {number: this.props.number, dir_id: this.props.dir_id, icon_type: icon_type, type: 'adding_form'});
    }

    showEditingForm(){
        this.props.showEditingForm(true, {value: this.props.item, type: 'editing_form'});
    }

    deleteIcon(){
        this.props.deleteIcon(this.props.item._id, this.props.item.dir_id);
    }

    renderMenuForItem(){
        let edit_line = "";
        if(this.props.item.type === 0){
            edit_line = <p onClick={this.showEditingForm}>Edit icon</p>;
        } else {
            edit_line = <p onClick={this.showEditingForm}>Edit directory</p>;

        }
        return <div className="DesktopContextMenu">
            {edit_line}
            <p onClick={this.deleteIcon}>Delete</p>
        </div>;
    };

    renderMenuForRow(){
        return <div className="DesktopContextMenu">
            <p onClick={ () => { this.showAddingForm(0)} }>Add icon</p>
            <p onClick={ () => { this.showAddingForm(1)} }>Add directory</p>
        </div>;
    };

    render() {
        let menu = this.renderMenuForRow();
        if(this.props.item){
            menu = this.renderMenuForItem();
        }

        return menu;
    }
}

export default connect(null, actions)(DesktopContextMenu);