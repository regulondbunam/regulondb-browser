import Title from "../components/Title";
import React from "react";
//import Switch from "@mui/material/Switch";
import InputSearch from "../InputSearch";

function Main() {
/*  const [_isAdvancedSearch, set_isAdvancedSearch] = React.useState(false);

  const handleChange = (event) => {
    set_isAdvancedSearch(event.target.checked);
  };
  */
  return (
    <div>
      <Title title={"Search Tool"} />
      <article>
        <p>Welcome to search tool</p>
        <br />
        <InputSearch />
        <br />
        {/**
             <p className="p_accent">Advanced Search</p>
        <Switch
          checked={_isAdvancedSearch}
          onChange={handleChange}
          inputProps={{ "aria-label": "controlled" }}
        />
             */}
      </article>
    </div>
  );
}

export default Main;
