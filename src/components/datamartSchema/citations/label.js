
/**
 * Citation label in specific format
 * @date 30/5/2023 - 21:00:25
 * @author Gabriel Alarcon Carranza <galarcon@ccg.unam.mx>
 * @export
 * @param {object} publication is a type Publication of datamart
 * @param {object} evidence is a type Evidence of datamart
 * @param {boolean} [small=true] format of label
 * @returns {String}
 */
export function labelCitation(publication, evidence, small = true) {
    const {
        authors,
        citation,
        //pmid,
        //title,
        //url,
        year, } = publication
    const {
        //additiveEvidenceCodeRule,
        code,
        //name,
        //type,
    } = evidence
    //W->weak S->strong
    const codeLabel = () => {
        if (code) {
            if (evidence.type === 'S') {
                return `<b>[${code}]</b>`
            }
            return `[${code}]`
        }
        return ''
    }
    if (small) {
        if (!authors) {
            return `${code()}`.trim()
        }
        if (authors[0]) {
            return `${authors[0]}., et al. ${year ? year : ''} ${codeLabel()}`
        }
        return `${code()}`.trim()
    }
    return `${citation ? `${citation},` : ''} ${codeLabel()}`
    // [i]autor., et al. año [evidence]
}