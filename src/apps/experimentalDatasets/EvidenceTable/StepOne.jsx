import * as React from "react";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { Typography, TextField } from "@mui/material";
import { useMemo } from "react";
import { DataVerifier } from "../../../components/ui-components";
import { useState } from "react";
import { useEffect } from "react";

function getEvidencesList(content = "") {
  let evidences = {
    tfrsEvidence: {
      _nColumn: -1,
      elements: {},
    },
    riEvidence: {
      _nColumn: -1,
      elements: {},
    },
  };
  if (DataVerifier.isValidString(content)) {
    const rawContent = content.split("\n");
    if (DataVerifier.isValidArray(rawContent)) {
      //tfrsEvidence
      rawContent.forEach((line, i) => {
        const cells = line.split("\t");
        if (i === 0) {
          cells.forEach((cell, ci) => {
            let regex = new RegExp("tfrsEvidence");
            if (regex.test(cell)) {
              evidences.tfrsEvidence._nColumn = ci;
              return null;
            }
            regex = new RegExp("riEvidence");
            if (regex.test(cell)) {
              evidences.riEvidence._nColumn = ci;
              return null;
            }
          });
        } else {
          const col_tfrsEvidence = cells[evidences.tfrsEvidence._nColumn];
          const col_riEvidence = cells[evidences.riEvidence._nColumn];
          //const regex = /\[([^\]]+)\]/g;
          const codes_tfrsEvidence = col_tfrsEvidence.split(";");
          const codes_riEvidence = col_riEvidence.split(";");
          if (codes_tfrsEvidence) {
            codes_tfrsEvidence.forEach(function (coincidencia) {
              const evidence = coincidencia.split(":");
              if (DataVerifier.isValidString(evidence[0])) {
                evidences.tfrsEvidence.elements[evidence[0]] = evidence[1];
              }
            });
          }
          if (codes_riEvidence) {
            codes_riEvidence.forEach(function (coincidencia) {
              const evidence = coincidencia.split(":");
              if (DataVerifier.isValidString(evidence[0])) {
                evidences.riEvidence.elements[evidence[0]] = evidence[1];
              }
            });
          }
        }
      });
    }
  }
  //console.log(evidences);
  return evidences;
}

export default function StepOne({
  fileData,
  evidenceOptions,
  setEvidenceOptions,
}) {
  const evidenceList = useMemo(() => {
    return getEvidencesList(fileData.content);
  }, [fileData]);

  return (
    <div>
      {Object.keys(evidenceList).map((key) => {
        let evidence = evidenceList[key];
        return (
          <TransferList
            key={"list_" + key}
            nameKey={key}
            evidenceList={evidence.elements}
            evidenceOptions={evidenceOptions}
            setEvidenceOptions={setEvidenceOptions}
          />
        );
      })}
    </div>
  );
}

