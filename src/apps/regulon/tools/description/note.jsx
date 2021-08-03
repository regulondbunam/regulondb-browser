import React from 'react'
import { CitationCONTEXT } from '../../../../components/citations/citations_provider';
import {CitationsNote} from '../../../../components/citations/citations_note'

export default function Note({note}) {
    if (!note) {
        return null
    }
    return (
        <div>
            <h3>Note</h3>
            <p dangerouslySetInnerHTML={{__html: CitationsNote(CitationCONTEXT,note)}}></p>
        </div>
    )
}
