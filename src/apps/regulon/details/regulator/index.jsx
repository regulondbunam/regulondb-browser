import "./regulator.css"
import { Card, DataVerifier } from "../../../../components/ui-components";
import { CitationsNote } from "../../../../components/citations/citations_note";
import { ParagraphCitations } from "../../../../components/citations";
import Conformations from "./conformations";
import EncodedFrom from "./encode";
import Products from "./products";
export default function Regulator({ regulator, allCitations }) {
    //console.log(regulator);
    const {
        citations,
        confidenceLevel,
        conformations,
        encodedFrom,
        name,
        note,
        products,
        siteLength,
        symmetry,
        synonyms,
        type,
    } = regulator
    //console.log(synonyms);
    //console.log(DataVerifier.isValidArray(synonyms));
    return (
        <Card title={"Regulator " + name}>
            <div style={{ marginLeft: "2%", marginRight: "3%" }} >
                <div>
                    {DataVerifier.isValidArray(synonyms) && (
                        <p><b>Synonyms: </b>{synonyms.map(s => (s)).join(", ")}</p>
                    )}
                    {DataVerifier.isValidArray(siteLength) && (
                        <p><b>Site Length; </b>{siteLength.map(s=>(s)).join(", ")}</p>
                    )}
                    {DataVerifier.isValidArray(symmetry) &&(
                        <p><b>Symmetry: </b>{symmetry.map(s=>(s)).join(", ")}</p>
                    )}
                    {DataVerifier.isValidString(type) &&(
                        <p><b>Type: </b>{type}</p>
                    )}
                </div>

                {DataVerifier.isValidString(note) && (
                    <>
                    <p><b>Note:</b></p>
                    <p dangerouslySetInnerHTML={{ __html: CitationsNote(allCitations, note) }} />
                    </>
                )}
                {DataVerifier.isValidArray(conformations) && (
                    <Conformations conformations={conformations} allCitations={allCitations} />
                )}
                {DataVerifier.isValidString(confidenceLevel) && (
                    ConfidenceLevel(confidenceLevel)
                )}
                {encodedFrom && (
                    <EncodedFrom encodedFrom={encodedFrom} />
                )}
                {DataVerifier.isValidArray(products) && (
                    <Products products={products} />
                )}
                {DataVerifier.isValidArray(citations) && (
                    <>
                    <p><b>Citations</b></p>
                    <ParagraphCitations allCitations={allCitations} citations={citations} />
                    </>
                )}
                <br />
            </div>
        </Card>
    )
}

function ConfidenceLevel(confidenceLevel) {
    return (
        <div>
            <h3>Confidence Level: {confidenceLevel} </h3>
        </div>
    )
}