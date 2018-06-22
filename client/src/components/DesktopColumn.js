import React, {Component} from 'react';
import DesktopRow from './DesktopRow';
import { connect } from 'react-redux';


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

        return (<div key={column+"column"} className="column" style={{width:"100px", float:"left"}}>{Array.from(Array(10).keys()).map(row => {
            let row_number = row + (column*10);
            return (<DesktopRow key={row_number +"row"} className="row" number={row_number} item={desktop?this.getDesktopItemByNumber(desktop, row_number):false}/>)
        })}</div>)
    }
}
function mapStateToProps({desktop}) {
    return {desktop};
}
export default connect(mapStateToProps)(DesktopColumn);