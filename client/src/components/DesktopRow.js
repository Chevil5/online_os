import React, { Component } from 'react';
import ReactDOM  from 'react-dom';
import { DropTarget } from 'react-dnd';
import { connect } from 'react-redux';

import DesktopIcon from './DesktopIcon';
import DesktopContextMenu from './DesktopContextMenu';
import * as actions from '../actions';
import Helper from '../helpers/Helper';




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
        Helper.closeAllContextMenus();
        ReactDOM.render(<DesktopContextMenu item={this.props.item?this.props.item:false}/>, this.currentRowElement);
        event.preventDefault();
    }


    renderDesktopItem(item){
        return <DesktopIcon key={item.name} item={item}/>
    }
    render (){
        const { connectDropTarget, isOver } = this.props;
        return connectDropTarget(<div onContextMenu={event => {this.onRightClick(event)}} key={this.props.number +"row"} className="row" id={"row"+this.props.number} style={{width:"100%", float:"left", height:"100px", border: "1px solid black", position: "relative"}}>{this.props.item?this.renderDesktopItem(this.props.item):this.props.item}{isOver}<div ref={div => {this.currentRowElement = div;}}></div></div>)
    }
}

let ItemTypes = {
    ICON: 'icon'
};
function mapStateToProps({icon}) {
    return {icon};
}
export default connect(mapStateToProps, actions)(DropTarget(ItemTypes.ICON, rowTarget, collect)(DesktopRow));
