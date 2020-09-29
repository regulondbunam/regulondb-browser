import FastaFormat from './FastaFormat'
import GenBankFormat from './GenBankFormat'
//import CountElements from './CountElements'

function sequence(
    gene,
    sequence,
    format,
    header = '',
    countElements = false
) {
    let seq
    if (countElements) {
       // console.log(CountElements(sequence))
        header += ` f`
    }
    switch (format) {
        case 'fasta':
            seq = new FastaFormat(sequence)
            return (
                `
                    ${header}<br>
                    ${seq.formatSequence}
                    `
            )
        case 'genbank':
            seq = new GenBankFormat(sequence)
            return (
                `
                ${header}<br>
                ${seq.formatSequence}
                `
            )
        default:
            return ""
    }
}

export default sequence;
