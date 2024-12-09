import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { Body } from './body';
import "./home.css";
import Cover from "./cover";
import { useSearchParams } from 'react-router-dom';



export default function Home() {
  const [searchParams] = useSearchParams();
  const theme = searchParams.get('uwu');
  return (
    <div>
      <CssBaseline />
      <Container
        maxWidth={false}
        sx={{
          "&.MuiContainer-root": {
            padding: 0,
          },
        }}
      >
        <Cover theme={theme} />
        <Body />
      </Container>
    </div>
  );
}
