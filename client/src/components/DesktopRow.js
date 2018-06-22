import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import DesktopIcon from './DesktopIcon';


const rowTarget = {
    drop(props, monitor) {
        console.log(props);
    }

};
function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver()
    };
}

class DesktopRow extends Component{
    renderDesktopItem(item){
        return <DesktopIcon key={item.name} item={item}/>
    }
    render (){
        const { connectDropTarget, isOver } = this.props;
        return connectDropTarget(<div key={this.props.number +"row"} className="row" id={this.props.number} style={{width:"100%", float:"left", height:"100px", border: "1px solid black"}}>{this.props.item?this.renderDesktopItem(this.props.item):this.props.item}{isOver}</div>)
    }
}

let ItemTypes = {
    ICON: 'icon'
};
export default DropTarget(ItemTypes.ICON, rowTarget, collect)(DesktopRow);
