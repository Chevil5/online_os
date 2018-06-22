import React, { Component } from 'react';
import DesktopColumn from './DesktopColumn';

import axios from 'axios';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';



class Desktop extends Component {

    constructor(props) {
        super(props);
        this.state = {
            desktop: false
        }
    }

    async componentDidMount(){
        this.setState({
            desktop: await this.getUsersDesktop(1)
        })
    }

    async getUsersDesktop(userId){
        const desktop = await axios.get('/desktop?userId='+userId);
        return desktop.data;
    }


    render(){
        return (
            <div>
                {Array.from(Array(10).keys()).map((column) => {
                    return (<DesktopColumn key={column+"column"} column={column} className="column" style={{width:"100px", float:"left"}} desktop={this.state.desktop} />);
                })}
            </div>
        );
    }
}

export default DragDropContext(HTML5Backend)(Desktop);
