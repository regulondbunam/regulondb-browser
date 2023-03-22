import React, { useState } from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ListItem from "@mui/material/ListItem";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Switch from "@mui/material/Switch";
import { enableInformationPhrases } from "../tools/description/Information";
import { Link } from "react-router-dom";

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

export default function RelatedDocTools({
  geneId,
  leftEndPosition,
  rightEndPosition,
  externalReferences = [],
}) {
  const [_openRT, set_openRT] = useState(true);
  //const [_openRD, set_openRD] = useState(false);
  const [_openD, set_openD] = useState(false);
  const [_openER, set_openER] = useState(true);
  const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

  const _handleViewPhrases = (event) => {
    enableInformationPhrases(event.target.checked);
  };

  return (
    <List sx={{ width: "95%", bgcolor: "background.paper" }} dense={true}>
      
      <ListItemButton
        onClick={() => {
          set_openRT(!_openRT);
        }}
      >
        <ListItemText primary="Related Tools" />
        {_openRT ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={_openRT} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem sx={{ pl: 4 }}>
            <ListItemText primary="L&C Phrases" />
            <Switch
              edge="end"
              onChange={_handleViewPhrases}
              defaultChecked={false}
            />
          </ListItem>
          <ListItemButton sx={{ pl: 4 }}>
            <Link
              to={`/dtt/leftEndPosition=${leftEndPosition}&rightEndPosition=${rightEndPosition}`}
            >
              <ListItemText primary="Drawing Traces Tool" />
            </Link>
          </ListItemButton>
        </List>
      </Collapse>
      <ListItemButton
        onClick={() => {
          set_openER(!_openER);
        }}
      >
        <ListItemText primary="External References" />
        {_openER ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={_openER} timeout="auto" unmountOnExit>
        <List dense={true} component="div" disablePadding>
          {externalReferences.map((ref, index) => {
            return (
              <ListItem
                sx={{ pl: 4 }}
                key={`listCrossReferences_${index}_${ref.externalCrossReferenceId}`}
              >
                <a
                        href={`${ref?.url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >{`${ref?.objectId}(${ref?.externalCrossReferenceName})`}</a>
              </ListItem>
            );
          })}
        </List>
      </Collapse>
      <ListItemButton onClick={handleOpen}>
        <ListItemText primary="User Feedback" />
      </ListItemButton>
      <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <div style={{display: "flex",flexDirection: "row-reverse"}} ><button onClick={handleClose} className="accent" >Close</button></div>
            <div class="asana-embed-container"><link rel="stylesheet" href="https://form.asana.com/static/asana-form-embed-style.css"/><iframe title="feedbackForm" className="asana-embed-iframe" src="https://form.asana.com/?k=uzd6ZoyuRLFIKgmaAw1uKQ&d=1108899165642340&embed=true"></iframe><div class="asana-embed-footer"><a rel="nofollow noopener  noreferrer" target="_blank" class="asana-embed-footer-link" href="https://asana.com/es?utm_source=embedded_form"><span class="asana-embed-footer-text Typography Typography--s">Formulario desarrollado por</span><div class="asana-embed-footer-logo" role="img" aria-label="Logo de Asana"></div></a></div></div>
            
            </Box>
          </Modal>
    </List>
  );
}

/**
 *       <ListItemButton
        onClick={() => {
          set_openD(!_openD);
        }}
      >
        <ListItemText primary="Display Options" />
        {_openD ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
 * <Collapse in={_openD} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
          <a href={`${process.env.REACT_APP_PROSSES_SERVICE}/ecoli/gene/${geneId}/pdf`}
                  target="_blank" rel="noopener noreferrer"
                      >
                        PDF 
                      </a>
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
          <a href={`${process.env.REACT_APP_PROSSES_SERVICE}/ecoli/gene/${geneId}/txt`}
                  target="_blank" rel="noopener noreferrer"
                      >
                        Download Text only (v0.1) 
                      </a>
          </ListItemButton>
          <ListItem sx={{ pl: 4 }}>
                <a href={`${process.env.REACT_APP_PROSSES_SERVICE}/ecoli/gene/${geneId}/jsongql`}
                  target="_blank" rel="noopener noreferrer"
                      >
                        JSON (RAW)
                      </a>
              </ListItem>
        </List>
      </Collapse>
 */
