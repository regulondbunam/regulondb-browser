import FastaFormat from './FastaFormat'
import GenBankFormat from './GenBankFormat'

function sequence(
    gene,
    sequence,
    format){
        let seq
    switch (format) {
        case 'fasta':
            seq = new FastaFormat(sequence)
            return (
                    `
                    >${gene} gene sequence Size:${seq.size} A:${seq.nucleotideA} T:${seq.nucleotideT} C:${seq.nucleotideC} G:${seq.nucleotideG} <br>
                    ${seq.formatSequence}
                    `
            )
        case 'genbank':
            seq = new GenBankFormat(sequence)
            return (
                `
                ${gene} gene Size:${seq.size} A:${seq.nucleotideA} T:${seq.nucleotideT} C:${seq.nucleotideC} G:${seq.nucleotideG} <br>
                ${seq.formatSequence}
                `
        )
        default:
            return ""
    }
}
 
export default sequence;