import React from 'react'
import { Link } from 'react-router-dom'

const thStyle = {
    fontWeight: "bold",
    borderBottom: "1px solid #72A7C7",
    textAlign: "inherit",
}
const trStyle = {
    borderBottom: "1px solid #66666666",
    textAlign: "inherit",
}

export function Multifun(multifun = [], title = true) {
    if (!multifun || multifun.length === 0) {
        return null
    }
    return (
        <table style={{ margin: "1% 0% 0px 5%" }}>
            {
                title
                    ? <thead>
                        <tr style={thStyle} >
                            <th><h4 style={{ margin: "0" }} >Multifun</h4></th>
                        </tr>
                    </thead>
                    : null
            }
            <tbody>
                <tr>
                    <td>
                        <table>
                            <thead>
                                <tr style={thStyle}>
                                    <th>Name</th>
                                    <th>Genes</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    multifun.map((fun) => {
                                        return (
                                            <tr className={"trShadow"} style={trStyle} key={`multifunT_${fun.id}`}>
                                                <td>{fun.name}</td>
                                                <td>
                                                    {
                                                        Genes(fun.genes)
                                                    }
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}

function Genes(genes) {
    try {
        return (
            <div>
                {
                    genes.map(gen => {
                        return (
                            <div key={`geneROI_${gen?.gene_id}`}>
                                <Link to={`/gene/${gen?.gene_id}`}>{gen?.gene_name}</Link>
                            </div>
                        )
                    })
                }
            </div>
        )
    } catch (error) {
        console.log("multifun genes error:", error)
        return null
    }
}