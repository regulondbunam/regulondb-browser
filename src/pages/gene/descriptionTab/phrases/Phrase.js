import React, { useState } from 'react';

const Phrase = ({
    term,
    phraseData
}) => {
    const [visible, setVisible] = useState(false)
    let styleTerm = {margin: "0"}
    if (visible) {
        styleTerm = {
            cursor:"help",
            margin: "0",
            boxShadow:"0px 0px 5px 2px #fff8a6 inset",
            float: "left"
        }
    }else{
        styleTerm = {margin: "0",cursor:"help",float: "left"}
    }
    if(phraseData !== undefined){
        return (
            <>
            <p style={styleTerm} onContextMenu={(event)=>{
                //console.log(event)
                event.preventDefault();
                setVisible(!visible)
                }}
            >
                {term}
            </p>
            {
                visible
                ?<div id={phraseData.pmid} style={StyleTooltip}>
                    <h3>{phraseData.name}</h3>
                    <p>{phraseData.phrases[0].phrase}</p>
                </div>
                :null
            }
            </>
            
         );
    }
    return(
        <p style={styleTerm} onContextMenu={(event)=>{
            //console.log(event)
            event.preventDefault();
            }}
        >
            {term}
        </p>
    )
    
}

const StyleTooltip = {
    backgroundColor: "#fff8a6",
    position: "absolute", 
    marginTop: "15px",
    boxShadow: "10px 10px 5px 0px rgba(0,0,0,0.75)"
}

export default Phrase;