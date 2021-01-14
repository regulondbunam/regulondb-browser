import React from 'react';
import ModalER from '../ui-components/web/components/utiles/ModalEvidenceRef'


export default function AllCitations(allCitations, small = true, title = false, index = false,) {
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

export function relCitation(allCitations, idCit, index = true, small = true) {
    const re = /RDB[A-Z]{7}[0-9]{5}/
    let cits = []
    let nidCits = idCit
    //console.log(idCit)
    do {
        let cit = re.exec(nidCits)
        if (cit) {
            cits.push(cit[0])
            nidCits = nidCits.substring((cit['index'] + cit[0].length), idCit.length)
        } else {
            break
        }
    } while (true)
    //console.log(allCitations)
    return (
        cits.map((cit) => {
            const fullCit = allCitations.find(element => element?.publication?.id === cit)
            const index = allCitations.findIndex(element => element?.publication?.id === cit) + 1
            const publication = fullCit?.publication?.citation
            const url = fullCit?.publication?.url
            // 
            return `<a class='citation' data-tip='${publication}' target="_blank" rel="noopener noreferrer" href="${url}">[${index}]${Citation(fullCit, small)}</a>&nbsp;`
        }).join(' ')
    )

}

export function Citation(cit, small = true) {
    
    //W->weak S->strong
    const publication = cit?.publication
    const evidence = cit?.evidence
    const eviCode = evidence?.code
    //const id = publication?.id
    const citation = publication?.citation.split(',')
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
        return `${citation[0]}., et al. ${year?year:''} ${code()}`
    }
    return `${publication?.citation}, ${code()}`
    // [i]autor., et al. año [evidence]
}
