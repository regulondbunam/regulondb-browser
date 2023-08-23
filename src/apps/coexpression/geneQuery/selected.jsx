import React, { useMemo, useState } from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { DataVerifier } from "../../../components/ui-components";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}));

function autocompleteFormat(geneList = []) {
  let options = [];

  geneList.forEach((gene) => {
    options.push({
      id: gene._id,
      label: `${gene.name}, ${gene.productsName.join(", ")}`,
      productsName: gene.productsName.join(", "),
      name: gene.name,
    });
  });
  return options;
}

export default function Selected({ geneList, dispatch, selectedGenes }) {
  const [wantedGene, setGene] = useState(null);
  const optionList = useMemo(() => {
    return autocompleteFormat(geneList);
  }, [geneList]);
  let genes = [];
  if (DataVerifier.isValidArray(selectedGenes)) {
    selectedGenes.forEach((geneId) => {
      let gene = geneList.find((g) => g._id === geneId);
      if (gene) {
        genes.push(gene);
      }
    });
  }
  const selectRandomGenes = () => {
    let selectGenes = [];
    for (let i = 0; i < 2; i++) {
      let indexOption = Math.floor(Math.random() * optionList.length);
      selectGenes.push(optionList[indexOption].id);
    }
    dispatch({ type: "randomGene", value: selectGenes });
  };
  const handleChange = (event, newValue) => {
    setGene(newValue);
  };

  const handleDeleteGene = (id) => {
    dispatch({ type: "deleteGene", value: id });
  };

  const handleAddGene = () => {
    dispatch({ type: "addGene", value: wantedGene.id });
  };

  const handleCleanGenes = () => {
    dispatch({ type: "cleanGene" });
  };

  const enableAdd = () => {
    if (wantedGene === null) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div>
      <div>
        <Stack direction="row" useFlexGap flexWrap="wrap">
          {genes.map((gene) => {
            return (
              <HtmlTooltip
                key={"selectedGene_" + gene._id}
                title={
                  <>
                    <p>
                      <b
                        style={{ fontSize: "10px" }}
                        dangerouslySetInnerHTML={{
                          __html: "Gene " + gene.name,
                        }}
                      />
                    </p>
                    <p
                      style={{ fontSize: "10px", textAlign: "left" }}
                      dangerouslySetInnerHTML={{
                        __html: `product: ${gene.productsName.join(", ")}`,
                      }}
                    />
                  </>
                }
              >
                <Chip
                  color="secondary"
                  label={
                    <p
                      style={{ color: "#ffffff" }}
                      dangerouslySetInnerHTML={{ __html: gene.name }}
                    />
                  }
                  onDelete={() => {
                    handleDeleteGene(gene._id);
                  }}
                />
              </HtmlTooltip>
            );
          })}
        </Stack>
      </div>
      <br />
      <div>
        {optionList && (
          <div style={{ display: "flex" }}>
            <Autocomplete
              id="geneSelector"
              size="small"
              sx={{ width: 300 }}
              options={optionList}
              autoHighlight
              getOptionDisabled={(option) => {
                if (selectedGenes.find((geneId) => geneId === option.id)) {
                  return true;
                }
                return false;
              }}
              renderOption={(props, option) => (
                <div {...props}>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: `${option.name}, ${option.productsName}`,
                    }}
                  />
                </div>
              )}
              renderInput={(params) => (
                <TextField {...params} label="Search Gene" />
              )}
              value={wantedGene}
              onChange={handleChange}
            />
            <button disabled={enableAdd()} onClick={handleAddGene}>
              Add
            </button>
          </div>
        )}
        <br />
        <div style={{display: "flex", width: "100%", justifyContent: "flex-end"}} >
          <button style={{ marginRight: "2px" }} onClick={selectRandomGenes}>Demo</button>
          <button onClick={handleCleanGenes}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
