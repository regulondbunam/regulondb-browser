import React from 'react';
import Format from './Format'
import {Promoter} from './features';

export default function LinealSequence({
    sequenceId,
    sequence = "",
    color = false,
    features = [],
    height = 30
}) {
    if(!sequence){return null}
    const formatSequence = new Format(sequence, "")
    const width = sequence.length * 8.5
    const middleHeight = height / 2
    const divStyle = {
        height: height,
        width: `${width}px`,
        overflow: "auto",
        position: "relative",
    }
    const sequenceStyle = {
        position: "absolute",
        top: `${middleHeight - 7.75}px`
    }
    return (
        <div id={`sequencePanel_${sequenceId}`} style={divStyle}>
            <div style={sequenceStyle} >
                <p id={`sequence_${sequenceId}_p`} className="rdb_p_sequence" dangerouslySetInnerHTML={{ __html: formatSequence.getLinealFormat({ sequenceId: sequenceId, color: color }) }} />
            </div>
            {
                features.map((feature, index) => {
                    const featureStyle = {
                        position: "absolute",
                        top: `0px`,
                        left: `${feature.sequencePosition*8.45}px`
                    }
                    switch (feature.type) {
                        case "promoter":
                            return <Promoter featureStyle={featureStyle} id={feature.id} label={feature.label} height={middleHeight - 7.75} width={30} />
                    
                        default:
                            break;
                    }
                    return <div style={featureStyle} >Hola</div>
                })
            }
        </div>
    )
}
