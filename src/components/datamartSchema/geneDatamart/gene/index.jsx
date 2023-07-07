import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ViewSequence from "./viewSequence";
import PanelSequence from "./viewSequence/panelSequence";
import PropTypes from 'prop-types';
import { DataVerifier, Accordion } from "../../../ui-components";
import { ParagraphCitations, NoteCitations } from "../../citations";

const PROP_TYPES = {
    _id: PropTypes.string.isRequired,
    allCitations: PropTypes.array.isRequired,
    bnumber: PropTypes.string,
    centisomePosition: PropTypes.number,
    citations: PropTypes.array,
    externalCrossReferences: PropTypes.array,
    fragments: PropTypes.array,
    gcContent: PropTypes.number,
    leftEndPosition: PropTypes.number,
    multifunTerms: PropTypes.array,
    name: PropTypes.string,
    note: PropTypes.string,
    rightEndPosition: PropTypes.number,
    sequence: PropTypes.string,
    strand: PropTypes.string,
    synonyms: PropTypes.arrayOf(PropTypes.string),
    type: PropTypes.string,
};

function Gene({
    _id,
    allCitations = [],
    bnumber = "",
    centisomePosition = 0,
    citations,
    externalCrossReferences,
    fragments,
    gcContent = 0,
    leftEndPosition = 0,
    multifunTerms,
    name = "",
    note = "",
    rightEndPosition = 0,
    sequence = "",
    strand = "",
    synonyms = [],
    viewTitle = true,
    viewExternalRef = false,
    products
}) {
    const size = rightEndPosition - leftEndPosition;

    return (
        <div>
            {viewTitle && (
                <p style={{ fontSize: "18px" }} ><b>{name} Gene</b></p>
            )}
            <div style={{ display: "grid", gridTemplateColumns: "20% 80%" }} >
                <div className="leftGene">
                    <table className="table_auto table_content">
                        <tbody>
                            {DataVerifier.isValidArray(synonyms) && (
                                <tr>
                                    <td style={{ fontWeight: "bold" }}>Synonyms: </td>
                                    <td>{synonyms.join(", ")}</td>
                                </tr>
                            )}
                            {DataVerifier.isValidString(bnumber) && (
                                <tr>
                                    <td style={{ fontWeight: "bold" }}>Bnumber:</td>
                                    <td>{bnumber}</td>
                                </tr>
                            )}
                            {leftEndPosition && (
                                <>
                                    <tr>
                                        <td style={{ fontWeight: "bold" }}>Position:</td>
                                        <td>
                                            <div style={{ display: "flex", alignItems: "center" }}>
                                                <p>{leftEndPosition}</p>
                                                {strand === "reverse" ? (
                                                    <ArrowBackIcon fontSize="small" />
                                                ) : (
                                                    <ArrowForwardIcon fontSize="small" />
                                                )}
                                                <p>{rightEndPosition}</p>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{ fontWeight: "bold" }}>Size:</td>
                                        <td>{`${size} bp`}</td>
                                    </tr>
                                </>

                            )}
                            {DataVerifier.isValidString(strand) && (
                                <tr>
                                    <td style={{ fontWeight: "bold" }}>Strand:</td>
                                    <td>{strand}</td>
                                </tr>
                            )}
                            {/*DataVerifier.isValidString(sequence) && (
                        <tr>
                            <td style={{ fontWeight: "bold" }}>Sequence:</td>
                            <td>
                                <ViewSequence
                                    sequence={sequence}
                                    _id={_id} name={name} products={products}
                                />
                            </td>
                        </tr>
                    )*/}
                            {DataVerifier.isValidNumber(gcContent) && (
                                <tr>
                                    <td style={{ paddingLeft: "15px" }}>GC content:</td>
                                    <td>{gcContent.toFixed(2)}%</td>
                                </tr>
                            )}
                            {DataVerifier.isValidNumber(centisomePosition) && (
                                <tr>
                                    <td style={{ fontWeight: "bold" }}>Centisome Position:</td>
                                    <td>{centisomePosition}</td>
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
                    {DataVerifier.isValidArray(fragments) && (
                        <Fragments _id={_id} fragments={fragments} strand={strand} products={products} />
                    )}
                    {DataVerifier.isValidArray(externalCrossReferences) && viewExternalRef ? (
                        <ExternalCrossReferences references={externalCrossReferences} />
                    )
                        : null}
                    {DataVerifier.isValidArray(citations) && (
                        <Citations citations={citations} allCitations={allCitations} />
                    )}
                </div>
                <div className="rightGen">
                    {DataVerifier.isValidString(sequence) && (
                        <>
                            <PanelSequence sequence={sequence}
                                    _id={_id} name={name} products={products} />
                        </>
                    )}
                </div>
            </div>

        </div>
    );
}

Gene.propTypes = PROP_TYPES

export { Gene }

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

// eslint-disable-next-line no-unused-vars
function MultifunTerms({ multifunTerms }) {
    return (
        <Accordion title={<p style={{ fontWeight: "bold" }}>Multifun Terms</p>} >
            <div >
                {multifunTerms.map((m, i) => {
                    return (
                        <div key={`multifun${i}-data-${m.id}`}>
                            <p><b>{`${m.label}: ${m.name}`}</b></p>
                        </div>
                    );
                })}
            </div>
        </Accordion>
    );
}

function Fragments({ fragments, strand, products, _id }) {
    return (
        <Accordion title={<p style={{ fontWeight: "bold" }}>Fragments</p>}>
            <div >
                <table className="table_auto table_content">
                    <thead>
                        <tr>
                            <th>name</th>
                            <th>position</th>
                            <th>sequence</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fragments.map((fragment, index) => (
                            <tr key={`fragmentInfo_${fragment.id}_${index}`} >
                                <td>{fragment.name}</td>
                                <td>
                                    <div style={{ display: "flex", alignItems: "center" }}>
                                        <p>{fragment?.leftEndPosition}</p>
                                        {strand === "reverse" ? (
                                            <ArrowBackIcon fontSize="small" />
                                        ) : (
                                            <ArrowForwardIcon fontSize="small" />
                                        )}
                                        <p>{fragment?.rightEndPosition}</p>
                                    </div>
                                </td>
                                <td><ViewSequence _id={_id} sequence={fragment.sequence} products={products} title={`fragment_${fragment.name}_sequence`} /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Accordion>
    );
}