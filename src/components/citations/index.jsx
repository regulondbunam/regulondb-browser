import React from 'react'
import { Citation } from './citation'
import { CitationModal } from './CitationsModal'

export function TableCitations({ allCitations, citations, small = true }) {
    if (!citations) {
        return null
    }
    return (
        <>

            <table>
                <tbody>
                    {

                        citations.map((cit, indx) => {
                            try {
                                let index = allCitations.findIndex((citation) => citation?.publication?.id === cit?.publication?.id && citation?.evidence?.id === cit?.evidence?.id)
                                return (
                                    <tr key={`citation_no_000${index}`}>
                                        <td>
                                            [{index + 1}]
                                            <CitationModal
                                                classNameModal="citation"
                                                title={`${Citation(cit, small)}`}
                                                references={cit}
                                            />
                                        </td>
                                    </tr>
                                )
                            } catch (error) {
                                return null
                            }
                        })
                    }
                </tbody>
            </table>
            <br />
            <br />
        </>
    )
}

export function ParagraphCitations({ allCitations, citations, small = true }) {
    if (!citations) {
        return null
    }
    return (
        <>
            {

                citations.map((cit, indx) => {
                    try {
                        let index = allCitations.findIndex((citation) => citation?.publication?._id === cit?.publication?._id && citation?.evidence?._id === cit?.evidence?._id)
                        return (
                            <CitationModal key={`CitaitopnPH_${cit?.publication?._id}_${cit?.evidence?._id}_${indx}`}
                                classNameModal="citation"
                                title={`[${index + 1}]${Citation(cit, small)}`}
                                references={cit}
                            />
                        )
                    } catch (error) {
                        return null
                    }
                })
            }
        </>
    )
}

export function TableAllCitations({ allCitations, small = false }) {
    if(!allCitations){
        return null
    }
    return (
        <>

            <table>
                <tbody>
                    {

                        allCitations.map((cit, index) => {
                            try {
                                return (
                                    <tr key={`citation_no_000${index}`}>
                                        <td>
                                            <CitationModal
                                                classNameModal="citation"
                                                title={`[${index + 1}]${Citation(cit, small)}`}
                                                references={cit}
                                            />
                                        </td>
                                    </tr>
                                )
                            } catch (error) {
                                return null
                            }
                        })
                    }
                </tbody>
            </table>
            <br />
            <br />
        </>
    )
}