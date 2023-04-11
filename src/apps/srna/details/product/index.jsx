import Card from "../../components/card";
import ViewSequence from "../../components/viewSequence";
import Divider from '@mui/material/Divider';
import {ParagraphCitations} from "../../../../components/citations"
import {CitationsNote} from "../../../../components/citations/citations_note"

import { Link } from "react-router-dom";
import { useState } from "react";

export function SrnaProduct({ srnaProduct, allCitations }) {
    //console.log(srnaProduct);
    const {
        citations,
        externalCrossReferences,
        gene,
        name,
        note,
        synonyms,
        sequence,
    } = srnaProduct

    return (
        <Card title="Product" >
            <div style={{ marginLeft: "5%", paddingRight: "3%" }} >
                <h3>{name}</h3>
                <div style={{ marginLeft: "3%" }} >
                    {synonyms.length > 0 && (
                        <p> Synonyms: {synonyms.map(s => s).join(", ")} </p>
                    )}
                    {sequence && (
                        <> <p>Sequence:</p> <ViewSequence sequence={sequence} title={"product sequence of " + name} /> </>
                    )}
                    <Divider />
                    {gene && (
                        Gene(gene)
                    )}
                    {note && (
                        Note(note,allCitations)
                    )}
                    {externalCrossReferences.length > 0 && (
                        ExternalCrossReferences(externalCrossReferences)
                    )}
                    {citations.length > 0 &&(
                        <>
                        <h4>Citations</h4>
                        <ParagraphCitations citations={citations} allCitations={allCitations} />
                        </>
                    )}
                    <br />
                    <br />
                </div>
            </div>

        </Card>
    );
}

function Note(note = "", allCitations) {
    const [viewMore, setViewMore] = useState(false);
    if (!viewMore) {
        note = note.slice(0,450) + " ..."
    }
    return(
        <>
            <h4>Note</h4>
            <p dangerouslySetInnerHTML={{__html: CitationsNote(allCitations,note)}} />
            <button className="aBase"
                onClick={()=>{setViewMore(!viewMore)}}
            >show{ viewMore ? " less" : " more" }</button>
        </>
    )
}

function ExternalCrossReferences(externalCrossReferences) {
    return (
        <>
            <h4>External Cross References</h4>
            {externalCrossReferences.map((ex, index) => {
                return (
                        <a
                        key={`${ex.externalCrossReferenceId}_${index}`}
                            href={`${ex.url}`}
                            className="p_accent"
                            target="_blank"
                            rel="noreferrer"
                            style={{ fontSize: "12px", marginRight: "8px" }}
                        >
                            {
                                ex.externalCrossReferenceName
                            }
                        </a>
                )
            })}
            <Divider />
        </>
    )
}

function Gene(geneInfo) {
    const {
        gcContent,
        name,
        strand,
        _id,
    } = geneInfo
    return (
        <>
            <Link to={"/gene/" + _id} ><h4>Gene{" " + name}</h4></Link>
            {gcContent && (
                <p>GC content: {gcContent}</p>
            )}
            {strand && (
                <p>Strand: {strand}</p>
            )}
            <Divider />
        </>
    )
}