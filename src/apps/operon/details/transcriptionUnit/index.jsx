import TUDtt from "./dtt";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ListItemButton from "@mui/material/ListItemButton";
import { CitationsNote } from "../../../../components/citations/citations_note";
import React, { useState, useMemo } from "react";
import "./tu.css"
import Paper from "@mui/material/Paper";
import Genes from "./genes";
import Promoter from "./promoter";
import Terminators from "./terminator";
import AllRBS from "./allRBS";

const listItemStyle = [
  {
    "&:hover": {
      backgroundColor: "#72a7c7",
    },
  },
  {
    height: "30px",
    backgroundColor: "#cadce7",
  },
];

export default function TranscriptionUnit({
  allCitations,
  operon,
  tu,
  showInfo = false,
}) {
  const [_openNote, set_openNote] = useState(false);
  const [_openFgene, set_openFgene] = useState(true);
  const [_openPromoter, set_openPromoter] = useState(true);
  const [_openTerminators, set_openTerminators] = useState(true);
  const [_openRBS, set_openRBS] = useState(true);

  const regulatorBindingSitesGroups = useMemo(() => {
    let rbsg = {
        promoter: undefined,
        genes: undefined,
        rbs: undefined
    }
    if (tu?.promoter) {
        rbsg.promoter = {
            name: tu.promoter.name,
            regulatorBindingSites: tu.promoter.regulatorBindingSites
        }
    }
    if (tu.genes.length > 0) {
        let rbsInGenes = []
        tu.genes.forEach((gene) => {
            if (gene.regulatorBindingSites.length > 0) {
                rbsInGenes.push({
                    id: gene.id,
                    name: gene.name,
                    regulatorBindingSites: gene.regulatorBindingSites
                })
            }
        })
        if (rbsInGenes.length > 0) {
            rbsg.genes = rbsInGenes
        }
    }
    if (tu.regulatorBindingSites.length > 0) {
        rbsg.rbs = tu.regulatorBindingSites
    }
    return rbsg
}, [tu])

  //console.log(tu);
  return (
    <div>
      <div style={{ marginLeft: "10%" }}>
        <h2>Transcription Unit {`${tu.name}`}</h2>
      </div>
      <TUDtt operon={operon} tu={tu} showControls={showInfo} />
      {showInfo && (
        <div style={{ marginLeft: "10%", marginRight: "10%" }}>
          <List
            sx={{ width: "100%", bgcolor: "background.paper" }}
            component="nav"
            aria-labelledby="nested-list-subheader"
          >
            {tu?.genes.length > 0 && (
              <React.Fragment>
                <ListItemButton
                  onClick={() => {
                    set_openFgene(!_openFgene);
                  }}
                  sx={listItemStyle}
                >
                  <ListItemText primary="Gene Info" />
                  {_openFgene ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={_openFgene} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <Paper elevation={3} sx={{ padding: "5px" }}>
                      <Genes firstGene={tu.firstGene} genes={tu.genes} allCitations={allCitations} />
                    </Paper>
                  </List>
                </Collapse>
              </React.Fragment>
            )}
            {tu.promoter?.id && (
              <React.Fragment>
                <ListItemButton
                  onClick={() => {
                    set_openPromoter(!_openPromoter);
                  }}
                  sx={listItemStyle}
                >
                  <ListItemText primary="Promoter" />
                  {_openPromoter ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={_openPromoter} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <Paper elevation={3} sx={{ padding: "5px" }}>
                      <Promoter tuId={tu.id} allCitations={allCitations} promoter={tu.promoter} />
                    </Paper>
                  </List>
                </Collapse>
              </React.Fragment>
            )}
            {tu.terminators.length > 0 && (
              <React.Fragment>
                <ListItemButton
                  onClick={() => {
                    set_openTerminators(!_openTerminators);
                  }}
                  sx={listItemStyle}
                >
                  <ListItemText primary="Terminators" />
                  {_openTerminators ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={_openTerminators} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <Paper elevation={3} sx={{ padding: "5px" }}>
                      <Terminators tuId={tu.id} allCitations={allCitations} terminators={tu.terminators} />
                    </Paper>
                  </List>
                </Collapse>
              </React.Fragment>
            )}
            {(regulatorBindingSitesGroups?.genes || regulatorBindingSitesGroups?.promoter || regulatorBindingSitesGroups?.rbs)
            ? (
              <React.Fragment>
                <ListItemButton
                  onClick={() => {
                    set_openRBS(!_openRBS);
                  }}
                  sx={listItemStyle}
                >
                  <ListItemText primary="Regulators Binding Sites" />
                  {_openRBS ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={_openRBS} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <Paper elevation={3} sx={{ padding: "5px" }}>
                      <AllRBS tuId={tu.id} allCitations={allCitations} regulatorBindingSitesGroups={regulatorBindingSitesGroups} />
                    </Paper>
                  </List>
                </Collapse>
              </React.Fragment>
            )
            : null
            }
            {tu?.note && (
              <React.Fragment >
                <ListItemButton
                  onClick={() => {
                    set_openNote(!_openNote);
                  }}
                  sx={listItemStyle}
                >
                  <ListItemText primary="Note" />
                  {_openNote ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={_openNote} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <Paper elevation={3} sx={{ padding: "5px" }}>
                      <TuInfo tu={tu} allCitations={allCitations} />
                    </Paper>
                  </List>
                </Collapse>
              </React.Fragment>
            )}
          </List>
        </div>
      )}
    </div>
  );
}

const TuInfo = ({ tu, allCitations }) => {
  return (
    <div>
      <p
        dangerouslySetInnerHTML={{
          __html: CitationsNote(allCitations, tu.note),
        }}
      />
    </div>
  );
};
