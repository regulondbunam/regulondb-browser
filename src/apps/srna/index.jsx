import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Home from "./home";

function SRNA() {
  const [id, setId] = useState();
  const [_state, set_state] = useState();
  let { srnaId } = useParams();

  return (
    <div>
      <Home />
    </div>
  );
}

export default SRNA;    