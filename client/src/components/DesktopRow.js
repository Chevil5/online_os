import React, { Component } from 'react';
import ReactDOM  from 'react-dom';
import { DropTarget } from 'react-dnd';
import DesktopIcon from './DesktopIcon';
import { connect } from 'react-redux';
import * as actions from '../actions';




const rowTarget = {
    drop(props, monitor) {
        props.updateIconNumber(1, props.icon, props.number)
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
        let menu = <div className="right_click_menu" style={{width: "50px", position: "absolute", right: "-55px", top: "17px", background: "white", padding: "5px", border: "2px solid black","zIndex":"2"}}><p>Add icon</p><p>Delete icon</p></div>;
        ReactDOM.render(menu, this.currentRowElement);
        event.preventDefault();
    }


    renderDesktopItem(item){
        return <DesktopIcon key={item.name} item={item}/>
    }
    render (){
        const { connectDropTarget, isOver } = this.props;
        return connectDropTarget(<div ref={div => {this.currentRowElement = div;}} onContextMenu={event => {this.onRightClick(event)}} key={this.props.number +"row"} className="row" id={"row"+this.props.number} style={{width:"100%", float:"left", height:"100px", border: "1px solid black", position: "relative"}}>{this.props.item?this.renderDesktopItem(this.props.item):this.props.item}{isOver}</div>)
    }
}

let ItemTypes = {
    ICON: 'icon'
};
function mapStateToProps({icon}) {
    return {icon};
}
export default connect(mapStateToProps, actions)(DropTarget(ItemTypes.ICON, rowTarget, collect)(DesktopRow));
