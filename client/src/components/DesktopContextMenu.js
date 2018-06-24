import React, {Component} from 'react';

class DesktopContextMenu extends Component {

    renderMenuForItem(){
        return <div className="desktop_context_menu" style={{width: "50px", position: "absolute", right: "-55px", top: "17px", background: "white", padding: "5px", border: "2px solid black","zIndex":"2"}}><p>Delete icon</p></div>;
    };

    renderMenuForRow(){
        return <div className="desktop_context_menu" style={{width: "50px", position: "absolute", right: "-55px", top: "17px", background: "white", padding: "5px", border: "2px solid black","zIndex":"2"}}><p>Add icon</p></div>;
    };

    render() {
        let menu = this.renderMenuForRow();
        if(this.props.item){
            menu = this.renderMenuForItem();
        }

        return menu;
    }
}

export default DesktopContextMenu;