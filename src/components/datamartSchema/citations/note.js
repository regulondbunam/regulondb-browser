import { labelCitation } from "./label"

export function relCitation(allCitations, idCit, small = true) {
    const re = /RDBECOLI(PRC|EVC)[0-9]{5}/
    if (!re.exec(idCit)) {
        return ""
    }
    const id_cit = re.exec(idCit)[0]
    let index
    try {
        index = allCitations.findIndex(element => element?.publication?._id === id_cit)
        if (!index) {
            return ""
        }
    } catch (error) {
        console.error("error: "+idCit,error);
        return ""
    }
    const fullCit = allCitations[index]
    let publication = ""
    let url = ""
    if (fullCit?.publication) {
        publication = fullCit?.publication?.citation 
        url = fullCit?.publication?.url  
    }else{
        console.log(index);
        return ""
    }
    return `<a class='citation' data-tip='${publication}' target="_blank" rel="noopener noreferrer" href="${url}">${labelCitation({ publication: fullCit.publication, evidence: fullCit.evidence, index: index+1 })}</a>&nbsp;`
}

export const NoteCitations = (allCitations, note) => {
    const REX = /\[\s*RDBECOLI(PRC|EVC)[0-9]{5}\]/
    const PP = /(\|CITS:)|\|\./
    if (PP.exec(note)) {
        while (PP.exec(note)) {
            note = note.replace(PP, ' ')
        };
        while (REX.exec(note)) {
            note = note.replace(REX, relCitation(allCitations, REX.exec(note)[0]))
        };
    }
    return note
}