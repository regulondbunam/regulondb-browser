import React from 'react';
import ModalER from '../utiles/ModalEvidenceRef'

export default function AllCitations(allCitations,small=true,title=false,index=false,) {
    // [i]autor., et al. año [evidence]
    return (
        <>
           {title?<h2>Publications and Evidences</h2>:null}
            <table>
                <tbody>
                    {
                        allCitations.map((cit,indx) => {
                            const publication = cit.publication
                            return(
                                <tr key={publication.id}>
                                    <td>
                                        {index?`[${indx}]`:null}
                                        <ModalER 
                                            classNameModal="citation" 
                                            title={small?Citation(cit):publication.citation} 
                                            cit={cit}
                                        />
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>

        </>
    )
}

export function Citation(cit) {
    const publication = cit.publication
    const eviCode = cit.evidence?.code
    const id = publication?.id
    const citation = publication?.citation.split(',')
    console.log(citation)
    return `${citation[0]}., et al. ${citation[citation.length-2]}, [${()=>{}}]`
    // [i]autor., et al. año [evidence]
}
