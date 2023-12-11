import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import CircularProgress from "@mui/material/CircularProgress";
import DialogTitle from "@mui/material/DialogTitle";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useGetAllHTDatasetsTFBINDING, useGetAllHTDatasetsTUS, useGetAllHTDatasetsTTS, useGetAllHTDatasetsTSS  } from "../../tracks/htCollection";
import TFBSList from "./TFBSList";
import TUSList from "./TUSList";
import TTSList from "./TTSList";
import TSSList from "./TSSList"

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function HTTracks({
  open,
  handleClose = () => {},
  state,
  handleAddTrack = () => {},
  handleRemoveTrack = () => {},
}) {
  //console.log("flag");
  const {
    datasetList: listTFBINDING,
    loading: loadingTFBINDING,
    /*error: errorTFBINDING,*/
  } = useGetAllHTDatasetsTFBINDING();
  const {
    datasetList: listTUS,
    loading: loadingTUS,
    /*error: errorTUS,*/
  } = useGetAllHTDatasetsTUS();
  const {
    datasetList: listTTS,
    loading: loadingTTS,
    /*error: errorTTS,*/
  } = useGetAllHTDatasetsTTS();
  const {
    datasetList: listTSS,
    loading: loadingTSS,
    /*error: errorTSS,*/
  } = useGetAllHTDatasetsTSS();

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <React.Fragment>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth={"md"}>
        <DialogTitle>Select HT Dataset</DialogTitle>
        <DialogContent>
          <Box>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab label="TFBS" {...a11yProps(0)} />
                <Tab label="TUS" {...a11yProps(1)} />
                <Tab label="TTS" {...a11yProps(2)} />
                <Tab label="TSS" {...a11yProps(3)} />
              </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
              {loadingTFBINDING ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <CircularProgress />
                    Loading...
                  </div>
                </div>
              ) : (
                <TFBSList
                  state={state}
                  handleAddTrack={handleAddTrack}
                  handleRemoveTrack={handleRemoveTrack}
                  datasetList={listTFBINDING}
                />
              )}
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
            {loadingTUS ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <CircularProgress />
                    Loading...
                  </div>
                </div>
              ) : (
                <TUSList
                  state={state}
                  handleAddTrack={handleAddTrack}
                  handleRemoveTrack={handleRemoveTrack}
                  datasetList={listTUS}
                />
              )}
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
            {loadingTTS ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <CircularProgress />
                    Loading...
                  </div>
                </div>
              ) : (
                <TTSList
                  state={state}
                  handleAddTrack={handleAddTrack}
                  handleRemoveTrack={handleRemoveTrack}
                  datasetList={listTTS}
                />
              )}
            </CustomTabPanel>
            <CustomTabPanel value={value} index={3}>
            {loadingTSS ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <CircularProgress />
                    Loading...
                  </div>
                </div>
              ) : (
                <TSSList
                  state={state}
                  handleAddTrack={handleAddTrack}
                  handleRemoveTrack={handleRemoveTrack}
                  datasetList={listTSS}
                />
              )}
            </CustomTabPanel>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
