import React, { useState } from "react";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import { UpdateTitle } from "../components/Title";
import WebServices from "../../../components/webservices/WebServices";
import TableView from "./Table";

function Regulon({ keyword }) {
  const [_regulon, set_regulon] = useState();
  const [_regulonState, set_regulonState] = useState();
  const [_regulonTablePage, set_regulonTablePage] = useState(0);
  const [_regulonTableLimit, set_regulonTableLimit] = useState(10);

  if (_regulonState === "loading") {
    UpdateTitle({ state: "loading" });
  }
  if (_regulonState === "error") {
    let error = "";
    if (_regulon?.error) {
      error += " " + _regulon.error + ", ";
    }
    UpdateTitle({ state: "error", message: error });
  }
  if (_regulonState === "done") {
    UpdateTitle({ state: "done" });
    let regulonButton = document.getElementById("button_regulon_results");
    if (regulonButton) {
      const regulonButton_Update = new CustomEvent("updateLinkButton", {
        bubbles: true,
        detail: { lengthResults: _regulon?.pagination?.totalResults },
      });
      regulonButton.dispatchEvent(regulonButton_Update);
    }
  }

  let regulon_variables = {
    page: _regulonTablePage,
    limit: _regulonTableLimit,
    search: keyword,
  };

  return (
    <div>
      {!_regulon && (
        <WebServices
          datamart_name="getRegulonBy"
          variables={regulon_variables}
          getData={(data) => {
            set_regulon(data);
          }}
          getState={(state) => {
            set_regulonState(state);
          }}
        />
      )}
      {_regulonState === "loading" && (
        <Box sx={{ width: "100%" }}>
          <Skeleton height={40} />
          <Skeleton height={40} />
          <Skeleton height={40} />
          <Skeleton height={40} />
          <Skeleton height={40} />
          <Skeleton height={40} />
        </Box>
      )}
      {_regulon?.data && (
        <TableView
          type="regulon"
          data={_regulon.data}
          totalResults={_regulon.pagination.totalResults}
          limit={_regulonTableLimit}
          page={_regulonTablePage}
          setLimit={(limit) => {
            set_regulonTableLimit(limit);
            set_regulon(undefined);
          }}
          setPage={(page) => {
            set_regulonTablePage(page);
            set_regulon(undefined);
          }}
        />
      )}
    </div>
  );
}

export default Regulon;
