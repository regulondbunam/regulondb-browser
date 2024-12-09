import React from 'react'
import EcoliWall from "../media/coli.webp";
import Paper from "@mui/material/Paper";
import Search from "../search";
import { Link } from "react-router-dom";
import Stack from "@mui/material/Stack";
import {ddd} from './ddd'
import { styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "transparent",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const searchLinks = [
    {
      label: "Genes",
      link: "/gene",
    },
    {
      label: "Operon",
      link: "/operon",
    },
    {
      label: "Regulon",
      link: "/regulon",
    },
    {
      label: "Sigmulon",
      link: "/sigmulon",
    },
    {
      label: "GENSOR Unit",
      link: "/gu",
    },
    {
      label: "High Throughput",
      link: "/ht",
    },
  ];

export default function Dandadan() {
    return (
        <Paper
            elevation={0}
            square
            sx={{
                width: "100%",
                position: "relative",
                backgroundColor: "grey.800",
                color: "#fff",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundImage: `url(${EcoliWall})`,
                p: "2% 8% 2% 8%",
            }}
        >
            <div style={{display: 'flex', height: '150px'}} dangerouslySetInnerHTML={{__html: ddd}}/>
            <Search />
            <div>
            <Stack direction="row" spacing={1}>
            {searchLinks.map((link) => {
              return (
                <Item elevation={0} key={"cover_link_" + link.label}>
                  <Link style={{ color: "#ffffff" }} to={link.link}>
                    {link.label}
                  </Link>
                </Item>
              );
            })}
          </Stack>
            </div>
        </Paper>
    );
}
