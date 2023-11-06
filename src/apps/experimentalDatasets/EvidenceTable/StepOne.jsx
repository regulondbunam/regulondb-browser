import * as React from "react";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
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
    }
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
          const regex = /\[([^\]]+)\]/g;
          const codes_tfrsEvidence = col_tfrsEvidence.match(regex);
          const codes_riEvidence = col_riEvidence.match(regex);
          if (codes_tfrsEvidence) {
            codes_tfrsEvidence.forEach(function (coincidencia) {
              const evidence = coincidencia.slice(1, -1).split(":"); // Elimina los corchetes
              evidences.tfrsEvidence.elements[evidence[0]] = evidence[1];
            });
          }
          if (codes_riEvidence) {
            codes_riEvidence.forEach(function (coincidencia) {
              const evidence = coincidencia.slice(1, -1).split(":"); // Elimina los corchetes
              evidences.riEvidence.elements[evidence[0]] = evidence[1];
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

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function TransferList({
  evidenceList,
  nameKey,
  evidenceOptions,
  setEvidenceOptions,
}) {
  const [checked, setChecked] = React.useState([]);
  const [left, setLeft] = React.useState(Object.keys(evidenceList));
  const [right, setRight] = React.useState([]);

  useEffect(() => {
    if (DataVerifier.isValidObject(evidenceOptions[nameKey])) {
      if (!DataVerifier.isValidObject(evidenceOptions[nameKey].selected) && !DataVerifier.isValidObject(evidenceOptions[nameKey].remove)) {
        let objEvidence = { ...evidenceOptions };
        objEvidence[nameKey] = {
          remove: {},
          selected: { ...evidenceList },
        };
        setEvidenceOptions(objEvidence);
      }
    }
  }, [evidenceList, evidenceOptions, setEvidenceOptions, nameKey]);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleAllRight = () => {
    const evidenceRight = right.concat(left);
    setRight(evidenceRight);
    setLeft([]);
    if (DataVerifier.isValidObject(evidenceOptions[nameKey])) {
      let objEvidence = { ...evidenceOptions };
      objEvidence[nameKey] = {
        remove: { ...evidenceList },
        selected: {},
      };
      setEvidenceOptions(objEvidence);
    }
  };

  const handleCheckedRight = () => {
    const evidenceR = right.concat(leftChecked)
    const evidenceL = not(left, leftChecked)
    setRight(evidenceR);
    setLeft(evidenceL);
    setChecked(not(checked, leftChecked));
    if (DataVerifier.isValidObject(evidenceOptions[nameKey])) {
      let objR = {};
      evidenceR.forEach(evi => {
        objR[evi] = evidenceList[evi]
      });
      let objL = {}
      evidenceL.forEach(evi => {
        objL[evi] = evidenceList[evi]
      });
      let objEvidence = { ...evidenceOptions };
      objEvidence[nameKey] = {
        remove: { ...objR },
        selected: { ...objL },
      };
      setEvidenceOptions(objEvidence);
    }
  };

  const handleCheckedLeft = () => {
    const evidenceR = not(right, rightChecked)
    const evidenceL = left.concat(rightChecked)
    setLeft(evidenceL);
    setRight(evidenceR);
    setChecked(not(checked, rightChecked));
    if (DataVerifier.isValidObject(evidenceOptions[nameKey])) {
      let objR = {};
      evidenceR.forEach(evi => {
        objR[evi] = evidenceList[evi]
      });
      let objL = {}
      evidenceL.forEach(evi => {
        objL[evi] = evidenceList[evi]
      });
      let objEvidence = { ...evidenceOptions };
      objEvidence[nameKey] = {
        remove: { ...objR },
        selected: { ...objL },
      };
      setEvidenceOptions(objEvidence);
    }
  };

  const handleAllLeft = () => {
    setLeft(left.concat(right));
    setRight([]);
    if (DataVerifier.isValidObject(evidenceOptions[nameKey])) {
      let objEvidence = { ...evidenceOptions };
      objEvidence[nameKey] = {
        remove: {},
        selected: { ...evidenceList },
      };
      setEvidenceOptions(objEvidence);
    }
  };

  return (
    <div>
      <div>
        <h3>{nameKey}</h3>
      </div>
      <div>
        <Grid container spacing={2}>
          <Grid item>
            <Typography variant="h6">Selected Evidences</Typography>
            <CustomList
              checked={checked}
              handleToggle={handleToggle}
              items={left}
              setItems={(items) => {
                setLeft(items);
              }}
            />
          </Grid>
          <Grid item>
            <Grid container direction="column" alignItems="center">
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
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="h6">Evidence removed</Typography>
            <CustomList
              checked={checked}
              handleToggle={handleToggle}
              items={right}
              setItems={(items) => {
                setRight(items);
              }}
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

const CustomList = ({ items, setItems, handleToggle, checked }) => {
  const [filterText, setFilterText] = useState("");

  const handleFilterChange = (event) => {
    const text = event.target.value;
    setFilterText(text);

    let dir = {};

    // Filtrar la lista de elementos
    const filteredItems = items.filter((item) =>
      item.toLowerCase().includes(text.toLowerCase())
    );

    filteredItems.forEach((item) => {
      dir[item] = "";
    });
    items.forEach((item) => {
      dir[item] = "";
    });

    // Ordenar la lista filtrada
    filteredItems.sort();

    setItems(Object.keys(dir));
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
            {items.map((value) => {
              const labelId = `transfer-list-item-${value}-label`;

              return (
                <ListItem
                  key={value}
                  role="listitem"
                  onClick={handleToggle(value)}
                >
                  <ListItemIcon>
                    <Checkbox
                      checked={checked.indexOf(value) !== -1}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{
                        "aria-labelledby": labelId,
                      }}
                    />
                  </ListItemIcon>
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
