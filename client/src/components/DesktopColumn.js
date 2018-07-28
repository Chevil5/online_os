import React, {Component} from 'react';
import DesktopRow from './DesktopRow';


class DesktopColumn extends Component {

    getDesktopItemByNumber(desktop, number){
        for(let i = 0; i<desktop.length;i++){
            if(desktop[i].number === number){
                return desktop[i];
            }
        }
    }

    render(){
        const rowCount = this.props.dir_id === "0"?7:5;
        const desktop = this.props.desktop;
        const column = this.props.column;
        return (<div key={column+"column"} style={{width:this.props.width}} className="DesktopColumn">{Array.from(Array(rowCount).keys()).map(row => {
            let row_number = row + (column*rowCount);
            return (<DesktopRow height={this.props.height/rowCount} dir_id={this.props.dir_id} key={row_number +"row"} number={row_number} item={desktop?this.getDesktopItemByNumber(desktop, row_number):false}/>)
        })}</div>)
    }
}

export default DesktopColumn;