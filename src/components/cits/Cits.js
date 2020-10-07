import React from 'react';
import ModalER from '../utiles/ModalEvidenceRef'

export default function AllCitations(allCitations,small=true,title=false,index=false,) {
    // [i]autor., et al. año [evidence]
    return (
        <>
           
            <table>
                <tbody>
                    <tr>
                    {title?<h2>References and Evidences</h2>:null}
                    </tr>
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
    const code = () =>{
        if(eviCode){
            return `[${eviCode}]`
        }
        return ''
    }
    return `${citation[0]}., et al. ${citation[citation.length-2]}, ${code()}`
    // [i]autor., et al. año [evidence]
}
