import React from "react";
import Information from "./Information";
import Regulation from "./Regulation";

export default function Description({ gene, regulation, allCitations }) {
  return (
    <div>
      <br />
      {gene && <Information gene={gene} allCitations={allCitations} />}
      <br />
      {regulation && <Regulation regulation={regulation} />}
    </div>
  );
}
