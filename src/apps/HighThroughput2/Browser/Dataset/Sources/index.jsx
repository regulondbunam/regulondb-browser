import React, { useState } from "react";
import { Tabs, Tab, Box, Typography } from "@mui/material";
import { useGetAuthorDataByDatasetId } from "../../../WebServices";
import Author from "./Author";

export default function Sources({ datasetId, datasetType }) {
  
  const { authorData, loading, error } = useGetAuthorDataByDatasetId(datasetId);


  const [value, setValue] = useState(1);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  let tabTitle = "";
  let data = <></>
  switch (datasetType) {
    case "TFBINDING":
      tabTitle = "Normalized";
      break;
    case "RNAP_BINDING_SITES":
    case "TSS":
    case "TTS":
    case "TUS":
    case "GENE_EXPRESSION":
      tabTitle = "Uniformize";
      break;
    default:
      tabTitle = "";
      break;
  }

  console.log(authorData);

  return (
    <div>
      <h2>SOURCE DATA</h2>
      <Box sx={{ width: "100%" }}>
        <Tabs value={value} onChange={handleChange} aria-label="data tabs">
          <Tab label={tabTitle} />
          {authorData && <Tab label="Author" />}
        </Tabs>

        <Box sx={{ padding: 2 }}>
          {value === 0 && (
            <Typography>Here is the Normalized data...</Typography>
          )}
          {value === 1 && <Author data={authorData} />}
        </Box>
      </Box>
      {datasetId}
    </div>
  );
}