function TransferList({
  evidenceList,
  nameKey,
  evidenceOptions,
  setEvidenceOptions,
}) {
  const { remove, selected } = evidenceOptions[nameKey];
  //console.log(evidenceOptions);
  useEffect(() => {
    if (DataVerifier.isValidObject(evidenceOptions[nameKey])) {
      if (
        !DataVerifier.isValidObject(evidenceOptions[nameKey].selected) &&
        !DataVerifier.isValidObject(evidenceOptions[nameKey].remove)
      ) {
        let objEvidence = { ...evidenceOptions };
        objEvidence[nameKey] = {
          remove: {},
          selected: { ...evidenceList },
        };
        setEvidenceOptions(objEvidence);
      }
    }
  }, [evidenceList, evidenceOptions, setEvidenceOptions, nameKey]);

  const handleSelect = (key) => {
    let newSelection = { ...selected };
    newSelection[key] = remove[key];
    let newRemove = { ...remove };
    delete newRemove[key];
    let objEvidence = { ...evidenceOptions };
    objEvidence[nameKey] = {
      remove: newRemove,
      selected: newSelection,
    };
    setEvidenceOptions(objEvidence);
  };

  const handleRemove = (key) => {
    let newSelection = { ...selected };
    let newRemove = { ...remove };
    newRemove[key] = selected[key];
    delete newSelection[key];
    let objEvidence = { ...evidenceOptions };
    objEvidence[nameKey] = {
      remove: newRemove,
      selected: newSelection,
    };
    setEvidenceOptions(objEvidence);
  };

  const handleFilterSelect = (text) => {
    let dir = {};
    // Filtrar la lista de elementos
    const filteredItems = Object.keys(selected).filter((item) =>
      item.toLowerCase().includes(text.toLowerCase())
    );
    filteredItems.forEach((key) => {
      dir[key] = selected[key];
    });
    Object.keys(selected).forEach((key) => {
      dir[key] = selected[key];
    });
    // Ordenar la lista filtrada
    filteredItems.sort();
    console.log(dir);
    //setItems(Object.keys(dir));
    let objEvidence = { ...evidenceOptions };
    objEvidence[nameKey] = {
      remove: remove,
      selected: dir,
    };
    setEvidenceOptions(objEvidence);
  };

  const handleFilterRemove = (text) => {
    let dir = {};
    // Filtrar la lista de elementos
    const filteredItems = Object.keys(remove).filter((item) =>
      item.toLowerCase().includes(text.toLowerCase())
    );
    filteredItems.forEach((key) => {
      dir[key] = remove[key];
    });
    Object.keys(remove).forEach((key) => {
      dir[key] = remove[key];
    });
    // Ordenar la lista filtrada
    filteredItems.sort();
    //console.log(dir);
    //setItems(Object.keys(dir));
    let objEvidence = { ...evidenceOptions };
    objEvidence[nameKey] = {
      remove: dir,
      selected: selected,
    };
    setEvidenceOptions(objEvidence);
  };

  return (
    <div>
      <div>
        <Typography variant="h5">{nameKey}</Typography>
      </div>
      <div>
        <Grid container spacing={2}>
          <Grid item>
            <Typography variant="h6">Selected Evidences</Typography>
            <CustomList
              type="selected"
              items={selected}
              onSelectItemList={handleRemove}
              handleFilter={handleFilterSelect}
            />
          </Grid>
          <Grid item>
            {/*<Grid container direction="column" alignItems="center">
              <Button
                sx={{ my: 0.5 }}
                variant="outlined"
                size="small"
                onClick={handleAllRight}
                disabled={left.length === 0}
                aria-label="move all right"
              >
                ≫
              </Button>
              <Button
                sx={{ my: 0.5 }}
                variant="outlined"
                size="small"
                onClick={handleCheckedRight}
                disabled={leftChecked.length === 0}
                aria-label="move selected right"
              >
                &gt;
              </Button>
              <Button
                sx={{ my: 0.5 }}
                variant="outlined"
                size="small"
                onClick={handleCheckedLeft}
                disabled={rightChecked.length === 0}
                aria-label="move selected left"
              >
                &lt;
              </Button>
              <Button
                sx={{ my: 0.5 }}
                variant="outlined"
                size="small"
                onClick={handleAllLeft}
                disabled={right.length === 0}
                aria-label="move all left"
              >
                ≪
              </Button>
            </Grid>*/}
          </Grid>
          <Grid item>
            <Typography variant="h6">Evidence removed</Typography>
            <CustomList
              type="remove"
              items={remove}
              onSelectItemList={handleSelect}
              handleFilter={handleFilterRemove}
            />
          </Grid>
        </Grid>
      </div>
      <br />
      <br />
    </div>
  );
}

const CustomList = ({
  type = "",
  items = {},
  onSelectItemList = () => {},
  handleFilter = () => {},
}) => {
  const [filterText, setFilterText] = useState("");

  const handleFilterChange = (event) => {
    const text = event.target.value;
    handleFilter(text)
    setFilterText(text);
  };

  return (
    <Paper elevation={3} sx={{ width: "35vw", height: 400, overflow: "auto" }}>
      <div>
        <div
          style={{
            position: "sticky",
            top: 0,
            zIndex: 99,
            backgroundColor: "white",
          }}
        >
          <TextField
            label="Filter"
            fullWidth
            variant="filled"
            value={filterText}
            onChange={handleFilterChange}
          />
        </div>
        <div>
          <List dense component="div" role="list">
            {Object.keys(items).map((value) => {
              const labelId = `transfer-list-item-${value}-label`;

              return (
                <ListItem
                  key={value}
                  role="listitem"
                  secondaryAction={
                    type === "selected" && (
                      <IconButton
                        onClick={() => {
                          onSelectItemList(value);
                        }}
                      >
                        <DeleteForeverIcon />
                      </IconButton>
                    )
                  }
                >
                  {type === "remove" && (
                    <ListItemIcon>
                      <IconButton
                        onClick={() => {
                          onSelectItemList(value);
                        }}
                      >
                        <AddBoxIcon />
                      </IconButton>
                    </ListItemIcon>
                  )}

                  <ListItemText id={labelId} primary={`${value}`} />
                </ListItem>
              );
            })}
          </List>
        </div>
      </div>
    </Paper>
  );
};
