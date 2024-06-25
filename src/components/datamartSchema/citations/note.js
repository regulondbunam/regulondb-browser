
import { labelCitation } from "./label"
import {CITATION_SIZE} from "."

/**
 * Description placeholder
 * @export
 * @param {object} allCitations - An object of all available citations.
 * @param {string} idCit - The identifier of the citation to search for.
 * @param {boolean} [small=true] - Indicates whether the citation reference will be small.
 * @returns {string}
 */
export function relCitation(allCitations, idCit, small = true) {
    const re = /RDBECOLI(PRC|EVC)[0-9]{5}/
    if (!re.exec(idCit)) {
        return ""
    }
    
    /**
     * Description placeholder
     * @type {string}
     */
    const id_cit = re.exec(idCit)[0]

    /**
     * Description placeholder
     * @type {string}
     */
    let index

    try {
        index = allCitations.findIndex(element => element?.publication?._id === id_cit)
        if (index === -1) {
            return ""
        }
    } catch (error) {
        console.error("error: "+idCit,error);
        return ""
    }

    
    /**
     * Description placeholder
     *
     * @type {*}
     */
    const fullCit = allCitations[index]

    /**
     * Description placeholder
     *  
     * @type {string}
     */
    let publication = ""

    
    /**
     * Description placeholder
     *
     * @type {string}
     */
    let url = ""
    if (fullCit?.publication) {
        publication = fullCit?.publication?.citation 
        url = fullCit?.publication?.url  
    }else{
        console.log(index);
        return ""
    }
    return `<a class='citation' data-tip='${publication}' target="_blank" rel="noopener noreferrer" href="${url}">${labelCitation({ citationSize:CITATION_SIZE.SMALL, publication: fullCit.publication, evidence: fullCit.evidence, index: index+1 })}</a>&nbsp;`
}


/**
 * Description placeholder
 *
 * @param {*} allCitations - An object of all available citations.
 * @param {*} note - The note that may contain citation references.
 * @returns {string}
 */
export const NoteCitations = (allCitations, note) => {
    /**
     * Description placeholder
     *
     * @type {{}}
     */
    const REX = /\[\s*RDBECOLI(PRC|EVC)[0-9]{5}\]/

    
    /**
     * Description placeholder
     *
     * @type {{}}
     */
    const PP = /(\|CITS:)|\|\./

    
    /**
     * Description placeholder
     *
     * @type {{}}
     */
    const BR = /(\r\n|\r|\n)/
    while (BR.exec(note)) {
        note = note.replace(BR, '<br></br>')
        //console.log("a");
    };
    if (PP.exec(note)) {
        while (PP.exec(note)) {
            note = note.replace(PP, ' ')
        };
        while (REX.exec(note)) {
            note = note.replace(REX, relCitation(allCitations, REX.exec(note)[0]))
        };
    }
    //console.log(note);
    return note
}