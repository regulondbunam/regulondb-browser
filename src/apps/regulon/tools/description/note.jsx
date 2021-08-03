import React from 'react'
import { CitationCONTEXT } from '../../../../components/citations/citations_provider';
import {CitationsNote} from '../../../../components/citations/citations_note'
import ReactTooltip from 'react-tooltip';

export default function Note({note}) {
    if (!note) {
        return null
    }
    return (
        <div>
            <h3>Note</h3>
            <p dangerouslySetInnerHTML={{__html: CitationsNote(CitationCONTEXT,note)}}></p>
            <ReactTooltip place="bottom" type="light" border={true} />
        </div>
    )
}
