import React from 'react';
import { ParagraphCitations } from '../../../../components/citations';
//import { GetOf } from '../../../../components/phrases';

export default function Conformations({ conformations, allCitations }) {
    //console.log(tf?.conformations)

    if (!conformations) {
        return null
    }
    if (conformations.length === 0) {
        return null
    }
    return (
        <div>
            <p><b>Conformations</b></p>
            <div style={{
                marginLeft: "5%"
            }}>
                vista en una tabla, columns: name, type, confidenceLevel, citations
            </div>
        </div>
    )
}


/*
{conformations.map((conformation) => {
                    //console.log(conformation._id);
                    //let phrases = GetOf([conformation._id])
                    //console.log(conformation);
                    return (
                        <div  key={"tf_conformation_"+conformation._id} 
                        style={{
                            marginBottom: "10px"
                        }} >
                            <div>{conformation.type}</div>
                            <div>{conformation?.confidenceLevel&&(
                                <p>confidence level: {conformation?.confidenceLevel}</p>
                            )}</div>
                            <div><p className='p_accent'>{conformation.name}</p></div>
                            {conformation.effectorInteractionType && (
                                <div>
                                    <div>Effector Interaction</div>
                                    <div><p>{conformation.effectorInteractionType}</p></div>
                                </div>
                            )}
                            {conformation.functionalType && (
                                <div>
                                    <div>Functional Type</div>
                                    <div><p>{conformation.functionalType}</p></div>
                                </div>
                            )}
                            <div>
                                <ParagraphCitations
                                    allCitations={allCitations}
                                    citations={conformation?.citations}
                                />
                            </div>
                        </div>
                    )
                })}
*/