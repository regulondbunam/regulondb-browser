import React from 'react'
import { TableCitationContext } from '../../../components/citations/citations'
import { CitationCONTEXT } from '../../../components/citations/citations_provider'

export default function Citations() {
    return (
        <article>
            <h2>Citations</h2>
            <br />
            <TableCitationContext CitationCONTEXT={CitationCONTEXT} />
        </article>
    )
}
