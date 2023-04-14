//import { Link } from 'react-router-dom'
import { LinealSequence } from "../../../../components/sequence";
import { ParagraphCitations } from "../../../../components/citations/index"

export function riItemSize(regulatoryInteraction) {
    let size = 60
    const {
        citations,
        distanceToGene,
        mechanism,
        regulatoryBindingSites,
    } = regulatoryInteraction
    const riFunction = regulatoryInteraction.function;
    if (distanceToGene || mechanism || riFunction) {
        size += 42
    }
    if (regulatoryBindingSites) {
        size += 20
        const {
            absolutePosition,
            leftEndPosition,
            sequence,
            strand,
        } = regulatoryBindingSites
        const rbsFunction = regulatoryBindingSites.function
        const rbsCitations = regulatoryBindingSites.citations
        if (absolutePosition || leftEndPosition || strand || rbsFunction ) {
            size += 21
        }
        if (sequence) {
            size += 30
        }
        if (rbsCitations) {
            size += 53
        }
    }
    if (citations) {
        if (citations.length > 0) {
            size += 53
        }
    }
    //console.log(size, regulatoryInteraction);
    return size
}

export default function RiItem({ regulatoryInteraction, allCitations }) {
    const {
        citations,
        distanceToGene,
        mechanism,
        regulatedEntity,
        regulatoryBindingSites,
        _id
    } = regulatoryInteraction
    const riFunction = regulatoryInteraction.function;

    return (
        <table className='table_data' style={{ width: '100%' }} >
            <thead>
                <tr style={{ background: "#72a7c7" }} >
                    {regulatedEntity?.name
                        ? (
                            <th>
                                <p className='p_accent' style={{ color: "white" }} dangerouslySetInnerHTML={{ __html: regulatedEntity.name }} />
                                <p style={{ color: "white" }} >{`${regulatedEntity.type}`}</p>
                            </th>
                        )
                        : (
                            <th>
                                <p style={{ color: "white" }} className='p_accent' >{_id}</p>
                            </th>
                        )}
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <table style={{ width: '100%' }}>
                            <thead>
                                <tr style={{ background: "#d5e2ea" }} >
                                    {riFunction && (
                                        <th>Function</th>
                                    )}
                                    {distanceToGene && (
                                        <th>Distance to Gene</th>
                                    )}
                                    {mechanism && (
                                        <>
                                            {mechanism.length > 0 && (
                                                <th>Mechanism</th>
                                            )}
                                        </>
                                    )}
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    {riFunction && (
                                        <td>{riFunction}</td>
                                    )}
                                    {distanceToGene && (
                                        <td>{distanceToGene}</td>
                                    )}
                                    {mechanism && (
                                        <>
                                            {mechanism.length > 0 && (
                                                <td>{mechanism.join(", ")}</td>
                                            )}
                                        </>
                                    )}
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                {regulatoryBindingSites && (
                    <tr>
                        <td>
                            <RegulatoryBindingSiteItem regulatoryBindingSites={regulatoryBindingSites} allCitations={allCitations} />
                        </td>
                    </tr>
                )}
                {citations && (
                    <>
                        {citations.length > 0 && (
                            <RBScitations citations={citations} allCitations={allCitations} />
                        )}
                    </>
                )}
            </tbody>
        </table>
    )
}

function RBScitations({ citations, allCitations }) {
    return (
       
            <table>
                <thead>
                    <tr style={{ background: "#d5e2ea" }} >
                        <th> Citations </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <div style={{ height: "33px", width: "100%", overflow: "auto" }} >
                        <ParagraphCitations citations={citations} allCitations={allCitations} />
                        </div>
                    </tr>
                </tbody>
            </table>

        
    )
}

function RegulatoryBindingSiteItem({ regulatoryBindingSites, allCitations }) {
    const {
        absolutePosition,
        citations,
        leftEndPosition,
        rightEndPosition,
        sequence,
        strand,
        _id,
    } = regulatoryBindingSites
    const rbsFunction = regulatoryBindingSites.function
    let description = []
    if (absolutePosition) {
        description.push("Absolute Position: " + absolutePosition)
    }
    if (rbsFunction) {
        description.push("Function: " + rbsFunction)
    }
    if (leftEndPosition && rightEndPosition) {
        description.push("Position: " + leftEndPosition + " --- " + rightEndPosition)
    }
    if (strand) {
        description.push("strand: " + strand)
    }
    return (
        <table>
            <thead>
                <tr style={{ background: "#d5e2ea" }} >
                    <th> Regulatory Binding Site</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <p dangerouslySetInnerHTML={{ __html: description.join(", ") }} />
                    </td>
                </tr>
                <tr>
                    <td>
                        <div>
                            <LinealSequence sequence={sequence} color={true} height={30} sequenceId={"ris_" + _id} />
                        </div>
                    </td>
                </tr>
                {citations && (
                    <>
                        {citations.length > 0 && (
                            <table>
                            <thead>
                                <tr style={{ background: "#ffffff" }} >
                                    <th> citations </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                <div style={{ height: "33px", width: "100%", overflow: "auto" }} >
                                    <ParagraphCitations citations={citations} allCitations={allCitations} />
                                    </div>
                                </tr>
                            </tbody>
                        </table>
                        )}
                    </>
                )}
            </tbody>
        </table>
    )
}