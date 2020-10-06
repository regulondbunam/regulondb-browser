import React from 'react';
import MainMenu from './components/mainMenu/MainMenu'
import MenuData from '../../conf/layout/menu/menu.conf'
import {isMobile} from 'react-device-detect'

const menuData = MenuData.menu

const Menu = () => {
    return (
        <nav style={{float: "none"}}>
            {
                isMobile
                ?null
                :<MainMenu menuData={menuData} />
            }
            
        </nav>
     );
}
 
export default Menu;