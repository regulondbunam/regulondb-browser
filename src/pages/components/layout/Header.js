import React from 'react';
import Image from '../ui-components/infoDisplay/media/Image'
import Link from '../ui-components/basicInput/HLink'
import SearchTool from '../search/SearchTool'
import { withRouter } from 'react-router-dom';

const log = 'https://dl.dropboxusercontent.com/s/enusst8em5oxcah/RegulonLogo.png?dl=0'

const Header = ({
    location
}) => {
    const isHome = location.pathname === "/home" || location.pathname === "/"
    console.log(location.pathname)
    console.log(isHome)
    return (
        <div style={StyleHeader}>
            <div style={StyleSide}>
                <Image id={"logoRegulon"} urlImage={log} imgStyle={{ maxWidth: "239px", maxHeight: "48px" }} />
            </div>
            <div style={StyleSideB}>
                {
                    !isHome
                        ? <SearchTool styleBox={styleBox} styleButton={styleButton} />
                        : <>
                            <Link regulonStyle="accent">Terms & conditions</Link>
                            <Link style={{ paddingLeft: "10px" }} regulonStyle="accent">Contac US</Link>
                            <Link style={{ paddingLeft: "10px" }} regulonStyle="accent">Funding</Link>
                        </>
                }
            </div>

        </div>
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