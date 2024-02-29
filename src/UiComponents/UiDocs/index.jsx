import React from "react";
import AutoComplete from "../AutoComplete";
import { createTheme, useTheme, ThemeProvider } from "@mui/material/styles";
import uiComponentesTheme from "../Theme";

export default function Docs() {

  return (
    <div>
      <div>Docs</div>
      <div>
        <ThemeProvider theme={uiComponentesTheme}>
          <AutoComplete />
        </ThemeProvider>
      </div>
    </div>
  );
}
