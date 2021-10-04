import React from 'react'
import { Link } from 'react-router-dom'
import { CitationsNote } from '../../../../components/citations/citations_note'
import {CitationCONTEXT} from '../../../../components/citations/citations_provider'


export const TUdescription = ({conf, data_tu, id_tu }) => {
    try {
        return (
            <>
            <h2>{conf?.title}</h2>
                <p style={{marginLeft: "5%"}} dangerouslySetInnerHTML={{__html: conf?.description}} />
                <h3>{data_tu?.name}</h3>
                <p style={{marginLeft: "5%"}} dangerouslySetInnerHTML={{ __html: CitationsNote(CitationCONTEXT,data_tu?.note) }} />
                <div style={{marginLeft: "5%"}} >
                <table style={{ tableLayout: "fixed", width: "auto" }} >
                    <tbody>
                        {
                            notNull(data_tu?.synonyms,
                            <tr>
                            <td style={{ fontWeight: "bold" }}>synonyms</td>
                            <td>{
                                data_tu.synonyms.map((s)=>{
                                    return ` ${s}`
                                }).join(",")
                                }</td>
                            </tr>
                            )
                        }
                        {
                             notNull(data_tu?.firstGene?.gene_id,
                                <tr>
                                <td style={{ fontWeight: "bold" }}>firstGene</td>
                                <td>
                                    <Link style={{paddingRight: '10px'}} key={`link_gene${data_tu?.firstGene?.gene_id}`} to={`/gene/${data_tu?.firstGene?.gene_id}`}
                                    onMouseEnter={()=>{
                                        let gn = document.getElementById(`${data_tu?.firstGene?.gene_id}#tu_Canva${id_tu}`)
                                        if(gn){
                                            gn.setAttribute("stroke","#00F");
                                            gn.setAttribute("stroke-width", "5");
                                        }
                                    }}
                                    onMouseLeave={()=>{
                                        let gn = document.getElementById(`${data_tu?.firstGene?.gene_id}#tu_Canva${id_tu}`)
                                        if(gn){
                                            gn.setAttribute("stroke","");
                                            gn.setAttribute("stroke-width", "0");
                                        }
                                    }}
                                    >{data_tu?.firstGene?.gene_name}</Link>
                                    </td>
                                </tr>
                                )
                        }
                        <tr>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
                </div>
                
            </>
        )
    } catch (error) {
        console.error(error)
    }
    return (
        <>
            no tu data
        </>
    )
}


function notNull(data,element) {
    //console.log(data)
    if (data === null || data.length < 1 || data === "" || data === undefined  ) {
        return null
    }
    return element
}
