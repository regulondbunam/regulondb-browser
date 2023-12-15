import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteIcon from "@mui/icons-material/Delete";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import {
  List,
  ListItemButton,
  Button,
  ListItem,
  ButtonGroup,
  Box,
} from "@mui/material";
import { useState } from "react";
import { ACTION } from "../../static";
import TFBSList from "./TFBSList";
import TUSList from "./TUSList";
import TTSList from "./TTSList";
import TSSList from "./TSSList";

export default function HTList({ state, dispatch }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleAddTrack = (track, dataset) => {
    dispatch({
      type: ACTION.ADD_HT_TRACK,
      track: { ...track, dataset: dataset },
    });
  };

  const handleRemoveTrack = (track) => {
    dispatch({
      type: ACTION.DELETE_HT_TRACK,
      trackName: track.name,
    });
  };

  const handleHideTrack = (track) => {
    dispatch({
      type: ACTION.HIDE_HT_TRACK,
      trackName: track.name,
    });
  };

  return (
    <>
      <ListItemButton onClick={handleOpen} sx={{ m: "auto" }}>
        <ListItemText primary="HT Datasets" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List dense component="div" disablePadding>
          <MenuTFBS
            state={state}
            handleAddTrack={handleAddTrack}
            handleRemoveTrack={handleRemoveTrack}
            handleHideTrack={handleHideTrack}
          />
          <MenuTUS
            state={state}
            handleAddTrack={handleAddTrack}
            handleRemoveTrack={handleRemoveTrack}
            handleHideTrack={handleHideTrack}
          />
          <MenuTTS
            state={state}
            handleAddTrack={handleAddTrack}
            handleRemoveTrack={handleRemoveTrack}
            handleHideTrack={handleHideTrack}
          />
          <MenuTSS
            state={state}
            handleAddTrack={handleAddTrack}
            handleRemoveTrack={handleRemoveTrack}
            handleHideTrack={handleHideTrack} />
        </List>
      </Collapse>
    </>
  );
}

/*
 
          
          
          <MenuGE /> */

