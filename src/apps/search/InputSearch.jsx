import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const styleSearch = {
  display: "flex",
  alignItems: "center",
};

export default function InputSearch({ hint }) {
  let navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const handleChange = (event) => {
    setKeyword(event.target.value);
  };
  const handleSearch = () => {
    navigate("/search/" + keyword, { replace: true });
  }

  return (
    <div
      style={styleSearch}
    >
      <TextField
        sx={{ backgroundColor: "white", borderRadius: "5px", width: "100%" }}
        id="outlined-keyword"
        variant="filled"
        size="small"
        label="Search"
        value={keyword}
        onChange={handleChange}
        onKeyUp={(event) => {
          if (event.key === "Enter") {
            handleSearch()
          }
        }}
      />
      <Button
        sx={{ marginLeft: "10px", height: "48px" }}
        onClick={handleSearch}
        color="error"
        variant="contained"
      >
        Search
      </Button>
    </div>
  );
}
