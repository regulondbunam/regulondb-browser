import { Component } from 'react';
import MenuData from './conf/menu/menu.conf'
import MenuBody from './components/menu/menu_body'
import { MenuButtons } from "./components/menu/menu_buttons";
//import {Button,  IconButton } from '../../../components/ui-components/ui_components'



const menuData = MenuData.menu

const Menu = () => {
    return (
        <nav style={{float: "none"}}>
            <MainMenu menuData={menuData} />
        </nav>
     );
}
 
export default Menu;

class MainMenu extends Component {
    state = { idPressed: "", isPressed: false }

    DropMenu = () => {
        this.setState({ isPressed: !this.state.isPressed })
    }

    SetIdMenu = (id) => {
        this.setState({ idPressed: id})
    }

    CloseMenu = () => {
        this.setState({ isPressed: false, idPressed: "" })
    }

    render() {
        const {
            menuData
        } = this.props

        const {
            idPressed,
            isPressed
        } = this.state

        let menuButton = () => {
            return <></>
        }
        if (typeof menuData !== 'undefined') {
            menuButton = () => {
                return <MenuButtons menuData={menuData} idPressed={idPressed} isPressed={isPressed} dropMenu={this.DropMenu} getId={this.SetIdMenu} />
            }
        }
        let menuBody = () => {
            return <></>
        }
        if (isPressed) {
            menuBody = () => {
                return <MenuBody menuData={menuData} id={idPressed} close={this.CloseMenu} />
            }
        }
        return (
            <div style={{width:"100%"}} onMouseLeave={this.CloseMenu}>
                <div style={styleBar}>
                    {menuButton()}
                </div>
                <div>
                    { menuBody() }
                </div>
            </div>
        );
    }
}

const styleBar = {
    paddingLeft: "10%",
    backgroundColor: "#32617d",
    height: "60px"
}