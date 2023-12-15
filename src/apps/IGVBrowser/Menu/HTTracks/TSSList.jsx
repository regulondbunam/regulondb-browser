import React, { useRef, useState, memo, useEffect } from "react";
import memoize from "memoize-one";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import { FixedSizeList, areEqual } from "react-window";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import CheckIcon from "@mui/icons-material/Check";
import { CircularProgress } from "@mui/material";
import { TextField } from "@mui/material";
import { useLazyQuery } from "@apollo/client";
import { QUERY_getAllTSSDataset } from "../../tracks/htCollection/queries";
import { DataVerifier } from "../../../../components/ui-components";
import { useGetAllHTDatasetsTSS } from "../../tracks/htCollection";

const createItemData = memoize((datasets, toggleItemActive) => ({
  datasets,
  toggleItemActive,
}));

export default function TSSList({
  state,
  handleAddTrack = () => {},
  handleRemoveTrack = () => {},
}) {
  const { datasetList, loading } = useGetAllHTDatasetsTSS();
  const [datasets, setDatasets] = useState();
  const keyListener = useRef(null);

  useEffect(() => {
    if(datasetList && !datasets){
      setDatasets(datasetList.map((dataset) => ({ ...dataset, isActive: false })))
    }
  }, [datasetList, datasets])

  const toggleItemActive = (index) => {
    let setDataset = { ...datasets[index] };
    setDataset.isActive = !setDataset.isActive;
    let newDatasets = [...datasets];
    newDatasets[index] = setDataset;
    setDatasets(newDatasets);
  };

  const handleFilter = (e) => {
    const value = e.target.value;
    if (keyListener.current !== null) {
      clearTimeout(keyListener.current);
    }
    keyListener.current = setTimeout(() => {
      const filteredItems = datasetList.filter((dataset) =>
        dataset.sample.title.toLowerCase().includes(value.toLowerCase())
      );
      setDatasets(filteredItems);
    }, 250);
  };
  //console.log(datasetList);

  if(!datasets){
    return(
      <div>
        <h3>Loading...</h3>
      </div>
    )
  }

  const itemData = createItemData(datasets, toggleItemActive);

  return (
    <div>
      <h3>Transcription Start Sites</h3>
      <TextField size="small" onChange={handleFilter} />
      <List
        sx={{ width: "100%", bgcolor: "background.paper" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        <FixedSizeList
          height={300}
          itemSize={40}
          itemCount={datasets.length}
          itemData={{ itemData, state, handleAddTrack, handleRemoveTrack }}
        >
          {datasetItem}
        </FixedSizeList>
      </List>
    </div>
  );
}

const datasetItem = memo(({ index, data, style }) => {
  const [getFeatures, { loading }] = useLazyQuery(QUERY_getAllTSSDataset);
  const [isFeatures, setIsFeatures] = useState(false);
  const { itemData, state, handleAddTrack, handleRemoveTrack } = data;
  const { datasets, toggleItemActive } = itemData;
  const dataset = datasets[index];
  const open = dataset.isActive;
  const trackName = "["+dataset._id+"]"+dataset.sourceSerie?.title ?? "";
  const file = `${process.env.REACT_APP_PROSSES_SERVICE}/${dataset._id}/tss/gff3`
  const track = {
    name: "["+dataset._id+"]",
    url: file,
    format: "gff3",
    displayMode: "EXPANDED",
    color: "#0EC2C3",
    nameField: trackName,
  };
  // {state.htTracks.hasOwnProperty(track.name)}
  const handleOpen = () => {
    console.log("Abierto")
    toggleItemActive(index);
    getFeatures({
      variables: {
        limit: 1,
        datasetId: dataset._id,
      },
      onCompleted: (data) => {
        //console.log(data);
        setIsFeatures(DataVerifier.isValidArray(data.getAllTSSOfDataset));
      },
    });
  };

  const handleClose = () => {
    toggleItemActive(index);
  };

  return (
    <div key={dataset._id + "_" + index} style={style}>
      <ListItemButton onClick={handleOpen}>
        <ListItemText primary={trackName} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List
          component="div"
          disablePadding
          sx={{
            backgroundColor: "#ffffff",
            zIndex: 99,
            border: "1px solid #000000",
          }}
        >
          {loading ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <CircularProgress />
            </div>
          ) : (
            <>
              {isFeatures ? (
                <ListItemButton
                  sx={{ pl: 4 }}
                  onClick={() => {
                    if (state.htTracks.hasOwnProperty(track.name)) {
                      handleRemoveTrack(track)
                    } else {
                      handleAddTrack(track,dataset)
                    }
                  }}
                >
                  {state.htTracks.hasOwnProperty(track.name) && (
                    <ListItemIcon>
                      <CheckIcon />
                    </ListItemIcon>
                  )}
                  <ListItemText primary={track.name + " Track"} />
                </ListItemButton>
              ):(
                <ListItemButton sx={{ pl: 4 }} onClick={handleClose}>
                  <ListItemText primary="This Dataset has no drawing track files." />
                </ListItemButton>
              )}
            </>
          )}
        </List>
      </Collapse>
    </div>
  );
}, areEqual);
