import React, { Component } from 'react';
import {findDOMNode} from 'react-dom'
import { DropTarget } from 'react-dnd';
import { connect } from 'react-redux';

import DesktopIcon from './DesktopIcon';
import DesktopContextMenu from './DesktopContextMenu';
import * as actions from '../actions';




const rowTarget = {
    drop(props, monitor, component) {
        findDOMNode(component).classList.remove("HoveredRow");

        props.updateIconNumber(1, props.icon, props.number, props.dir_id).then();
        if(Number(props.icon.dir_id) !== Number(props.dir_id)){
            setTimeout(() => {
                if(Number(props.icon.dir_id) === 0){
                    props.fetchDesktop({user_id:1, dir_id:0});
                } else {
                    props.fetchDirectory({user_id:1, dir_id: props.icon.dir_id});
                }
            }, 100)
        }
    },

    hover(props, monitor, component){
        for (let i = 0; i < document.getElementsByClassName("DesktopRow").length; i++){
            document.getElementsByClassName("DesktopRow")[i].classList.remove("HoveredRow")
        };
        findDOMNode(component).classList.add("HoveredRow");
    }

};
function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver()
    };
}

class DesktopRow extends Component{

    constructor(props) {
        super(props);

        // This binding is necessary to make `this` work in the callback
        this.onRightClick = this.onRightClick.bind(this);
    }

    //Event handlers
    onRightClick(event){
        this.props.showContextMenu({number: this.props.number, dir_id: this.props.dir_id});
        event.preventDefault();
    }

    renderDesktopItem(item){
        return <DesktopIcon dir_id={this.props.dir_id} key={item.name} item={item}/>
    }
    render (){
        const { connectDropTarget, isOver } = this.props;
        let contextMenu = "";
        if(this.props.context_menu && this.props.context_menu.number === this.props.number && this.props.context_menu.dir_id === this.props.dir_id){
            contextMenu = <DesktopContextMenu dir_id={this.props.dir_id} number={this.props.number} item={this.props.item?this.props.item:false}/>;
        }

        return connectDropTarget(<div onContextMenu={event => {this.onRightClick(event)}} key={this.props.number +"row"} style={{height: window.innerHeight/7}} className="DesktopRow" id={"row"+this.props.number}>{this.props.item?this.renderDesktopItem(this.props.item):this.props.item}{isOver}{contextMenu}</div>)
    }
}

let ItemTypes = {
    ICON: 'icon'
};
function mapStateToProps({icon, context_menu}) {
    return {icon, context_menu};
}
export default connect(mapStateToProps, actions)(DropTarget(ItemTypes.ICON, rowTarget, collect)(DesktopRow));
