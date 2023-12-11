import React, { useRef, useState, memo } from "react";
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
import { QUERY_getAllTipsDataset } from "../../tracks/htCollection/queries";
import { DataVerifier } from "../../../../components/ui-components";

const createItemData = memoize((datasets, toggleItemActive) => ({
  datasets,
  toggleItemActive,
}));

export default function TFBSList({
  datasetList = [],
  state,
  handleAddTrack = () => {},
  handleRemoveTrack = () => {},
}) {
  const [datasets, setDatasets] = useState(
    datasetList.map((dataset) => ({ ...dataset, isActive: false }))
  );
  const keyListener = useRef(null);

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
  console.log(datasetList);


  const itemData = createItemData(datasets, toggleItemActive);

  return (
    <div>
      <h3>TF Binding Sites</h3>
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
  const [getFeatures, { loading }] = useLazyQuery(QUERY_getAllTipsDataset);
  const [isFeatures, setIsFeatures] = useState({
    peaks: undefined,
    sites: undefined,
  });
  const { itemData, state, handleAddTrack, handleRemoveTrack } = data;
  const { datasets, toggleItemActive } = itemData;
  
  const dataset = datasets[index];
  const open = dataset.isActive;
  const trackName = dataset.sample.title.substring(0, 4)+"-"+dataset.sourceSerie.title;
  const peaksFile = `${process.env.REACT_APP_PROSSES_SERVICE}/${dataset._id}/peaks/gff3`;
  const sitesFile = `${process.env.REACT_APP_PROSSES_SERVICE}/${dataset._id}/sites/gff3`;
  const trackPeaks = {
    name: "["+dataset._id+"]-Peaks",
    url: peaksFile,
    format: "gff3",
    displayMode: "EXPANDED",
    color: "#0EC2C3",
    nameField: trackName,
  };
  const trackSites = {
    name:  "["+dataset._id+"]-TFBS",
    url: sitesFile,
    format: "gff3",
    displayMode: "EXPANDED",
    color: "#A466F6",
    nameField: trackName,
  };
  // {state.htTracks.hasOwnProperty(track.name)}
  const handleOpen = () => {
    toggleItemActive(index);
    getFeatures({
      variables: {
        limit: 1,
        datasetId: dataset._id,
      },
      onCompleted: (data) => {
        //console.log(data);
        setIsFeatures({
          peaks: DataVerifier.isValidArray(data.getAllPeaksOfDataset),
          sites: DataVerifier.isValidArray(data.getAllTFBindingOfDataset),
        });
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
              {isFeatures.peaks && (
                <ListItemButton
                  sx={{ pl: 4 }}
                  onClick={() => {
                    if (state.htTracks.hasOwnProperty(trackPeaks.name)) {
                      handleRemoveTrack(trackPeaks)
                    } else {
                      handleAddTrack(trackPeaks)
                    }
                  }}
                >
                  {state.htTracks.hasOwnProperty(trackPeaks.name) && (
                    <ListItemIcon>
                      <CheckIcon />
                    </ListItemIcon>
                  )}
                  <ListItemText primary={trackPeaks.name + " Track"} />
                </ListItemButton>
              )}
              {isFeatures.sites && (
                <ListItemButton
                  sx={{ pl: 4 }}
                  onClick={() => {
                    if (state.htTracks.hasOwnProperty(trackSites.name)) {
                      handleRemoveTrack(trackSites)
                    } else {
                      handleAddTrack(trackSites)
                    }
                  }}
                >
                  {state.htTracks.hasOwnProperty(trackSites.name) && (
                    <ListItemIcon>
                      <CheckIcon />
                    </ListItemIcon>
                  )}
                  <ListItemText primary={trackSites.name + " Track"} />
                </ListItemButton>
              )}
              {!isFeatures.peaks && !isFeatures.sites && (
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
