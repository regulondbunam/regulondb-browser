
import ModalER from "../ui-components/web/components/utiles/ModalEvidenceRef";
import React, { Component } from 'react'

export default class citations extends Component {
    render() {
        return (
            <div>
                
            </div>
        )
    }
}




export function Citation(cit, small = true) {
    
    //W->weak S->strong
    
    const publication = cit?.publication
    const citation = publication?.citation
    const evidence = cit?.evidence
    const eviCode = evidence?.code
    //const id = publication?.id
    
    const authors = publication?.authors
    const year = publication?.year
    
    const code = () => {
        if (eviCode) {
            if (evidence.type === 'S') {
                return `<b>[${eviCode}]</b>`
            }
            return `[${eviCode}]`
        }
        return ''
    }
    if (small) {
        if(authors[0]){
            return `${authors[0]}., et al. ${year?year:''} ${code()}`
        }
        return `${code()}`.trim()
    }
    return `${citation?`${citation},`:''} ${code()}`
    // [i]autor., et al. año [evidence]
}

export function AllCitations2(allCitations, small = true, title = false, index = false,) {
    // [i]autor., et al. año [evidence]
    //console.log(allCitations)
    return (
        <>

            <table>
                <tbody>
                    <tr>
                        <td>{title ? <h2>References and Evidences</h2> : null}</td>
                    </tr>
                    {

                        allCitations.map((cit, indx) => {
                            const publication = cit.publication
                            return (
                                <tr key={`${indx}-${publication.id}`}>
                                    <td>
                                        {index ?`[${indx + 1}]` : null}
                                        <ModalER
                                            classNameModal="citation"
                                            title={`${Citation(cit, small)}`}
                                            cit={cit}
                                        />
                                    </td>
                                </tr>
                            )


                        })
                    }
                </tbody>
            </table>
            <br/>
            <br/>
        </>
    )
}