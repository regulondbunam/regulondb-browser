import Cover from './components/cover/cover'
//import SearchTool from '../search/tools/search_box'
import InputSearch from '../search/InputSearch'
import LinksInfo from './conf/linksCover.json'

const links = LinksInfo.links

const CoverHome = ({
    conf
}) => {
    const cover_info = conf?.cover
    return ( 
        <>
            <Cover conf={cover_info} coverType={cover_info.type} color={cover_info.color} >
                <h1 style={styleTitle}>{conf.title}</h1>
                <h2 style={styleSubtitle} dangerouslySetInnerHTML={{__html: conf.subtitle}} />
                <br/>
                <br/>
                <InputSearch />
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

// eslint-disable-next-line no-unused-vars
const styleBox = {
    width: "90%"
}

const styleTitle = {
    margin: "0",
    fontSize: "6vmin",
    fontFamily: "sans-serif",
    fontWeight: "bold",
    textShadow: "2px 2px 4px #000000",
    color: "white"
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