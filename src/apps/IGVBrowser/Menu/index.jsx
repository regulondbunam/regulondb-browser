import * as React from "react";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import ListItemText from "@mui/material/ListItemText";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import MenuIcon from "@mui/icons-material/Menu";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Checkbox } from "@mui/material";
import {
  List,
  ListItemButton,
  Tooltip,
  Button,
  ListItem,
  Box,
} from "@mui/material";
import { useState } from "react";
import { RDBTracks } from "./RDBTracks";
import { ACTION } from "../static";
import HTList from "./HTTracks";
import UploadFile from "./UploadFile";

export default function Menu({ state, dispatch, viewMenu, setViewMenu }) {
  const handleViewMenu = () => {
    setViewMenu(!viewMenu);
  };
  if (!viewMenu) {
    return (
      <Paper>
        <List>
          <Tooltip title="Show Menu Track Options">
            <ListItemButton onClick={handleViewMenu}>
              <MenuIcon />
            </ListItemButton>
          </Tooltip>
        </List>
      </Paper>
    );
  }
  return (
    <>
      <Paper>
        <List>
          <ListItem>
            <ListItemText primary="Track Options" />
            {/*
            <Tooltip title="Hide Menu Track Options">
              <Button onClick={handleViewMenu}>
                <MenuOpenIcon />
              </Button>
            </Tooltip>
            */}
          </ListItem>
          <Divider />
          <div>
            <Tooltip title="The supported format is GFF3 the seqid queue must contain the id NC_000913.3" >
              <p><b>sequence ID: NC_000913.3</b></p>
            </Tooltip>
          </div>
          <UploadFile state={state} dispatch={dispatch} />
          <Divider />
          <RegulonDBList state={state} dispatch={dispatch} />
          <Divider />
          <HTList state={state} dispatch={dispatch} />
        </List>
      </Paper>
    </>
  );
}

function RegulonDBList({ state, dispatch }) {
  const [open, setOpen] = useState(true);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItemButton onClick={handleOpen} sx={{ m: "auto" }}>
        <ListItemText primary="RegulonDB Datasets" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List dense component="div" disablePadding>
          {RDBTracks.map((track) => {
            return (
              <ListItem
                key={"MenuTackGene" + track.id}
                sx={{ pl: 4 }}
                secondaryAction={
                  <Checkbox
                    checked={state.tracks.hasOwnProperty(track.name)}
                    onChange={() => {
                      if (state.tracks.hasOwnProperty(track.name)) {
                        dispatch({
                          type: ACTION.DELETE_TRACK,
                          trackName: track.name,
                        });
                      } else {
                        dispatch({ type: ACTION.ADD_TRACK, track: track });
                      }
                    }}
                  />
                }
              >
                <ListItemText primary={track.name} />
              </ListItem>
            );
          })}
        </List>
      </Collapse>
    </>
  );
}
