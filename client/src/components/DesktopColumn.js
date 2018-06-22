import React, {Component} from 'react';
import DesktopRow from './DesktopRow';
import DesktopIcon from './DesktopIcon'

class DesktopColumn extends Component {
    getDesktopItemByNumber(number){
        return this.state.desktop.map(item => {
            if(item.number === number){
                return this.renderDesktopItem(item);
            } else {
                return false;
            }
        })
    }

    renderDesktopItem(item){
        return <DesktopIcon key={item.name} item={item}/>
    }
    render(){
        return (<div key={this.props.column+"column"} className="column" style={{width:"100px", float:"left"}}>{Array.from(Array(10).keys()).map(row => {
            let row_number = row + (this.props.column*10);
            return (<DesktopRow key={row_number +"row"} className="row" number={row_number} item={typeof this.props.desktop.length !== 'undefined'?this.getDesktopItemByNumber(row_number):""}></DesktopRow>)
        })}</div>)
    }
}

export default DesktopColumn;