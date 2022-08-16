import React from "react";
import Information from "./Information";
import Regulation from "./Regulation";

export default function Description({ gene, regulation }) {
  return (
    <div>
      <br />
      {gene && <Information gene={gene} />}
      <br />
      {regulation && <Regulation regulation={regulation} />}
    </div>
  );
}