function MenuTFBS({
  state,
  handleAddTrack,
  handleRemoveTrack,
  handleHideTrack,
}) {
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  let tracks = [];
  Object.keys(state.htTracks).forEach((key) => {
    const track = state.htTracks[key];
    if (track.dataset.datasetType === "TFBINDING") {
      tracks.push(track);
    }
  });

  const handleOpen = () => {
    setOpen(!open);
  };
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  return (
    <>
      <ListItem sx={{ pl: 2 }}>
        <ListItemText primary="TFBS" />
        <ButtonGroup variant="text" aria-label="text button group">
          <Button onClick={handleOpenModal}>
            <NoteAddIcon />
          </Button>
          <Button onClick={handleOpen}>
            {open ? <ExpandLess /> : <ExpandMore />}
          </Button>
        </ButtonGroup>
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List dense component="div" disablePadding>
          {tracks.map((track) => {
            return (
              <ListItem key={track.name} sx={{ pl: 3 }}>
                <ListItemText primary={track.name} />
                <ButtonGroup variant="text" aria-label="text button group">
                  <Button
                    onClick={() => {
                      handleRemoveTrack(track);
                    }}
                  >
                    <DeleteIcon />
                  </Button>
                  <Button
                    onClick={() => {
                      if (track.view) {
                        handleHideTrack(track);
                      } else {
                        handleAddTrack(track, track.dataset);
                      }
                    }}
                  >
                    {track.view ? (
                      <CheckBoxIcon />
                    ) : (
                      <CheckBoxOutlineBlankIcon />
                    )}
                  </Button>
                </ButtonGroup>
              </ListItem>
            );
          })}
        </List>
      </Collapse>
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        fullWidth
        maxWidth={"md"}
      >
        <DialogTitle>Select HT Dataset</DialogTitle>
        <DialogContent>
          <Box>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TFBSList
                state={state}
                handleAddTrack={handleAddTrack}
                handleRemoveTrack={handleRemoveTrack}
              />
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}

function MenuTUS({
  state,
  handleAddTrack,
  handleRemoveTrack,
  handleHideTrack,
}) {
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  let tracks = [];
  Object.keys(state.htTracks).forEach((key) => {
    const track = state.htTracks[key];
    if (track.dataset.datasetType === "TUS") {
      tracks.push(track);
    }
  });

  const handleOpen = () => {
    setOpen(!open);
  };
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  return (
    <>
      <ListItem sx={{ pl: 2 }}>
        <ListItemText primary="TUS" />
        <ButtonGroup variant="text" aria-label="text button group">
          <Button onClick={handleOpenModal}>
            <NoteAddIcon />
          </Button>
          <Button onClick={handleOpen}>
            {open ? <ExpandLess /> : <ExpandMore />}
          </Button>
        </ButtonGroup>
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List dense component="div" disablePadding>
          {tracks.map((track) => {
            return (
              <ListItem key={track.name} sx={{ pl: 3 }}>
                <ListItemText primary={track.name} />
                <ButtonGroup variant="text" aria-label="text button group">
                  <Button
                    onClick={() => {
                      handleRemoveTrack(track);
                    }}
                  >
                    <DeleteIcon />
                  </Button>
                  <Button
                    onClick={() => {
                      if (track.view) {
                        handleHideTrack(track);
                      } else {
                        handleAddTrack(track, track.dataset);
                      }
                    }}
                  >
                    {track.view ? (
                      <CheckBoxIcon />
                    ) : (
                      <CheckBoxOutlineBlankIcon />
                    )}
                  </Button>
                </ButtonGroup>
              </ListItem>
            );
          })}
        </List>
      </Collapse>
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        fullWidth
        maxWidth={"md"}
      >
        <DialogTitle>Select HT Dataset</DialogTitle>
        <DialogContent>
          <Box>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TUSList
                state={state}
                handleAddTrack={handleAddTrack}
                handleRemoveTrack={handleRemoveTrack}
              />
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}

function MenuTTS({
  state,
  handleAddTrack,
  handleRemoveTrack,
  handleHideTrack,
}) {
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  let tracks = [];
  Object.keys(state.htTracks).forEach((key) => {
    const track = state.htTracks[key];
    if (track.dataset.datasetType === "TTS") {
      tracks.push(track);
    }
  });

  const handleOpen = () => {
    setOpen(!open);
  };
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  return (
    <>
      <ListItem sx={{ pl: 2 }}>
        <ListItemText primary="TTS" />
        <ButtonGroup variant="text" aria-label="text button group">
          <Button onClick={handleOpenModal}>
            <NoteAddIcon />
          </Button>
          <Button onClick={handleOpen}>
            {open ? <ExpandLess /> : <ExpandMore />}
          </Button>
        </ButtonGroup>
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List dense component="div" disablePadding>
          {tracks.map((track) => {
            return (
              <ListItem key={track.name} sx={{ pl: 3 }}>
                <ListItemText primary={track.name} />
                <ButtonGroup variant="text" aria-label="text button group">
                  <Button
                    onClick={() => {
                      handleRemoveTrack(track);
                    }}
                  >
                    <DeleteIcon />
                  </Button>
                  <Button
                    onClick={() => {
                      if (track.view) {
                        handleHideTrack(track);
                      } else {
                        handleAddTrack(track, track.dataset);
                      }
                    }}
                  >
                    {track.view ? (
                      <CheckBoxIcon />
                    ) : (
                      <CheckBoxOutlineBlankIcon />
                    )}
                  </Button>
                </ButtonGroup>
              </ListItem>
            );
          })}
        </List>
      </Collapse>
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        fullWidth
        maxWidth={"md"}
      >
        <DialogTitle>Select HT Dataset</DialogTitle>
        <DialogContent>
          <Box>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TTSList
                state={state}
                handleAddTrack={handleAddTrack}
                handleRemoveTrack={handleRemoveTrack}
              />
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}

function MenuTSS({
  state,
  handleAddTrack,
  handleRemoveTrack,
  handleHideTrack,
}) {
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  let tracks = [];
  Object.keys(state.htTracks).forEach((key) => {
    const track = state.htTracks[key];
    if (track.dataset.datasetType === "TSS") {
      tracks.push(track);
    }
  });

  const handleOpen = () => {
    setOpen(!open);
  };
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  return (
    <>
      <ListItem sx={{ pl: 2 }}>
        <ListItemText primary="TSS" />
        <ButtonGroup variant="text" aria-label="text button group">
          <Button onClick={handleOpenModal}>
            <NoteAddIcon />
          </Button>
          <Button onClick={handleOpen}>
            {open ? <ExpandLess /> : <ExpandMore />}
          </Button>
        </ButtonGroup>
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List dense component="div" disablePadding>
          {tracks.map((track) => {
            return (
              <ListItem key={track.name} sx={{ pl: 3 }}>
                <ListItemText primary={track.name} />
                <ButtonGroup variant="text" aria-label="text button group">
                  <Button
                    onClick={() => {
                      handleRemoveTrack(track);
                    }}
                  >
                    <DeleteIcon />
                  </Button>
                  <Button
                    onClick={() => {
                      if (track.view) {
                        handleHideTrack(track);
                      } else {
                        handleAddTrack(track, track.dataset);
                      }
                    }}
                  >
                    {track.view ? (
                      <CheckBoxIcon />
                    ) : (
                      <CheckBoxOutlineBlankIcon />
                    )}
                  </Button>
                </ButtonGroup>
              </ListItem>
            );
          })}
        </List>
      </Collapse>
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        fullWidth
        maxWidth={"md"}
      >
        <DialogTitle>Select HT Dataset</DialogTitle>
        <DialogContent>
          <Box>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TSSList
                state={state}
                handleAddTrack={handleAddTrack}
                handleRemoveTrack={handleRemoveTrack}
              />
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
