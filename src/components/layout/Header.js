import React from 'react';
import logo from '../../resources/image/layout/header/RegulonLogo.png'
import Image from '../ui-components/infoDisplay/media/Image'
import SearchTool from '../apollo/searchTool/SearchTool'
import { withRouter } from 'react-router-dom';


const Header = ({
    location,
}) => {
    const isHome = location.pathname === "/home" || location.pathname === "/"
    return (
        <header style={StyleHeader}>
            <div style={StyleSide}>
                <Image id={"logoRegulon"} imgTitle="RegulonDB logo" imgAlt="Logo of Regulon DB" urlImage={logo} imgStyle={{ maxWidth: "239px", maxHeight: "48px" }} />
            </div>
            <div style={StyleSideB}>
                {
                   !isHome
                   ? <SearchTool styleBox={styleBox} styleButton={styleButton} />
                   : <>
                       <a className="aAccent" href="/TermsConditions">Terms and conditions</a>
                       <a className="aAccent" href="/Contact" style={{ paddingLeft: "10px" }} >Contact US</a>
                       <a className="aAccent" href="/Funding" style={{ paddingLeft: "10px" }} >Funding</a>
                   </>
                }
            </div>
        </header>
    );
}

const StyleHeader = {
    content: "",
    display: "flex",
    clear: "both",
    marginLeft: "10%"
}

const StyleSide = {
    width: "60%",
    float: "left",
}
const StyleSideB = {
    width: "40%",
    float: "left",
}

const styleBox = {

}
const styleButton = {

}



export default withRouter(Header);

/**
 *  
 */