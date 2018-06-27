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

    showAddingForm(){
        this.props.showAddingForm(true, {value: this.props.number, type: 'adding_form'});
    }

    showEditingForm(){
        this.props.showEditingForm(true, {value: this.props.item, type: 'editing_form'});
    }

    deleteIcon(){
        this.props.deleteIcon(1, this.props.item._id);
    }

    renderMenuForItem(){
        return <div className="DesktopContextMenu">
            <p onClick={this.showEditingForm}>Edit icon</p>
            <p onClick={this.deleteIcon}>Delete icon</p>
        </div>;
    };

    renderMenuForRow(){
        return <div className="DesktopContextMenu"><p onClick={this.showAddingForm}>Add icon</p></div>;
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