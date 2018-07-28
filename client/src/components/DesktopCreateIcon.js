import React, {Component} from 'react';
import * as actions from '../actions/index';
import {connect} from 'react-redux';

class DesktopCreateIcon extends Component {

    constructor(props) {
        super(props);
        this.createIcon = this.createIcon.bind(this);
        this.closeAddingForm = this.closeAddingForm.bind(this);

    }
    createIcon(){
        this.props.createIcon(this.data.value, this.props.info.number,this.props.info.dir_id,this.props.info.icon_type);
        this.props.showAddingForm(false, false);
    }

    closeAddingForm(){
        this.props.showAddingForm(false, {type: 'adding_form'});
    }

    renderAddIconForm (){
        return (<div className="DesktopCreateIcon">
            <div className="CloseDirectory" onClick={this.closeAddingForm}>x</div>
            <input placeholder="Enter URL" type='text' id="desktop_create_icon" ref={input => {this.data = input;}}/>
            <button onClick={this.createIcon}>Add Icon</button>
        </div>);
    }

    renderAddDirectoryForm(){
        return (<div className="DesktopCreateIcon">
            <div className="CloseDirectory" onClick={this.closeAddingForm}>x</div>
            <input placeholder="Enter Name" type='text' id="desktop_create_icon" ref={input => {this.data = input;}}/>
            <button onClick={this.createIcon}>Add Directory</button>
        </div>);
    }

    render(){
        if(this.props.info.icon_type === 0){
            return this.renderAddIconForm();
        } else {
            return this.renderAddDirectoryForm();
        }
    };
}
export default connect(null, actions)(DesktopCreateIcon);
