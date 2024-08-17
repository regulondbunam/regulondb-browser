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
  IconButton,
} from "@mui/material";
import { Remarkable } from "remarkable";
import { useLazyQuery, gql } from "@apollo/client";
import { useNavigate, Link } from "react-router-dom";
import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import { DATASET_TYPE_NAME, SOURCE_NAMES } from "../static";
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

  const handleGoSource = (source) => {
    navigate(`./dataset/${datasetType}/source=${source}`);
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
          <Link to={"./dataset/" + datasetType}>
            <Typography variant="h2">
              {DATASET_TYPE_NAME(datasetType)}
            </Typography>
          </Link>

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
                <div
                  key={"source_" + index + "_in_" + datasetType}
                  style={{ display: "flex" }}
                >
                  <Button
                    onClick={() => {
                      handleGoSource(data.metadata.source);
                    }}
                    style={{ textTransform: "none" }}
                    
                  >
                    <Typography variant="body" color="textSecondary">
                      {SOURCE_NAMES(data.metadata.source)}
                    </Typography>
                  </Button>
                  <IconButton 
                  onClick={()=>{
                    handleMoreInfoClick(data)
                  }}
                  size="small">
                    <LiveHelpIcon fontSize="inherit" />
                  </IconButton>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>{SOURCE_NAMES(meta?.metadata?.source)}</DialogTitle>
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
