import React from 'react';
import Link from '../../basicInput/Link'

const MenuBody = ({ menuData, id, close }) => {
    const submenuData = menuData.find(element => element.id === id)
    const content = submenuData.options
    return (
        <div style={styleMenuBody} >
            {
                content.map((Item) => {
                    switch (Item.type) {
                        case "SUBMENU":
                            return (
                                <div key={Item.id} style={styleSubmenu}>
                                    <Link href={Item.link} style={styleSubTitle}>{Item.title}</Link>
                                    {
                                        Item.options.map((Item) => {
                                            return (
                                                <div key={Item.link} style={{ paddingTop: "5%", paddingBottom: "5%" }}>
                                                    <Link style={styleLink} target={Item.target} href={Item.link}>{Item.title}</Link>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            )
                        case "LINK":
                            return (<div key={Item.link} style={styleSubmenu}>
                                <Link style={styleLink} target={Item.target} href={Item.link}>{Item.title}</Link>
                            </div>)
                        case "CARD":
                            return (<div></div>)
                        default:
                            return (<div></div>)
                    }
                }

                )
            }
            <br />
            <br />

        </div>
    );
}

const styleSubmenu = {
    float: "left",
    paddingLeft: "5%",
    paddingTop: "3%"
}

const styleMenuBody = {
    display: "flex",
    backgroundColor: "#72a7c7",
    boxShadow: "inset 0px -5px 5px 0px rgba(0,0,0,.5)",
    padding: "1% 10% 2% 10%",
    height: "auto"
}

const styleSubTitle = {
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "12",
    fontFamily: "sans-serif",
    color: "#1F3D4E"
}

const styleLink = {
    textDecoration: "none",
    fontSize: "16",
    fontFamily: "sans-serif",
    color: "#ffffff"
}
export default MenuBody