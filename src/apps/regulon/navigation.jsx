import React, { useState } from "react";
import { DataVerifier } from "../../components/ui-components";
//import { ExternalCrossReferences } from "../../../components/datamartSchema"
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import List from "@mui/material/List";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
//import ListItem from '@mui/material/ListItem';
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import Divider from "@mui/material/Divider";
import Collapse from "@mui/material/Collapse";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

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

export default function Navigation({
  genes = [],
  operons = [],
  sigmulon = [],
  regulons = [],
  htIds=[],
  guIds=[],
}) {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  return (
    <List dense>
      <ListItemButton
        onClick={() => {
          setOpen(!open);
        }}
      >
        <ListItemText primary={"Navigation"} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {DataVerifier.isValidArray(genes) && (
            <>
              {genes.map((gene) => (
                <ListItemButton
                key={gene._id}
                  sx={{ pl: 4 }}
                  onClick={() => {
                    navigate("/gene/" + gene._id);
                  }}
                >
                  <p>Gene {" " + gene.name}</p>
                </ListItemButton>
              ))}
            </>
          )}
          {DataVerifier.isValidArray(operons) && (
            <>
              {operons.map((operon) => (
                <ListItemButton
                key={operon._id}
                  sx={{ pl: 4 }}
                  onClick={() => {
                    navigate("/operon/" + operon._id);
                  }}
                >
                  <p>Operon {" " + operon.name}</p>
                </ListItemButton>
              ))}
            </>
          )}
          {DataVerifier.isValidArray(htIds) && (
            <>
              {htIds.map((htId) => {
                if (!htId) {
                    return null
                }
                return(
                    <ListItemButton
                  sx={{ pl: 4 }}
                  onClick={() => {
                    navigate("/ht/dataset/TFBINDING/datasetId=" + htId);
                  }}
                >
                  <p>Dataset [{htId}]</p>
                </ListItemButton>
                )
              })}
            </>
          )}
          {DataVerifier.isValidArray(guIds) && (
            <>
              {guIds.map((guId) => {
                if (!guId) {
                    return null
                }
                return(
                    <ListItemButton
                  sx={{ pl: 4 }}
                  onClick={() => {
                    navigate("/gu/" + guId);
                  }}
                >
                  <p>Gensor Unit [{guId}]</p>
                </ListItemButton>
                )
              })}
            </>
          )}
        </List>
      </Collapse>
    </List>
  );
}
