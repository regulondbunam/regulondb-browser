import React from 'react'
import { Link } from 'react-router-dom'


export const TUgenes = ({conf, data_tu, id_tu}) => {
    try {
        return (
            <>
                <h2>{conf?.title}</h2>
                <p style={{ marginLeft: "5%" }} dangerouslySetInnerHTML={{ __html: conf?.description }} />
                <div style={{ marginLeft: "5%" }}>
                    {
                        data_tu.genes.map((gene) => {
                            console.log(gene)
                            return <Link key={`link_gene${gene.id}`}
                                style={{ paddingRight: '10px' }}
                                to={`/gene/${gene.id}`}
                                onMouseEnter={()=>{
                                    let gn = document.getElementById(`${gene.id}#tu_Canva${id_tu}`)
                                    console.log(`${gene.id}#tu_Canva${id_tu}`)
                                    if(gn){
                                        gn.setAttribute("stroke","#00F");
                                        gn.setAttribute("stroke-width", "5");
                                    }
                                }}
                                onMouseLeave={()=>{
                                    let gn = document.getElementById(`${gene.id}#tu_Canva${id_tu}`)
                                    console.log(`${gene.id}#tu_Canva${id_tu}`)
                                    if(gn){
                                        gn.setAttribute("stroke","");
                                        gn.setAttribute("stroke-width", "0");
                                    }
                                }}
                            >
                                {gene.name}
                            </Link>
                        })
                    }
                </div>
            </>

        )
    } catch (error) {
        console.log(error)
    }
    return <>no id</>
}
