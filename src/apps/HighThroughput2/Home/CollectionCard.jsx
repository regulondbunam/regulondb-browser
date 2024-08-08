import React, { useState } from "react";
import {
  Card,
  CardContent,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Remarkable } from "remarkable";
import { useLazyQuery, gql } from "@apollo/client";
import { DataVerifier } from "../../../components/ui-components";

const query = gql`
  query GetDatasetsWithMetadata($datasetType: String!, $source: String!) {
    getDatasetsWithMetadata(datasetType: $datasetType, source: $source) {
      collectionName
      metadata {
        _id
        source
        datasetType
        metadataContent
        status
        releaseDate
        reference
      }
      datasets {
        _id
      }
    }
  }
`;

function useGetMetadata(datasetType = "", sources = []) {
  const [sourcesCount, setSourcesCount] = useState(sources.length);
  const [metadata, setMetadata] = useState([]);
  const [getMetadata, { loading }] = useLazyQuery(query);
  const loadingMetadata = sourcesCount > 0;
  if (sourcesCount > 0 && !loading) {
    getMetadata({
      variables: {
        datasetType: datasetType,
        source: sources[sourcesCount - 1],
      },
      onCompleted: (data) => {
        if (
          DataVerifier.isValidArray(data?.getDatasetsWithMetadata?.datasets)
        ) {
          setMetadata([...metadata, data.getDatasetsWithMetadata]);
        }
        setSourcesCount(sourcesCount - 1);
      },
    });
  }
  return { metadata, loading: loadingMetadata };
}

const CollectionCard = ({ datasetType, sources = [] }) => {
  const { metadata, loading } = useGetMetadata(datasetType, sources);
  const [open, setOpen] = useState(false);
  const [meta, setMeta] = useState();
  const navigate = useNavigate();
  const md = new Remarkable();

  const handleTableClick = () => {
    navigate(`./table/datasetType=${datasetType}`);
  };

  const handleBrowserClick = () => {
    navigate(`./browser/datasetType=${datasetType}`);
  };

  const handleBuilder = () => {
    navigate(`./builder/datasetType=${datasetType}`);
  };

  const handleMoreInfoClick = (meta) => {
    setMeta(meta);
    setOpen(true);
  };

  const handleClose = () => {
    setMeta(undefined);
    setOpen(false);
  };

  console.log(meta);

  return (
    <>
      <Card style={{ backgroundColor: "#e3f2fd" }}>
        <CardContent>
          <Typography variant="h5" component="div">
            {datasetType}
          </Typography>
          {loading ? (
            <>loading source information</>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              {metadata.map((data, index) => (
                <Button
                  key={"source_" + index + "_in_" + datasetType}
                  onClick={() => {
                    handleMoreInfoClick(data);
                  }}
                  style={{ textTransform: "none" }}
                >
                  <Typography variant="body2" color="textSecondary">
                    {data.metadata.source}
                  </Typography>
                </Button>
              ))}
            </div>
          )}
        </CardContent>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "8px",
          }}
        >
          <div>
          <Button
              variant="outlined"
              color="primary"
              onClick={handleBuilder}
              
            >
              builder
            </Button>
          </div>
          <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
          }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={handleTableClick}
            >
              TABLE
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleBrowserClick}
              style={{ marginLeft: "8px" }}
            >
              BROWSER
            </Button>
          </div>
        </div>
      </Card>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Metadata Information</DialogTitle>
        <DialogContent>
          <div
            dangerouslySetInnerHTML={{
              __html: md.render(meta?.metadata?.metadataContent),
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CollectionCard;
