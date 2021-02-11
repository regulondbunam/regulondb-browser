import React from "react";
import { useState } from "react";
import {
  TextBox,
  Button
} from "../../../components/ui-components/ui_components";
import { useHistory } from "react-router-dom";

const SearchTool = ({
  styleTexbox,
  styleButton,
  placeHolder = "Example: “araC AND arabinose”, “araC transcriptional regulator”"
}) => {
  let history = useHistory();
  const [search, setSearch] = useState("");
  function Call(key) {
    if (key === "Enter") {
      history.push("/search/" + search);
    }
  }

  return (
    <div
      style={styleSearch}
      onKeyPress={(event) => {
        Call(event.key);
      }}
    >
      <TextBox
        style={styleTexbox}
        placeholder={placeHolder}
        onChangeText={(search) => {
          setSearch(search);
        }}
      />
      <Button
        style={styleButton}
        label="search"
        accent={true}
        onClick={() => {
          Call("Enter");
        }}
      />
    </div>
  );
};

const styleSearch = {
  display: "flex",
  alignItems: "center"
};

export default SearchTool;
