import React from 'react';
import ModalER from '../utiles/ModalEvidenceRef'

export default function AllCitations(allCitations,small=true,title=false,index=false,) {
    // [i]autor., et al. año [evidence]
    return (
        <>
           
            <table>
                <tbody>
                    <tr>
                    <td>{title?<h2>References and Evidences</h2>:null}</td>
                    </tr>
                    {
                        allCitations.map((cit,indx) => {
                            const publication = cit.publication
                            return(
                                <tr key={publication.id}>
                                    <td>
                                        {index?`[${indx+1}]`:null}
                                        <ModalER 
                                            classNameModal="citation" 
                                            title={Citation(cit,small)} 
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

export function refCitation(allCitations,citations,index=true,small=true,title=false){

}

export function Citation(cit,small=true) {
    //W->weak S->strong
    const publication = cit.publication
    const evidence = cit.evidence
    const eviCode = evidence?.code
    const id = publication?.id
    const citation = publication?.citation.split(',')
    const code = () =>{
        if(eviCode){
            if(evidence.type==='S'){
                return `<b>[${eviCode}]</b>`
            }
            return `[${eviCode}]`
        }
        return ''
    }
    if(small){
        return `${citation[0]}., et al. ${citation[citation.length-2]}, ${code()}`
    }
    return `${publication?.citation}, ${code()}`
    // [i]autor., et al. año [evidence]
}
