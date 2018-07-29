import React, {Component} from 'react';
import * as actions from '../actions/index';
import {connect} from 'react-redux';
import {DropTarget} from "react-dnd/lib/index";


class DesktopChangeBackground extends Component{
    constructor(props) {
        super(props);
        this.fileChangeHandler = this.fileChangeHandler.bind(this);
        this.changeBackground = this.changeBackground.bind(this);
        this.closeAddingForm = this.closeAddingForm.bind(this);

    }

    fileChangeHandler(event) {
        this.background = event.target.files[0];
        const formData = new FormData();
        formData.append('myFile', this.background, this.background.name);
        this.props.checkBackground(formData);
    }

    changeBackground() {
        this.props.changeBackground(this.props.background);
    }

    closeAddingForm(){
        this.props.showAddingForm(false, {type: 'change_background'});
    }

    render(){
        return (<div className="DesktopChangeBackground">
            <div className="CloseDirectory" onClick={this.closeAddingForm}>x</div>
            <img src={'/images/'+(this.props.background||this.props.user.image)}/>
            <form onSubmit={(e) => {e.preventDefault();this.changeBackground()}}>
                <div><input type="file" onChange={this.fileChangeHandler}/></div>
                <div><input className="create_submit" type="submit" value="Change"/></div>
            </form>
        </div>);
    }
}

function mapStateToProps({user, background}) {
    return {user, background};
}

export default connect(mapStateToProps, actions)(DesktopChangeBackground);
