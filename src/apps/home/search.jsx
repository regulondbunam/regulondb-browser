import Paper from "@mui/material/Paper";
import InputSearch from "../search/InputSearch";
import Button from '@mui/material/Button';

import InputBase from "@mui/material/InputBase";

export default function Search({ onClick = () => {} }) {
  return (
    <div style={{display: "grid", gridTemplateColumns: "70% 1% 20%"}} >
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder='Example "arac OR fimb " "arac OR arabinose"'
          inputProps={{ "aria-label": "search google maps" }}
        />
      </Paper>
      <div></div>
      <Button sx={{ width: "100%"}} color="error" variant="contained">Search</Button>
    </div>
  );
}
