import React from 'react';
import MainMenu from '../ui-components/regulonDB-web/MainMenu'
import MenuData from '../../../mainmenu.json'

const menuData = MenuData.mainmenu

const Menu = () => {
    return (
        <nav style={{float: "none"}}>
            <MainMenu menuData={menuData} />
        </nav>
     );
}
 
export default Menu;