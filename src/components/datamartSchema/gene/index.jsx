import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ViewSequence from "./viewSequence";
import PropTypes from 'prop-types';
import { NoteCitations } from "../citations";

const PROP_TYPES = {
    _id: PropTypes.string.isRequired,
    allCitations: PropTypes.array.isRequired,
    bnumber: PropTypes.string,
    centisomePosition: PropTypes.number,
    citations: PropTypes.object,
    externalCrossReferences: PropTypes.object,
    fragments: PropTypes.number,
    gcContent: PropTypes.number,
    leftEndPosition: PropTypes.number,
    multifunTerms: PropTypes.object,
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
    type = "",
    variant = "card"
}) {
    const size = rightEndPosition - leftEndPosition;

    return (
        <div>
            <h2>Information {name} Gene</h2>
            <table className="table_auto table_content">
                <tbody>
                    {synonyms.length > 0 && (
                        <tr>
                            <td style={{ fontWeight: "bold" }}>Synonyms: </td>
                            <td>{synonyms.join(", ")}</td>
                        </tr>
                    )}
                    {bnumber !== "" && (
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
                                <td>{size}bp</td>
                            </tr>
                        </>

                    )}
                    {strand && (
                        <tr>
                            <td style={{ fontWeight: "bold" }}>Strand:</td>
                            <td>{strand}</td>
                        </tr>
                    )}
                    {sequence !== "" && (
                        <tr>
                            <td style={{ fontWeight: "bold" }}>Sequence:</td>
                            <td>
                                <ViewSequence
                                    sequence={sequence}
                                    title={`gene_${name}_sequence`}
                                />
                            </td>
                        </tr>
                    )}
                    {gcContent !== "" && (
                        <tr>
                            <td style={{ fontWeight: "bold" }}>gc content:</td>
                            <td>{gcContent}%</td>
                        </tr>
                    )}
                    {centisomePosition !== "" && (
                        <tr>
                            <td style={{ fontWeight: "bold" }}>Centisome Position:</td>
                            <td>{centisomePosition}</td>
                        </tr>
                    )}
                    {note !== "" && (
                        <tr>
                            <td colSpan={2}>
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel2a-content"
                                        id="panel2a-header"
                                    >
                                        <p style={{ fontWeight: "bold" }}>Notes</p>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <p
                                            dangerouslySetInnerHTML={{
                                                __html: NoteCitations(allCitations, note),
                                            }}
                                        />
                                    </AccordionDetails>
                                </Accordion>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

        </div>
    );
}

Gene.propTypes = PROP_TYPES

export { Gene } 