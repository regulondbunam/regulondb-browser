import React from 'react';
import MainMenu from '../ui-components/regulonDB-web/MainMenu'
import MenuData from '../../../mainmenu.json'

const menuData = MenuData.mainmenu

const Menu = () => {
    return ( 
        <MainMenu menuData={menuData} />
     );
}
 
export default Menu;