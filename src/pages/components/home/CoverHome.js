import React from 'react';
import Cover from '../ui-components/regulonDB-web/Cover'
import Link from '../ui-components/basicInput/Link';
import SearchTool from '../search/SearchTool'
import LinksInfo from './linksCover.json'


const urlVideCover = 'https://dl.dropboxusercontent.com/s/x0j4yfd20cov0bh/Bacteria%20Animation%2020.mp4?dl=0'

const links = LinksInfo.links

const CoverHome = () => {
    return ( 
        <>
            <Cover title="RegulonDB database" coverType="video" source={urlVideCover} >
                <h2 style={styleSubtitle}>
                Escherichia coli K-12 <br/>
                Transcriptional Regulatory Network
                </h2>
                <SearchTool />
                <br/>
                <br/>
                <br/>
                <div>
                    {
                        links.map((link) => {
                            return(
                                <div key={link.link} style={{float: "left"}}>
                                    <Link style={{paddingLeft: "20px"}} href={link.link} regulonStyle={"simple"}>{link.title}</Link>
                                </div>
                            )
                        })
                    }
                    
                </div>
            </Cover>
        </>
     );
}

const styleSubtitle = {
    fontFamily: "verdana",
    fontSize: "3vmin",
    textShadow: "1px 1px 2px #000000",
    fontStyle: "italic",
    fontWeight: "bolder"
}
 
export default CoverHome;