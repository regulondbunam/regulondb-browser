import {Image} from '../components/ui-components/ui_components'
import SearchTool from '../apps/search/tools/search_box'
import {Schema, ImageObject} from '../components/schemas/schemas'
import conf from './conf/header.conf.json'

const Header = ({
    isHome,
    urlPage
}) => {
    return (
        <header style={StyleHeader}>
            <div style={StyleSide}>
                <Image id={conf.logos[0].id} imgTitle={conf.logos[0].title} imgAlt={conf.logos[0].description} urlImage={`${urlPage}${conf.logos[0].url}`} imgStyle={{ maxWidth: "239px", maxHeight: "48px" }} />
                <Schema jsonLd={ImageObject({name: conf.logos[0].title, description:conf.logos[0].description, url:`${urlPage}${conf.logos[0].url}`, representativeOfPage: "true"})}/>
            </div>
            <div style={StyleSideB}>
                {
                   !isHome
                   ? <SearchTool styleBox={{}} styleButton={{}} />
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


export default Header;

/**
 *  
 * <div style={StyleSide}>
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
 */