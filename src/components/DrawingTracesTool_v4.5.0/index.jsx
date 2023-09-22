import PropTypes from "prop-types";
import { useId } from "react";

export const DTT_CONTEXT = {
    gene: "gene",
    operon: "operon",
    dti: "dti",
}

export default function DrawingTracesTool({
    context,
    controls,
    custom_geneticElements,
    getGeneticElements,
    getStatus,
    height,
    id,
    leftEndPosition,
    rightEndPosition,
    title = "",
    getId = ()=>{}
}) {
    const idDrawPlace = id+"_drawPlace"
    const idCanvas = id+"_drawCanvas"

    return(
        <div></div>
    )
}

const isContext = (props, propName, componentName) => {
    if(props[propName]){
        const validProp = DTT_CONTEXT[props[propName]]
        if(!validProp){
            return new Error(
                "Invalid prop `" +
                  propName +
                  "` supplied to" +
                  " `" +
                  componentName +
                  "`. Validation failed," +
                  "valid elements: " +
                  Object.keys(DTT_CONTEXT).join(", ")
              );
        }
    }
  };

DrawingTracesTool.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    //relatedIds: PropTypes.array,
    height: PropTypes.number,
    context: isContext,
    leftEndPosition: PropTypes.number,
    rightEndPosition: PropTypes.number,
    //covered:PropTypes.bool,
    //objectType:PropTypes.array,
    //fragments: PropTypes.array,
    //strand: isStrand,
    custom_geneticElements: PropTypes.array,
    getGeneticElements: PropTypes.func,
    getStatus: PropTypes.func,
    getId: PropTypes.func,
    controls: PropTypes.bool
  };