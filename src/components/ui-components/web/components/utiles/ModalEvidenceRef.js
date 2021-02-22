import React from 'react';
import Modal from '../../../output/modal/Modal'

const ModalER = ({
    cit,
    title,
    classNameModal,
    k,
}) => {
    let evidence = ""
    let references = ""
    const evi = cit?.evidence
    const pub = cit?.publication
    let styleStrong = {}
    try {
        if (evi?.type === "Strong") {
            styleStrong = { fontWeight: "bold" }
        }
        if (evi?.code) {
            evidence = `
            <h2>Evidence</h1>
            <h1>${evi?.code}: ${validateStr(evi?.name)}
            <br>(${validateStr(evi?.type)})
            </h1>
            `
        }
        if(pub?.citation){
            references = `
            <h2>Reference:</h2>
            <h2><a href="${validateStr(pub?.url)}" target="_blank" rel="noopener noreferrer" >Go to Refence</a></h2>
            <p>pmid:${validateStr(pub?.pmid)}</p>
            <p class="citation">${pub?.citation}</p>
        `
        }
        return (
            <Modal className={`aBase ${classNameModal}`} style={styleStrong} title={title} info={`${evidence} ${references}`} />
        );
    } catch (error) {
        console.log("edivence error: ", error)
        return (<></>);
    }

}

export default ModalER;

function validateStr(str = undefined) {
    if (str) return str;
    return ""
}