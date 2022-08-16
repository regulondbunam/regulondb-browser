import React, { useState } from "react";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

const styleSearch = {
  display: "flex",
  alignItems: "center",
  backgroundColor: "#ffffff"
};

export default function InputSearch({ hint }) {
  let navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const handleChange = (event) => {
    setKeyword(event.target.value);
  };

  return (
    <div
      style={styleSearch}
      onKeyPress={(event) => {
        if (event.key === "Enter") {
          navigate("/search/" + keyword, { replace: true });
        }
      }}
    >
      <TextField
        id="outlined-keyword"
        label="Search"
        value={keyword}
        onChange={handleChange}
        size="small"
        fullWidth
      />
      <button
      onClick={() => {
        navigate("/search/" + keyword, { replace: true });
      }}
      className="accent"
      >
        Search
      </button>
    </div>
  );
}
