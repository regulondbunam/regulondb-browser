import { useParams, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import { DataVerifier } from "../../components/ui-components";
import Site from "./site";

const downloadConf = async (setRawConf) => {
  try {
    const response = await fetch(
      "https://raw.githubusercontent.com/regulondbunam/RegulonDBManual/master/conf.json"
    );
    const jsonData = await response.json();
    //console.log(jsonData);
    setRawConf(jsonData);
  } catch (error) {
    console.error("fetch error", error);
    setRawConf({
      error: {
        type: "fetch",
        log: error,
      },
    });
  }
};

export default function Manual() {
  const { site, section } = useParams();
  const [rawConf, setRawConf] = useState();

  if (!rawConf) {
    downloadConf(setRawConf);
  }

  if (!rawConf) {
    return (
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <CircularProgress />
      </div>
    );
  }
  if (rawConf?.error) {
    return (
      <div>
        <h2>{rawConf.error.type + " "}error</h2>
        <p>{rawConf.error.log}</p>
      </div>
    );
  }

  let sites = [];
  if (DataVerifier.isValidArray(rawConf.sites)) {
    sites = rawConf.sites;
  }

  if (site) {
    let siteData = sites.find(s=>s._url===site)
    return Site(siteData,section);
  }



  return (
    <div>
      <Box
        sx={{
          bgcolor: "background.paper",
          pt: 8,
          pb: 6,
        }}
      >
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >
            RegulonDB Manual
          </Typography>
          <Stack
            sx={{ pt: 4 }}
            direction="row"
            spacing={2}
            justifyContent="center"
          >
            <TextField id="outlined-basic" label="Search" variant="outlined" />
            <Button variant="contained" color="secondary">
              Search
            </Button>
          </Stack>
        </Container>
      </Box>
      <Container sx={{ py: 8 }} maxWidth="md">
        <Grid container spacing={4}>
          {sites.map((site, i) => (
            <Grid item key={"site_n_" + i} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {site?.imgUrl && (
                  <CardMedia
                    component="div"
                    sx={{
                      // 16:9
                      pt: "56.25%",
                    }}
                    image={site.imgUrl}
                  />
                )}

                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {site.title}
                  </Typography>
                  <Typography>{site.description}</Typography>
                </CardContent>
                <CardActions>
                  <Link to={"/manual/"+site._url} >
                    <Button size="small">View</Button>
                  </Link>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}
