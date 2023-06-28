
/**
 * Citation label in specific format
 * @date 30/5/2023 - 21:00:25
 * @author Gabriel Alarcon Carranza <galarcon@ccg.unam.mx>
 * @export
 * @param {number} index citation index
 * @param {object} publication is a type Publication of datamart
 * @param {object} evidence is a type Evidence of datamart
 * @param {boolean} [small=true] format of label
 * @returns {String}
 */
export function labelCitation({publication = {}, evidence = {}, small = true, index}) {
    //console.log(publication, evidence);
    const {
        authors,
        citation,
        //pmid,
        //title,
        //url,
        year, } = publication
    const code = evidence?.code
    const numIndex = index ? `[${index}]` : ""
    //W->weak S->strong
    const codeLabel = () => {
        if (code) {
            if (evidence.type === 'S') {
                return `code: <b>[${code}]</b>`
            }
            return `code: [${code}]`
        }
        return ''
    }
    if (small) {
        if (!authors) {
            return `${numIndex} ${codeLabel()}`.trim()
        }
        if (authors[0]) {
            return `${numIndex} ${authors[0]}., et al. ${year ? year : ''} ${codeLabel()}`
        }
        return `${numIndex} ${codeLabel()}`.trim()
    }
    return `${numIndex} ${citation ? `${citation},` : ''} ${codeLabel()}`
    // [i]autor., et al. año [evidence]
}