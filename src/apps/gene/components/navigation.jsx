import React, { useState } from "react";
import { DataVerifier } from "../../../components/ui-components";
//import { ExternalCrossReferences } from "../../../components/datamartSchema"
import { useNavigate } from "react-router-dom";
import List from "@mui/material/List";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";


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
              {genes.map((gene) => {
                if(!DataVerifier.isValidString(gene._id)){
                  return null
                }
                return (
                  <ListItemButton
                key={gene._id}
                  sx={{ pl: 4 }}
                  onClick={() => {
                    navigate("/gene/" + gene._id);
                  }}
                >
                  <p>Gene {" " + gene.name}</p>
                </ListItemButton>
                )
              })}
            </>
          )}
          {DataVerifier.isValidArray(operons) && (
            <>
              {operons.map((operon) => {
                if(!DataVerifier.isValidString(operon._id)){
                  return null
                }
                return (
                  <ListItemButton
                  key={operon._id}
                    sx={{ pl: 4 }}
                    onClick={() => {
                      navigate("/operon/" + operon._id);
                    }}
                  >
                    <p>Operon {" " + operon.name}</p>
                  </ListItemButton>
                )
              })}
            </>
          )}
          {DataVerifier.isValidArray(regulons) && (
            <>
              {regulons.map((regulon) => {
                if(!DataVerifier.isValidString(regulon._id)){
                  return null
                }
                return (
                  <ListItemButton
                key={regulon._id}
                  sx={{ pl: 4 }}
                  onClick={() => {
                    navigate("/regulon/" + regulon._id);
                  }}
                >
                  <p>Regulon {" " + regulon.name}</p>
                </ListItemButton>
                )
              })}
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
