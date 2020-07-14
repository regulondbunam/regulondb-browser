import React from 'react';
import Cover from '../../components/ui-components/regulonDB-web/Cover'
import SearchTool from '../../components/search/SearchTool'
import LinksInfo from '../resources/linksCover.json'


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
                <SearchTool styleBox={styleBox}/>
                <br/>
                <br/>
                <div>
                    {
                        links.map((link) => {
                            return(
                                <div key={link.link} style={{float: "left"}}>
                                    <a style={{paddingLeft: "20px", color: "#ffffff"}} href={link.link}>{link.title}</a>
                                </div>
                            )
                        })
                    }
                </div>
                <br/>
            </Cover>
        </>
     );
}

const styleBox = {
    width: "90%"
}

const styleSubtitle = {
    margin: "0",
    fontFamily: "verdana",
    fontSize: "3vmin",
    textShadow: "1px 1px 2px #000000",
    fontStyle: "italic",
    fontWeight: "bolder",
    color: "#ffffff"
}
 
export default CoverHome;