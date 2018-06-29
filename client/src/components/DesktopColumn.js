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
        const desktop = this.props.desktop;
        const column = this.props.column;

        return (<div key={column+"column"} className="DesktopColumn">{Array.from(Array(7).keys()).map(row => {
            let row_number = row + (column*10);
            return (<DesktopRow dir_id={this.props.dir_id} key={row_number +"row"} number={row_number} item={desktop?this.getDesktopItemByNumber(desktop, row_number):false}/>)
        })}</div>)
    }
}

export default DesktopColumn;