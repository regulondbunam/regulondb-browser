import React from "react";
import { Cover } from "../../../components/ui-components/ui_components";

const error = () => {
  return (
    <Cover state={"error"}>
      <h1 style={{ color: "white" }}>Sorry, Error 404 :(</h1>
      <h2 style={{ color: "white" }}>
        Page not found; Maybe it's a page we're working on
      </h2>
    </Cover>
  );
};

export default error;
