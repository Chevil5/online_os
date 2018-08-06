import React, { Component } from 'react';
import DesktopColumn from './DesktopColumn';
import DesktopCreateIcon from './DesktopCreateIcon';
import DesktopEditIcon from './DesktopEditIcon';
import DesktopChangeBackground from './DesktopChangeBackground';
import * as actions from '../actions';
import {connect} from 'react-redux';
import {findDOMNode} from "react-dom";
import {DropTarget} from "react-dnd/lib/index";
import {fetchUser} from "../actions";

const directoryTarget = {
    hover(props, monitor, component) {
        let newStyle = {};
        newStyle.left = monitor.getSourceClientOffset().x;
        newStyle.top = monitor.getSourceClientOffset().y;
        newStyle.opacity = 1;
        newStyle.zIndex = 1;
        newStyle.dir_id = monitor.getItem().props.dir_id;
        props.moveDirectory(newStyle);
        return props;
    },

    drop(props, monitor, component) {
        let newStyle = {};
        newStyle.left = monitor.getSourceClientOffset().x;
        newStyle.top = monitor.getSourceClientOffset().y;
        newStyle.opacity = 1;
        newStyle.zIndex = 1;
        props.moveDirectory(newStyle);
        return props;
    }
};
function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver()
    };
}

class Desktop extends Component {

    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.login = this.login.bind(this);
    }

    async componentDidMount(){
        this.props.fetchDesktop({dir_id: 0});
    }

    onClick(){
        this.props.showContextMenu(false);
    }

    async login() {
        await this.props.login({username: this.refs.username.value, password: this.refs.password.value});
        await this.props.fetchUser();
    }

    render(){
        let modal_window = "";
        const { connectDropTarget } = this.props;

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
            if(this.props.adding_form.info.type === "change_background"){
                modal_window = <DesktopChangeBackground/>
            }
        }

        const height = window.innerHeight;

        let content = "";
        if(Number(this.props.desktop) === 404){
            content = <div className="LoginForm" style={{height:height}}><form onSubmit={(e)=> {e.preventDefault(); this.login()}}>
                <input type='text' ref="username" name="username" placeholder="Name"/>
                <input type='password' ref="password" name="password" placeholder="Password"/>
                <input className="login_submit" type='submit' value="Login"/>
            </form></div>
        } else {
            content = Array.from(Array(20).keys()).map((column) => {
                return (<DesktopColumn dir_id="0" height={height} width="5%" desktop={this.props.desktop} key={column+"column"} column={column}/>);
            });
        }
        return connectDropTarget(
            <div onClick={this.onClick} className="Desktop" style={{height,backgroundImage: "url("+(this.props.user && this.props.user.image?'/images/'+this.props.user.image:'/images/desktop.jpg')+")"}}>
                {modal_window}
                {content}
            </div>
        );
    }
}
function mapStateToProps({desktop, adding_form, user}) {
    if(desktop !== null){
        desktop = desktop.data;
    };
    return {desktop, adding_form, user};
}

export default connect(mapStateToProps, actions)(DropTarget("directory", directoryTarget, collect)(Desktop));
