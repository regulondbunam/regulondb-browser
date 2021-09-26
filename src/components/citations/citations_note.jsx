import { useContext } from 'react'
import { Citation } from './citation'

export function relCitation(allCitations, idCit, index = true, small = true) {
    const re = /RDB[A-Z]*[0-9]*/
    let cits = []
    let nidCits = idCit
    //console.log(idCit)
    do {
        let cit = re.exec(nidCits)
        //console.log(nidCits)
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
            if(!fullCit){
                return null
            }
            // 
            return `<a class='citation' data-tip='${publication}' target="_blank" rel="noopener noreferrer" href="${url}">[${index}]${Citation(fullCit, small)}</a>&nbsp;`
        }).join(' ')
    )

}

export const CitationsNote = (CitationCONTEXT,note) => {
    const { allCitations } = useContext(CitationCONTEXT)
    let cit =''
    let newNote = note
    let partNote = []
    let cits = []
    try {
        const re = /\|.*?\|/
        do {
            cit = re.exec(newNote)
            if(cit){
                //console.log(cit)
                partNote.push(newNote.substring(0,cit['index']))
                cits.push(cit[0])
                newNote = newNote.substring((cit['index']+cit[0].length),newNote.length)
            }else{
                break
            } 
        }while(true)
    } catch (error) {
        console.log("util")
    }
    if(partNote.length === 0){
        return note
    }
    return partNote.map((n,index)=>{
                return `${n} ${relCitation(allCitations,cits[index])}`
            }).join('')
}