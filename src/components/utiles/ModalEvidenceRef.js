import React from 'react';
import Modal from '../../components/ui-components/infoDisplay/modal/Modal'

const ModalER = ({
    evidenceReference,
    title,
    classNameModal
}) => {
    let styleStrong = {}
    if (evidenceReference.evidenceType === "Strong") {
        styleStrong = { fontWeight: "bold" }
    }
    try {
        const eviref = `
            <h2>Evidence</h1>
            <h1>${evidenceReference.evidenceCode}: ${evidenceReference.evidenceName}
            <br>(${evidenceReference.evidenceType})
            </h1>
            <h2>Reference:</h2>
            <h2><a href="${evidenceReference.referenceURL}" target="_blank" rel="noopener noreferrer" >Go to Refence</a></h2>
            <p class="citation">${evidenceReference.referenceCitation}</p>
        `
    return ( 
        <Modal className={`aBase ${classNameModal}`} style={styleStrong} title={title} info={eviref} />
     );
    } catch (error) {
        console.log("edivence error: ",error)
        return ( <></> );
    }
    
}

export default ModalER;