import ReactDOM  from 'react-dom';

class Helper {
    static closeAllContextMenus(){
        const context_menu_items = document.getElementsByClassName('desktop_context_menu');
        if(context_menu_items.length){
            for (let i = 0; context_menu_items.length>i;i++){
                ReactDOM.unmountComponentAtNode(context_menu_items[i].parentNode);
            }
        }
    }
}

export default Helper;