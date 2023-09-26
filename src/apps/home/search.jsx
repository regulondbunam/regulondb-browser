import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import InputBase from "@mui/material/InputBase";
import { useState } from "react";
import SearchIcon from '@mui/icons-material/Search';


export default function Search({ onClick = () => {} }) {
  const [value, setValue] = useState("")
  let navigate = useNavigate();
  const handleSearch = () => {
    onClick()
    setTimeout(() => {
      navigate("/search/" + value);
    }, 200);
  }
  return (
    <div style={{ display: "grid", gridTemplateColumns: "70% 1% 20%" }}>
      <Paper
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <SearchIcon />
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder='Example "arac OR fimb " "arac OR arabinose"'
          value={value}
          onChange={(e)=>{setValue(e.target.value)}}
          inputProps={{ "aria-label": "regulonDB search" }}
          onKeyUp={(event) => {
            if (event.key === "Enter") {
              handleSearch()
            }
          }}
        />
      </Paper>
      <div></div>
        <Button sx={{ width: "100%" }} onClick={handleSearch} color="error" variant="contained">
          Search
        </Button>
    </div>
  );
}
