import React from 'react';
import { Accordion, DataVerifier } from "../../../components/ui-components"
import { ExternalCrossReferences } from "../../../components/datamartSchema"
import { Link } from "react-router-dom"
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

export default function RelatedTool({ gene, products }) {

    const [open, setOpen] = React.useState(false);

    return (
        <div>
            <Accordion title={<p style={{ fontWeight: "bold" }}>Related Tools</p>} >
                {DataVerifier.isValidObject(gene) && (
                    <>
                        {DataVerifier.isValidNumber(gene.leftEndPosition) && (
                            <Link
                                to={`/dtt/leftEndPosition=${gene.leftEndPosition - 1000}&rightEndPosition=${gene.rightEndPosition + 1000}`}
                            >
                                <b>Drawing Traces Tool</b>
                            </Link>
                        )}
                    </>
                )}
            </Accordion>
            <Accordion title={<p style={{ fontWeight: "bold" }}>External Cross References</p>} >
                {DataVerifier.isValidArray(gene.externalCrossReferences) && (
                    <>
                        <b>Gene References: </b>
                        <ExternalCrossReferences variant="list" externalCrossReferences={gene.externalCrossReferences} />
                    </>
                )}
            </Accordion>
            <Accordion title={<p style={{ fontWeight: "bold" }}>User Feedback</p>} >
                <button onClick={()=>{setOpen(!open)}} >User Feedback</button>
                <Modal
                    open={open}
                    onClose={() => { setOpen(!open) }}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <div style={{ display: "flex", flexDirection: "row-reverse" }} ><button onClick={() => { setOpen(!open) }} className="accent" >Close</button></div>
                        <div class="asana-embed-container"><link rel="stylesheet" href="https://form.asana.com/static/asana-form-embed-style.css" /><iframe title="feedbackForm" className="asana-embed-iframe" src="https://form.asana.com/?k=uzd6ZoyuRLFIKgmaAw1uKQ&d=1108899165642340&embed=true"></iframe><div class="asana-embed-footer"><a rel="nofollow noopener  noreferrer" target="_blank" class="asana-embed-footer-link" href="https://asana.com/es?utm_source=embedded_form"><span class="asana-embed-footer-text Typography Typography--s">Formulario desarrollado por</span><div class="asana-embed-footer-logo" role="img" aria-label="Logo de Asana"></div></a></div></div>
                    </Box>
                </Modal>
            </Accordion>
        </div>
    )
}