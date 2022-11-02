import React, {useEffect, useState} from 'react';
import {UpdateTitle} from "../Title"
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import WebServices from "../../../components/webservices/WebServices";
import TableView from "./Table";

function Home() {
    
    useEffect(() => {
        UpdateTitle({ title: "Sigmulon", sigmulonToken: undefined });
    })

    return ( 
        <article id="sigmulon_home">
            <Sigmulon />
        </article>
     );
}

export default Home;

function Sigmulon({ keyword }) {
  const [_sigmulon, set_sigmulon] = useState();
  const [_sigmulonState, set_sigmulonState] = useState();

  if (_sigmulonState === "loading") {
    UpdateTitle({ state: "loading" });
  }
  if (_sigmulonState === "error") {
    let error = "";
    if (_sigmulon?.error) {
      error += " " + _sigmulon.error + ", ";
    }
    UpdateTitle({ state: "error", message: error });
  }
  if (_sigmulonState === "done") {
    UpdateTitle({ state: "done" });
    let sigmulonButton = document.getElementById("button_sigmulon_results");
    if (sigmulonButton) {
      const sigmulonButton_Update = new CustomEvent("updateLinkButton", {
        bubbles: true,
        detail: { lengthResults: _sigmulon?.pagination?.totalResults },
      });
      sigmulonButton.dispatchEvent(sigmulonButton_Update);
    }
  }

  return (
    <div>
      {!_sigmulon && (
        <WebServices
          datamart_name="getAllSigmulon"
          variables={{}}
          getData={(data) => {
            set_sigmulon(data);
          }}
          getState={(state) => {
            set_sigmulonState(state);
          }}
        />
      )}
      {_sigmulonState === "loading" && (
        <Box sx={{ width: "100%" }}>
          <Skeleton height={40} />
          <Skeleton height={40} />
          <Skeleton height={40} />
          <Skeleton height={40} />
          <Skeleton height={40} />
          <Skeleton height={40} />
        </Box>
      )}
      {_sigmulon?.data && (
        <TableView
          type="sigmulon"
          data={_sigmulon.data}
        />
      )}
    </div>
  );
}