import { Link } from "react-router-dom"
import InputSearch from "../search/InputSearch"
import Style from "./style.module.css"

const searchLinks = [
    {
        label: "Genes",
        link: "/gene"
    },
    {
        label: "Operon",
        link: "/operon"
    },
    {
        label: "Regulon",
        link: "/regulon"
    },
    {
        label: "Sigmulon",
        link: "/sigmulon"
    },
    {
        label: "SRNA",
        link: "/srna"
    },
]

export function Cover(params) {
    return (
        <div className={Style.cover} >
            <div>
                <div className={Style.coverTop}>
                    <div className={Style.coverTitle}>
                        <h1 className={Style.coverH1} >The RegulonDB Browser</h1>
                        <h2 className={Style.coverH2} >Escherichia coli K-12 Transcriptional Regulatory Network</h2>
                    </div>
                    <div className={Style.coverComet} >
                        <div className={Style.coverCometText} >
                        Currently the best electronically-encoded regulatory network of any free-living organism.
                        </div>
                        <div className={Style.coverUnamLogo} >
                        </div>
                    </div>
                </div>
            </div>
            <div className={Style.coverBottom}>
                <div>
                    <InputSearch />
                </div>
                <div>
                    {searchLinks.map(link=>{
                        return (
                            <div key={"cover_link"+link} >
                                <Link to={link.link} >{link.label}</Link>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}