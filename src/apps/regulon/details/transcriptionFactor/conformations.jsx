import React from 'react';
import { ParagraphCitations } from '../../../../components/citations';

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
            <h3>Conformations</h3>
            <div style={{
                display: "flex",
                marginLeft: "5%",
                overflow: "auto"
            }}>
                {conformations.map((conformation) => {
                    return (
                        <div key={"tf_conformation_"+conformation.id} style={{
                            width: "300px",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            backgroundColor: "#f9f7f6",
                            margin: "5px",
                        }} >
                            <div>{conformation.type}</div>
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
            </div>
        </div>
    )
}
