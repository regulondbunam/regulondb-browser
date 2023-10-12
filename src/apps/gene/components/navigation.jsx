import React, { useState } from "react";
import { DataVerifier } from "../../../components/ui-components";
//import { ExternalCrossReferences } from "../../../components/datamartSchema"
import { useNavigate, Link } from "react-router-dom";
import List from "@mui/material/List";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,

  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Navigation({
  operon = {},
  regulons = [],
  guId = "",
  htDatasets = [],
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
          {DataVerifier.isValidObject(operon) && (
            <ListItemButton
              key={operon._id}
              sx={{ pl: 4 }}
              onClick={() => {
                navigate("/operon/" + operon._id);
              }}
            >
              <p>Operon </p>
            </ListItemButton>
          )}
          {DataVerifier.isValidArray(regulons) && (
            <>
              {regulons.map((regulon) => {
                if (!DataVerifier.isValidString(regulon._id)) {
                  return null;
                }
                return (
                  <ListItemButton
                    key={regulon._id}
                    sx={{ pl: 4 }}
                    onClick={() => {
                      navigate("/regulon/" + regulon._id);
                    }}
                  >
                    <p>Regulon</p>
                  </ListItemButton>
                );
              })}
            </>
          )}
          {DataVerifier.isValidString(guId) && (
            <ListItemButton
              sx={{ pl: 4 }}
              onClick={() => {
                navigate("/gu/" + guId);
              }}
            >
              <p>GENSOR Unit</p>
            </ListItemButton>
          )}
          {DataVerifier.isValidArray(htDatasets) && (
            <HtDatasets htDatasets={htDatasets} />
          )}
        </List>
      </Collapse>
    </List>
  );
}

function HtDatasets({ htDatasets }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <ListItemButton sx={{ pl: 4 }} onClick={handleOpen}>
        <p>HT-Datasets</p>
      </ListItemButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div
            style={{
              display: "flex",
              flexDirection: "row-reverse",
              justifyContent: "space-between",
            }}
          >
            <Button color="error" variant="contained" onClick={handleClose}>
              Exit
            </Button>
            <p>
              <b>High Throughput Collection Datasets Related</b>
            </p>
          </div>
          <div style={{ height: "40vh", overflow: "auto" }}>
          <table>
            <thead>
              <tr>
                <th>title</th>
                <th>datasetType</th>
                <th>strategy</th>
              </tr>
            </thead>
            <tbody>
              {htDatasets.map((dataset) => {
                let title = dataset._id
                if(DataVerifier.isValidObject(dataset.sample)){
                  title = dataset.sample.title ? dataset.sample.title : dataset._id
                }
                return (
                  <tr key={dataset.id}>
                    <td>
                      <Link
                        to={
                          "/ht/dataset/" +
                          dataset.datasetType.toUpperCase() +
                          "/datasetId=" +
                          dataset._id
                        }
                      >
                        {title}
                      </Link>
                    </td>
                    <td>{dataset.datasetType}</td>
                    <td>{DataVerifier.isValidObject(dataset.sourceSerie) ? dataset.sourceSerie.strategy : ""}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          </div>
          
        </Box>
      </Modal>
    </>
  );
}
