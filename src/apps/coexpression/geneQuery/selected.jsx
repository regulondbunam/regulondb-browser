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

function InputGene({ selectedGenes, optionList, selectGene }) {
  const [wantedGene, setGene] = useState(null);

  const handleChange = (event, newValue) => {
    setGene(newValue);
  };

  const handleAddGene = () => {
    setGene(null);
    selectGene(wantedGene.id);
  };

  const enableAdd = () => {
    if (wantedGene === null) {
      return true;
    } else {
      return false;
    }
  };

  return (
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
        renderInput={(params) => <TextField {...params} label="Search Gene" />}
        value={wantedGene}
        onChange={handleChange}
      />
      <button disabled={enableAdd()} onClick={handleAddGene}>
        Add
      </button>
    </div>
  );
}

export default function Selected({
  geneList,
  genesId,
  selectGene,
  deleteGene,
}) {
  const optionList = useMemo(() => {
    return autocompleteFormat(geneList);
  }, [geneList]);

  let genes = [];
  if (DataVerifier.isValidArray(genesId)) {
    genesId.forEach((geneId) => {
      let gene = geneList.find((g) => g._id === geneId);
      if (gene) {
        if (!genes.find((gn) => gn._id === gene._id)) {
          genes.push(gene);
        }
      }
    });
  }
  const selectRandomGenes = () => {
    let selectGenes = [];
    for (let i = 0; i < 4; i++) {
      let indexOption = Math.floor(Math.random() * optionList.length);
      if (!selectGenes.find((id) => id === optionList[indexOption].id)) {
        selectGenes.push(optionList[indexOption].id);
      }
    }
    //dispatch({ type: "randomGene", value: selectGenes });
  };

  const handleDeleteGene = (id) => {
    deleteGene(id);
    //dispatch({ type: "deleteGene", value: id });
  };

  const handleCleanGenes = () => {
    //dispatch({ type: "cleanGene" });
  };

  const enableDemo = () => {
    if (DataVerifier.isValidArray(genesId)) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div>
      <div>
        <InputGene
          selectedGenes={genesId}
          optionList={optionList}
          selectGene={selectGene}
        />
      </div>
      <br />
      <div>
        <Stack direction="row" flexWrap="wrap">
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
                  sx={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #666666",
                  }}
                  label={
                    <div>
                      <p style={{ color: "#666666", fontSize: "8px" }}>Gene:</p>
                      <p
                        style={{ color: "#666666" }}
                        dangerouslySetInnerHTML={{ __html: gene.name }}
                      />
                    </div>
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
      <div
        style={{ display: "flex", width: "100%", justifyContent: "flex-end" }}
      >
        <button
          style={{ marginRight: "2px" }}
          onClick={selectRandomGenes}
          disabled={enableDemo()}
        >
          Demo
        </button>
        <button onClick={handleCleanGenes}>Reset</button>
      </div>
    </div>
  );
}
