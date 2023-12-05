import React, { useRef, useState } from "react";
import {
  ListItemButton,
  ListItemText,
  ListItem,
  Checkbox,
} from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { ACTION } from "../../static";

export default function UploadFile({ state, dispatch }) {
  const [TrackFiles, setTrackFiles] = useState([]);
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const url = reader.result;
        const fileTrack = {
          name: file.name + "-track",
          type: "annotation",
          format: "gff",
          displayMode: "expanded",
          url: url,
        };
        setTrackFiles([...TrackFiles, fileTrack]);
        dispatch({
          type: ACTION.ADD_FILE_TRACK,
          track: fileTrack,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <ListItemButton sx={{ m: "auto" }} onClick={handleButtonClick}>
        <ListItemText primary="Upload File" />
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <AddBoxIcon />
      </ListItemButton>
      {TrackFiles.map((fileTrack) => {
        return (
          <ListItem
            key={"MenuTackGene" + fileTrack.id}
            sx={{ pl: 4 }}
            secondaryAction={
              <Checkbox
                checked={state.fileTracks.hasOwnProperty(fileTrack.name)}
                onChange={() => {
                  if (state.fileTracks.hasOwnProperty(fileTrack.name)) {
                    dispatch({
                      type: ACTION.DELETE_FILE_TRACK,
                      trackName: fileTrack.name,
                    });
                  } else {
                    dispatch({ type: ACTION.ADD_FILE_TRACK, track: fileTrack });
                  }
                }}
              />
            }
          >
            <ListItemText primary={fileTrack.name} />
          </ListItem>
        );
      })}
    </>
  );
}
