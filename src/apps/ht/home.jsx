import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { getConfOf, getMD } from "./doc/fetchDOC";

import { Circular, Cover, DataVerifier } from "../../components/ui-components";
import ModalHT from "./components/ModalHT";

import {
  Card,
  CardActions,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Skeleton,
  Stack,
} from "@mui/material";
import { Link } from "react-router-dom";

export default function Home() {
  const [conf, setConf] = useState();

  useEffect(() => {
    if (!conf && document.getElementById("loadView")) {
      getConfOf("main_page", (conf) => {
        setConf(conf);
      });
    }
  }, [conf]);

  if (!conf) {
    return (
      <div id="loadView">
        <Circular />
      </div>
    );
  }

  console.log(conf);

  return (
    <>
      <Cover>
        <Typography variant="h1">{conf.title}</Typography>
      </Cover>
      <Box sx={{ flexGrow: 1, p: "10px 6% 10px 6%" }}>
        {DataVerifier.isValidArray(conf.collection) && (
          <Grid container spacing={1}>
            {conf.collection.map((collection, index) => {
              return (
                <HtCard
                  key={"card_" + index + "_" + collection.id}
                  collection={collection}
                  index={index}
                />
              );
            })}
          </Grid>
        )}
      </Box>
    </>
  );
}

function HtCard({ collection, index }) {
  const [mdData, setMdData] = useState();

  useEffect(() => {
    if (!mdData && document.getElementById("loadViewItem" + index)) {
      getMD(collection.url_rawDescription, (mdData) => {
        setMdData(mdData);
      });
    }
  }, [mdData, index, collection]);

  if (!mdData) {
    return (
      <Grid item xs={12} sm={6} md={4}>
        <div id={"loadViewItem" + index} />
        <Skeleton variant="rectangular" width={275} height={235} />
      </Grid>
    );
  }
  let datasetType = collection.url;
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card sx={{ minWidth: 275, minHeight: 235, backgroundColor: "#DCE7ED" }} elevation={3}>
        <CardContent>
          <ModalHT title={collection.title} md_data={mdData} />
          <Link to={`${window.IN_URL.dataset}${datasetType}/`}>
            <Typography variant="h2" sx={{ fontSize: "2vw" }}>
              {collection.title}
            </Typography>
          </Link>
        </CardContent>
        <CardActions>
          <div style={{}}>
            {datasetType === "TFBINDING" && (
              <div>
                <Link
                  style={{ marginRight: "10px" }}
                  to={`${window.IN_URL.dataset}${datasetType}/experimentType=ChIP-seq`}
                >
                  <Button>ChIP-seq</Button>
                </Link>
                <Link
                  style={{ marginRight: "10px" }}
                  to={`${window.IN_URL.dataset}${datasetType}/experimentType=ChIP-exo`}
                >
                  <Button>ChIP-exo</Button>
                </Link>
                <Link
                  style={{ marginRight: "10px" }}
                  to={`${window.IN_URL.dataset}${datasetType}/experimentType=gSELEX-chip`}
                >
                  <Button>gSELEX-chip</Button>
                </Link>
                <Link
                  style={{ marginRight: "10px" }}
                  to={`${window.IN_URL.dataset}${datasetType}/experimentType=DAP`}
                >
                  <Button>gSELEX-chip</Button>
                </Link>
              </div>
            )}
            <div>
              <Link
                style={{ marginRight: "10px" }}
                to={`${window.IN_URL.finder}${datasetType}`}
              >
                <Button>Query Builder</Button>
              </Link>
            </div>
          </div>
        </CardActions>
      </Card>
    </Grid>
  );
}
