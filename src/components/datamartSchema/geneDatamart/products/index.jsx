import ViewSequence from "./viewSequence";
import PropTypes from 'prop-types';
import { DataVerifier, Accordion } from "../../../ui-components";
import { ParagraphCitations, NoteCitations } from "../../citations";
import GeneOntologyTerms from "./geneOntologyTerms"
import Motif from "./motif";

const PROP_TYPES = {
    _id: PropTypes.string.isRequired,
    anticodon: PropTypes.string,
    cellularLocations: PropTypes.arrayOf(PropTypes.string),
    citations: PropTypes.array,
    externalCrossReferences: PropTypes.array,
    geneOntologyTerms: PropTypes.object,
    isRegulator: PropTypes.bool,
    isoelectricPoint: PropTypes.number,
    molecularWeight: PropTypes.string,
    motifs: PropTypes.array,
    name: PropTypes.string,
    note: PropTypes.string,
    regulonId: PropTypes.string,
    sequence: PropTypes.string,
    synonyms: PropTypes.arrayOf(PropTypes.string),
    type: PropTypes.string,
};

export function Product({
    _id,
    anticodon,
    cellularLocations,
    citations,
    externalCrossReferences,
    geneOntologyTerms,
    isRegulator,
    isoelectricPoint,
    molecularWeight,
    motifs,
    name,
    note,
    regulonId,
    sequence,
    synonyms,
    type,
    allCitations
}) {
    //console.log(DataVerifier.isValidArray(motifs));
    return (
        <div>
            <p style={{ fontSize: "18px" }} ><b>{name}</b></p>
            <table className="table_auto table_content">
                <tbody>
                    {DataVerifier.isValidArray(synonyms) && (
                        <tr>
                            <td style={{ fontWeight: "bold" }}>Synonyms: </td>
                            <td>{synonyms.join(", ")}</td>
                        </tr>
                    )}
                    {DataVerifier.isValidString(sequence) && (
                        <tr>
                            <td style={{ fontWeight: "bold" }}>Sequence:</td>
                            <td>
                                <ViewSequence
                                    sequence={sequence}
                                    title={`product: ${name}`}
                                />
                            </td>
                        </tr>
                    )}
                    {DataVerifier.isValidString(molecularWeight) && (
                        <tr>
                            <td style={{ fontWeight: "bold" }}>Molecular Weight: </td>
                            <td>{molecularWeight}</td>
                        </tr>
                    )}
                    {DataVerifier.isValidString(anticodon) && (
                        <tr>
                            <td style={{ fontWeight: "bold" }}>Anticodon: </td>
                            <td>{anticodon}</td>
                        </tr>
                    )}
                    {isRegulator && (
                        <tr>
                            <td style={{ fontWeight: "bold" }}>Is regulator?:</td>
                            <td>{isRegulator}</td>
                        </tr>
                    )}
                    {DataVerifier.isValidNumber(isoelectricPoint) && (
                        <tr>
                            <td style={{ fontWeight: "bold" }}>Isoelectric Point: </td>
                            <td>{isoelectricPoint}</td>
                        </tr>
                    )}
                    {DataVerifier.isValidArray(cellularLocations) && (
                        <tr>
                            <td style={{ fontWeight: "bold" }}>Cellular Locations:</td>
                            <td>{cellularLocations.join(", ")}</td>
                        </tr>
                    )}
                </tbody>
            </table>
            {DataVerifier.isValidString(note) && (
                <Accordion title={<p style={{ fontWeight: "bold" }}>Note</p>} >
                    <p
                        dangerouslySetInnerHTML={{
                            __html: NoteCitations(allCitations, note),
                        }}
                    />
                </Accordion>
            )}
            {DataVerifier.isValidObject(geneOntologyTerms) && (
                <GOT geneOntologyTerms={geneOntologyTerms} allCitations={allCitations} />
            )}
            {DataVerifier.isValidArray(motifs) && (
                <Motifs motifs={motifs} sequence={sequence} />
            )}
            {DataVerifier.isValidArray(externalCrossReferences) && (
                <ExternalCrossReferences references={externalCrossReferences} />
            )}

            {DataVerifier.isValidArray(citations) && (
                <Citations citations={citations} allCitations={allCitations} />
            )}
        </div>
    )
}

Product.propTypes = PROP_TYPES

function Motifs({ motifs = [], sequence }) {
    return (
        <Accordion title={<p style={{ fontWeight: "bold" }}>Motifs</p>} >
            <div>
                <Motif motifs={motifs} sequence={sequence} />
            </div>
        </Accordion>
    )
}

function GOT({
    geneOntologyTerms,
    allCitations
}) {
    return (
        <Accordion title={<p style={{ fontWeight: "bold" }}>Gene Ontology Terms</p>} >
            <div>
                <GeneOntologyTerms
                    geneOntologyTerms={geneOntologyTerms}
                    allCitations={allCitations}
                />
            </div>
        </Accordion>
    )
}

function Citations({ citations, allCitations }) {
    return (
        <Accordion title={"Citations"} >
            <div>
                <ParagraphCitations citations={citations} allCitations={allCitations} />
            </div>
        </Accordion>
    )
}

function ExternalCrossReferences({ references }) {
    return (
        <Accordion title={"External Cross References"} >
            <div>
                {
                    references.map(((reference) => {
                        return (
                            <a style={{ marginLeft: "5px" }} key={"reference_" + reference.externalCrossReferenceId}
                                href={`${reference.url}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >{`${reference.externalCrossReferenceName}: ${reference.objectId}`}</a>
                        )
                    }))
                }
            </div>
        </Accordion>
    )
}