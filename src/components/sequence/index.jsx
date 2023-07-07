import Format from './Format'
import MkSequence from './mkSequence'
import LinealSequence from './lineal'
import { MarkSequencePromoter } from './mkSequencePromoter'
import { MarkSequenceTerminator } from './mkSequenceTerminator'
import { MarkSequenceSimple } from './mkSequenceSimple'
import "./secuence.css"

export function FastaSequence({
    id = "rdb_p_sequence",
    sequence,
    color = false,
    title = "",
    countItems = false,
    charactersPerLine = 60
}) {
    let formatSequence = new Format(sequence, title, { countItems: countItems })
    return (
        <p id={id} className="rdb_p_sequence" dangerouslySetInnerHTML={{ __html: formatSequence.getFastaFormat({ color: color, charactersPerLine: charactersPerLine }) }} />
    )
}

export function GenebankSequence({
    id = "rdb_p_sequence",
    sequence,
    color = false,
    title = "",
    countItems = false,
}) {
    let formatSequence = new Format(sequence, title, { countItems: countItems })
    return (
        <p id={id} className="rdb_p_sequence" dangerouslySetInnerHTML={{ __html: formatSequence.getGenebankFormat({ color: color }) }} />
    )
}

export { MkSequence, LinealSequence, MarkSequencePromoter, MarkSequenceTerminator, MarkSequenceSimple }