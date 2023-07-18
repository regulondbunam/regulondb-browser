import React, { useReducer } from 'react';
import Format from './Format'
import { Promoter, Measure, Box } from './features';
import StraightenIcon from '@mui/icons-material/Straighten';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import Tooltip from "@mui/material/Tooltip";
import RestartAltIcon from '@mui/icons-material/RestartAlt';



const reducer = (states, action) => {
    return { ...states, ...action }
}

export default function LinealSequence({
    sequenceId,
    sequence = "",
    color = false,
    features = [],
    height = 30,
    measure = false
}) {
    const initialStates = {
        zoom: 1,
        measure: measure,
    }

    const [states, dispatch] = useReducer(reducer, initialStates);
    if (!sequence) { return null }
    const formatSequence = new Format(sequence, "")
    const width = sequence.length * 8.41
    const middleHeight = height / 2
    const divStyle = {
        height: height + 10,
        width: `${width}px`,
        overflow: "auto",
        position: "relative",
        zoom: states.zoom,
        "-ms-zoom": states.zoom,
        "-webkit-zoom": states.zoom,
        "-moz-transform": `scale(${states.zoom},${states.zoom})`,
    }
    const sequenceStyle = {
        position: "absolute",
        top: `${middleHeight - 7.75}px`
    }
    return (
        <div style={{ display: "flex", alignItems: "flex-start" }} >
            <div style={{ marginRight: "3px", }} >
                <Controls states={states} dispatch={dispatch} />
            </div>
            <div id={`sequencePanel_${sequenceId}`} style={divStyle}>
                {
                    features.map((feature, index) => {
                        const featureStyle = {
                            position: "absolute",
                            top: `0px`,
                            left: `${feature.sequencePosition * 8.41}px`
                        }
                        switch (feature.type) {
                            case "promoter":
                                return <Promoter featureStyle={featureStyle} id={feature.id} label={feature.label} height={middleHeight - 7.75} width={30} />
                            case "measure":
                                if (states.measure) {
                                    return <Measure featureStyle={featureStyle} id={feature.id} label={feature.label} height={height} width={8.41} />
                                }
                                return null
                            case "box":
                                return <Box featureStyle={featureStyle} id={feature.id} label={feature.label} height={height} width={feature.boxWidth} />
                            default:
                                return null
                        }
                    })
                }
                <div style={sequenceStyle} >
                    <p id={`sequence_${sequenceId}_p`} className="rdb_p_sequence" dangerouslySetInnerHTML={{ __html: formatSequence.getLinealFormat({ sequenceId: sequenceId, color: color }) }} />
                </div>
            </div>
        </div>
    )
}


function Controls({ states, dispatch }) {

    const handleZoomIn = () => {
        if (states.zoom < 2) {
            dispatch({ zoom: states.zoom + 0.05 })
        }
    }

    const handleZoomOut = () => {
        if (states.zoom > 1) {
            dispatch({ zoom: states.zoom - 0.05 })
        }
    }

    const handleReset = () => {
        dispatch({ zoom: 1, measure: false })
    }

    const handleMeasure = () => {
        dispatch({ measure: !states.measure })
    }

    return (
        <ButtonGroup
            orientation="vertical"
            aria-label="vertical outlined button group"
            variant="contained"
            size="small"
            color="secondary"
        >
            <Tooltip placement="left" title="zoom in">
                <Button onClick={handleZoomIn} ><ZoomInIcon /></Button>
            </Tooltip>

            <Tooltip placement="left" title={"zoom out"}>
                <Button onClick={handleZoomOut}><ZoomOutIcon /></Button>
            </Tooltip>
            <Tooltip placement="left" title={"reset graphic"}>
                <Button onClick={handleReset} ><RestartAltIcon /></Button>
            </Tooltip>
            <Tooltip placement="left" title={"show measure"}>
                <Button onClick={handleMeasure} ><StraightenIcon /></Button>
            </Tooltip>
        </ButtonGroup>
    );
}