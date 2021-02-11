import React from "react";
import {Button,  IconButton } from '../../../components/ui-components/ui_components'

const MenuButtons = ({ menuData, idPressed, isPressed, dropMenu, getId }) => {
    return (
        <>
            {
                menuData.map((Item) => {
                    
                    switch (Item.type) {
                        case "HOME":
                            return <div key={Item.id}>{HomeButton(Item.link)}</div>
                        default:
                            return (
                                <div key={Item.id}>
                                    <MenuButton
                                        id={Item.id}
                                        title={Item.title}
                                        dropMenu={dropMenu}
                                        getId={getId}
                                        isPressed={idPressed === Item.id && isPressed }
                                    />
                                </div>
                            )
                    }

                })
            }

        </>
    );
}


const MenuButton = ({ id, title, dropMenu, getId, isPressed }) => {
    let buttonStyle = {}
    if (isPressed) { buttonStyle = { backgroundColor: "#72a7c7" } }
    function hover() {
        getId(id)
    }
    function onClick(){
        dropMenu()
    }
    return (
        <div style={styleMenu} onMouseOver={hover}>
            <Button label={title} style={Object.assign({}, buttonStyle, styleMenuButton)} onClick={onClick} />
        </div>
    );
}


/* Funcion utilizada para validar la esturctura del objeto menuData
function TestMenuData(menuData, propiedad){
    return typeof menuData !== 'undefined' && menuData.hasOwnProperty(propiedad);
  }

*/


function HomeButton(homeLink) {

    return (
        <div style={styleHome}>
            <a style={{ textDecoration: "none" }} href={homeLink}>
                <IconButton icon={"home"} style={styleHomeButton} iconStyle={{ fontSize: "50px" }} />
            </a>
        </div>
    )
}

export { MenuButtons, MenuButton, HomeButton}


const styleHome = {
    float: "left",
    paddingRight: "2%"
}

const styleHomeButton = {
    width: "60px",
    height: "60px",
    border: "solid 3px #ffffff"
}

const styleMenu = {
    float: "left",
    paddingRight: "1%"
}
const styleMenuButton = {
    fontSize: "14px",
    width: '110px',
    height: "60px",
    fontFamily: "Arial"
}

