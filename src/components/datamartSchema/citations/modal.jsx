import React from 'react';
import PropTypes from 'prop-types';
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Publication, DEFAULT_PUBLICATION_PROPS } from './publication';
import { EvidenceTitle, DEFAULT_EVIDENCE_PROPS } from './evidence';
import { labelCitation } from './label';

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

const PROP_TYPES = {
    evidence: PropTypes.object,
    publication: PropTypes.object,
};

export const DEFAULT_MODAL_CITATION_PROPS = {
    evidence: DEFAULT_EVIDENCE_PROPS,
    publication: DEFAULT_PUBLICATION_PROPS,
}

export function ModalCitation({evidence, publication}) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <>
            <p style={{whiteSpace: "nowrap", float: "left"}} className="aBase citation" onClick={handleOpen} dangerouslySetInnerHTML={{__html: labelCitation(publication,evidence)}} />
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                {evidence?._id && (<EvidenceTitle {...evidence} />)}
                {publication?._id && (<Publication {...publication} />)}
              </Box>
            </Modal>
        </>
        )
}

ModalCitation.defaultProps = DEFAULT_MODAL_CITATION_PROPS

ModalCitation.propTypes = PROP_TYPES