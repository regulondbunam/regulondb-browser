import React from 'react';
import FastaFormat from './FastaFormat'

function sequence(
    gene,
    sequence,
    format){
    switch (format) {
        case 'fasta':
            let seq = new FastaFormat(sequence)
            return (
                    `
                    >${gene} gene sequence Size = ${seq.size} A: ${seq.nucleotideA} T: ${seq.nucleotideT} C: ${seq.nucleotideC} G: ${seq.nucleotideG} <br>
                    ${seq.formatSequence}
                    `
            )
        default:
            return ""
    }
}
 
export default sequence;