import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { gql, useQuery } from "@apollo/client";
import Skeleton from "@mui/material/Skeleton";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import BarChartIcon from "@mui/icons-material/BarChart";

const query_GetDataBaseInfo = gql`
  {
    getDatabaseInfo {
      regulonDBVersion
      ecocycVersion
      lcVersion
      releaseDate
      note
    }
  }
`;

const query_GetDataBaseStatistics = gql`
  {
    getDatabaseInfo {
      statistics {
        genes {
          total
        }
        operon {
          total
        }
        regulons {
          total
        }
        promoters {
          total
        }
        transcriptionUnits {
          total
        }
      }
    }
  }
`;

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function InfoApp() {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Item>
              <ReleaseInfo />
            </Item>
          </Grid>
          <Grid item xs={6}>
            <Item><Summary/></Item>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}></Grid>
    </Grid>
  );
}

function Summary(params) {
  const { data, loading, error } = useQuery(query_GetDataBaseStatistics);
  if (error) {
    return null;
  }
  if (loading) {
    return <Skeleton variant="rectangular" width={250} height={176} />;
  }
  if (data) {
    const statistics = data.getDatabaseInfo[0].statistics;
    return (
      <Box sx={{width: 250, height:176}} >
        <div style={{ display: "flex", alignItems: "center" }}>
          <BarChartIcon />
          <p>
            <b>Summary</b>
          </p>
        </div>
        <div style={{ marginLeft: "10px" }}>
          {statistics.genes?.total && (
            <p>
              <b>{statistics.genes.total}</b>{" "}Genes
            </p>
          )}
          {statistics.operon?.total && (
              <p>
                <b>{statistics.operon.total}{" "}</b>Operons
              </p>
            )}
          {statistics.regulons?.total && (
              <p>
                <b>{statistics.regulons.total}</b>{" "}Regulons
              </p>
            )}
          {statistics.transcriptionUnits?.total && (
              <p>
                <b>{statistics.transcriptionUnits.total}</b>{" "}Transcription Units
              </p>
            )}
            {statistics.promoters?.total && (
              <p>
                <b>{statistics.promoters.total}</b>{" "}Promoters
              </p>
            )}
        </div>
      </Box>
    );
  }
  return null;
}

function ReleaseInfo() {
  const { data, loading, error } = useQuery(query_GetDataBaseInfo);
  if (error) {
    return null;
  }
  if (loading) {
    return <Skeleton variant="rectangular" width={250} height={176} />;
  }
  if (data) {
    const dbInfo = data.getDatabaseInfo[0];
    return (
      <Box sx={{width: 250, height:176}}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <NewspaperIcon />
          <p>
            <b>Release</b>
          </p>
        </div>
        <div style={{ marginLeft: "10px" }}>
          <p>{"date: " + dbInfo.releaseDate} </p>
          <p>{"RegulonDB version: " + dbInfo.regulonDBVersion} </p>
          <p> synchronized with:</p>
          <p>{"    - Ecocyc version: " + dbInfo.ecocycVersion}</p>
          <p>{"     - Lisen&Curate version: " + dbInfo.lcVersion}</p>
          <Link to={"/releasesNote"}>
            <Typography color="secondary">Read release notes</Typography>
          </Link>
        </div>
      </Box>
    );
  }
  return null;
}
