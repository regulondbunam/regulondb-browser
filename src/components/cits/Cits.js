import React from 'react';
import ModalER from '../utiles/ModalEvidenceRef'

export default function AllCitations(allCitations,small=true,title=false,index=false,) {
    // [i]autor., et al. año [evidence]
    //console.log(allCitations)
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
                                <tr key={`${indx}-${publication.id}`}>
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

export function relCitation(allCitations,idCit,index=true,small=true){
    const re = /RDB[A-Z]{7}[0-9]{5}/
    let cits = []
    let nidCits = idCit
    //console.log(idCit)
    do {
        let cit = re.exec(nidCits)
        //console.log(cit)
        if(cit){
            cits.push(cit[0])
            nidCits = nidCits.substring((cit['index']+cit[0].length),idCit.length)
        }else{
            break
        } 
    }while(true)
    //console.log(allCitations)
    return(
        <>
        {
            cits.map((cit)=>{
                const fullCit = allCitations.find(element => element?.publication?.id === cit)
                const ind = allCitations.findIndex(element => element?.publication?.id === cit)+1
                return <ModalER key={`${cit}-${ind}`}
                classNameModal="citation" 
                title={`[${ind}]${Citation(fullCit,small)}`} 
                cit={fullCit}
            />
            })
        }
        </>
    )
    
}

export function Citation(cit,small=true) {
    //W->weak S->strong
    const publication = cit.publication
    const evidence = cit.evidence
    const eviCode = evidence?.code
    //const id = publication?.id
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
