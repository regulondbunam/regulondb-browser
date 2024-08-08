import React from "react";
import { Cover } from "../../../components/ui-components";
import { Box, Grid } from "@mui/material";
import { useQuery, gql } from "@apollo/client";
import CollectionCard from "./CollectionCard";
import { DataVerifier } from "../../../components/ui-components";

const query = gql`
  query getListOfTypeDatasets {
    listAllDatasetTypes
    listAllHTSources
  }
`;

export default function Home() {
  const { data, loading, error } = useQuery(query);

  if (error) {
    console.error("error to getListOfTypeDatasets");
    return (
      <Cover state={"error"}>
        <h1>Error, failed to load collection list</h1>
      </Cover>
    );
  }

  if (loading) {
    return (
      <Cover state={"loading"}>
        <h1>Loading collection list</h1>
      </Cover>
    );
  }

  if (data) {
    return (
      <div>
        <Cover>
          <h1>High Throughput Collection</h1>
        </Cover>

        {DataVerifier.isValidArray(data.listAllDatasetTypes) && (
          <Box sx={{ padding: 2 }}>
            <Grid container spacing={2}>
              {data.listAllDatasetTypes.map((datasetType) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={"card_" + datasetType}>
                  <CollectionCard datasetType={datasetType} sources={data.listAllHTSources} />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </div>
    );
  }

  return <></>;
}
