import React, { useState } from 'react'
import { LinealSequence } from "../../../../components/sequence"
import { CitationsNote } from "../../../../components/citations/citations_note";
import { ParagraphCitations, } from "../../../../components/citations"
import RegulatorBindingSites from "./regulatorBindigSites";
import { Link } from 'react-router-dom';

export default function Promoter({ tuId, promoter, allCitations }) {
    const [_viewRBS, set_viewRBS] = useState();

    let promoterFeatures = []
    //create promoter feature
    if(promoter?.sequence){
        promoter.sequence.split("").forEach((x,index)=>{
            if (x === x.toUpperCase()) {
                //let anchorId = `sequence_${promoter._id}_item_${x}_${index}`
                promoterFeatures.push({
                    id: promoter._id+"_promoter",
                    label: "+1",
                    sequencePosition: index,
                    type: "promoter"
                })
               }
        })
        if(promoter.boxes.length > 0){
            /*
            promoter.boxes.forEach((x,index)=>{

            })*/
            promoter.sequence.split("").forEach((x,index)=>{
                if (x === x.toUpperCase()) {
                    //let anchorId = `sequence_${promoter._id}_item_${x}_${index}`
                    promoterFeatures.push({
                        id: promoter._id+"_promoter",
                        label: "+1",
                        sequencePosition: index,
                        type: "promoter"
                    })
                   }
            })
        }
    }

    console.log(promoter);
    return (
        <div>
            <h3>Promoter {promoter.name}</h3>
            <div style={{ marginLeft: "5%", marginRight: "2%" }}>
                <div>
                    {
                        notNull(promoter.id,
                            <div>
                                <p>id:{promoter.id}</p>
                            </div>
                        )
                    }
                    {
                        notNull(promoter.transcriptionStartSite.leftEndPosition,
                            <div>
                                <p style={{ fontWeight: "bold" }}>Absolute Position: </p>
                                <p>{promoter.transcriptionStartSite.leftEndPosition}</p>
                            </div>
                        )
                    }
                    {
                        notNull(promoter.synonyms,
                            <div>
                                <p style={{ fontWeight: "bold" }}>synonyms</p>
                                <p>{
                                    promoter.synonyms.map((s) => {
                                        return ` ${s}`
                                    }).join(",")
                                }</p>
                            </div>
                        )
                    }
                    {
                        notNull(promoter.sequence,
                            <div style={{ fontWeight: "bold" }}>Sequence</div>
                        )
                    }
                    {
                        notNull(promoter.sequence,
                            <div >
                                <div
                                    style={{
                                        overflow: "auto"
                                    }}
                                >
                                    <LinealSequence sequence={promoter.sequence} color={true} height={100} sequenceId={promoter._id} features={promoterFeatures} />
                                </div>
                            </div>
                        )
                    }
                    {
                        notNull(promoter.citations,
                            <div style={{ fontWeight: "bold" }}>
                                <p>Citations: </p>
                                <ParagraphCitations allCitations={allCitations} citations={promoter.citations} />
                            </div>
                        )
                    }
                    {
                        notNull(promoter.bindsSigmaFactor?.sigmaFactor_id,
                            <div>
                                <p style={{ fontWeight: "bold" }}>Binds sigma factor:</p>
                                <p><Link to={`/sigmulon/${promoter.bindsSigmaFactor?.sigmaFactor_id}`} >{promoter.bindsSigmaFactor?.sigmaFactor_name}</Link></p>
                                <p>citations: <ParagraphCitations allCitations={allCitations} citations={promoter.bindsSigmaFactor?.citations} /></p>
                            </div>
                        )
                    }
                </div>
                {
                    notNull(promoter.note,
                        <p dangerouslySetInnerHTML={{ __html: CitationsNote(allCitations, promoter.note) }} />
                    )
                }
                <div style={{ margin: "5px" }} >
                    {promoter.regulatorBindingSites.length > 0 && (
                        <button className='aBase'
                            onClick={() => { set_viewRBS(!_viewRBS) }}
                        >
                            {_viewRBS ? "Hide" : "Show"} Regulator Binding Sites associated to this promoter
                        </button>
                    )}
                    {_viewRBS && (
                        <div>
                            <RegulatorBindingSites regulatorBindingSites={promoter.regulatorBindingSites} allCitations={allCitations} />
                            <button className='aBase'
                                onClick={() => { set_viewRBS(!_viewRBS) }}
                            >
                                {_viewRBS ? "Hide" : "Show"} Regulator Binding Sites associated to this promoter
                            </button>
                        </div>
                    )}
                </div>

            </div>
        </div>
    )
}


function notNull(data, element) {

    if (data === undefined) {
        return null
    }
    if (data === null || data.length < 1 || data === "") {
        return null
    }
    return element
}

/*
onMouseEnter={() => {
                let gn = document.getElementById(`${promoter.id}#tu_Canva${id_tu}/s`)
                if (gn) {
                    gn.setAttribute("stroke", "#00F");
                    gn.setAttribute("stroke-width", "2");
                }
            }}
            onMouseLeave={() => {
                let gn = document.getElementById(`${promoter.id}#tu_Canva${id_tu}/s`)
                if (gn) {
                    gn.setAttribute("stroke", "");
                    gn.setAttribute("stroke-width", "0");
                }
            }}
*/