import React, {Component} from 'react';
import * as actions from '../actions/index';
import {connect} from 'react-redux';

class DesktopCreateIcon extends Component {

    constructor(props) {
        super(props);
        this.createIcon = this.createIcon.bind(this);
    }
    createIcon(){
        this.props.createIcon(1, this.icon_url.value, this.props.number);
        this.props.showAddingForm(false, false);
    }
    render(){
        return (<div className="DesktopCreateIcon">
            <input placeholder="Enter URL" type='text' id="desktop_create_icon" ref={input => {this.icon_url = input;}}/>
            <button onClick={this.createIcon}>Add</button>
        </div>);
    };
}
export default connect(null, actions)(DesktopCreateIcon);
