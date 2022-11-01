import Format from './Format'
import MkSequence from './mkSequence'
import { MarkSequencePromoter } from './mkSequencePromoter'
import { MarkSequenceTerminator } from './mkSequenceTerminator'
import { MarkSequenceSimple } from './mkSequenceSimple'
import "./secuence.css"

export function FastaSequence({
    sequence,
    color = false,
    title = "",
}){
    let formatSequence = new Format(sequence,title)
    return (
        <p id="rdb_p_sequence" className="rdb_p_sequence" dangerouslySetInnerHTML={{__html: formatSequence.getFastaFormat({color: color})}} />
    )
}

export function GenebankSequence({
    sequence,
    color = false,
    title = "",
}){
    let formatSequence = new Format(sequence,title)
    return (
        <p id="rdb_p_sequence" className="rdb_p_sequence" dangerouslySetInnerHTML={{__html: formatSequence.getGenebankFormat({color: color})}} />
    )
}

export{MkSequence, MarkSequencePromoter, MarkSequenceTerminator, MarkSequenceSimple}