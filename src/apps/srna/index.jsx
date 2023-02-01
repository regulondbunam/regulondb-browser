import React, { useState } from "react";
import { useParams } from "react-router-dom";

function SRNA() {
    const [id, setId] = useState();
  const [_state, set_state] = useState();
  let { sigmulonId, promoterId } = useParams();
    return (
        <div>
            
        </div>
    );
}

export default SRNA;    