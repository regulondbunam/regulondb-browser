import React, { useState } from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ListItem from "@mui/material/ListItem";
import Switch from "@mui/material/Switch";
import { enableInformationPhrases } from "../tools/description/Information";
import { Link } from "react-router-dom";

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
      <ListItemButton
        onClick={() => {
          set_openD(!_openD);
        }}
      >
        <ListItemText primary="Display Options" />
        {_openD ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={_openD} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemText primary="PDF" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemText primary="only text (v0.1)" />
          </ListItemButton>
          <ListItem sx={{ pl: 4 }}>
                <a href={`${process.env.REACT_APP_PROSSES_SERVICE}ecoli/gene/${geneId}/jsongql`}
                  target="_blank" rel="noopener noreferrer"
                      >
                        JSON (RAW)
                      </a>
              </ListItem>
        </List>
      </Collapse>
      <ListItemButton>
        <ListItemText primary="User Feedback" />
      </ListItemButton>
    </List>
  );
}

/**
 * <ListItemButton
        onClick={() => {
          set_openRD(!_openRD);
        }}
      >
        <ListItemText primary="Related Documents" />
        {_openRD ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={_openRD} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemText primary="Starred" />
          </ListItemButton>
        </List>
      </Collapse>
 */
