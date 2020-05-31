import React from 'react';
import Image from '../ui-components/infoDisplay/media/Image'
import Link from '../ui-components/basicInput/Link'

const log = 'https://dl.dropboxusercontent.com/s/enusst8em5oxcah/RegulonLogo.png?dl=0'

const StyleHeader = {
    display: "flow-root",
    padding: "1% 10%"
}

const StyleLogo = {
    float: "left",
}


const StyleLinks = {
    justifyContent: "flex-end",
    display: "flex"
}

const Header = () => {
    return (
        <>
            <div style={StyleHeader}>
                <div style={StyleLogo}>
                    <Image id={"ASHJFKAas"} urlImage={log} imgStyle={{ maxWidth: "239px", maxHeight: "48px" }} />
                </div>
                <div>
                </div>
                <div style={StyleLinks}>
                    <Link  regulonStyle="accent">Terms & conditions</Link>
                    <Link style={{paddingLeft: "10px"}} regulonStyle="accent">Contac US</Link>
                    <Link style={{paddingLeft: "10px"}} regulonStyle="accent">Funding</Link>
                </div>
            </div>
        </>
    );
}

export default Header;