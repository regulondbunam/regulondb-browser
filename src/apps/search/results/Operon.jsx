import React, { useState } from "react";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import { UpdateTitle } from "../components/Title";
import WebServices from "../../../components/webservices/WebServices";
import TableView from "./Table";

function Operon({ keyword }) {
  const [_operon, set_operon] = useState();
  const [_operonState, set_operonState] = useState();
  const [_operonTablePage, set_operonTablePage] = useState(0);
  const [_operonTableLimit, set_operonTableLimit] = useState(10);

  if (_operonState === "loading") {
    UpdateTitle({ state: "loading" });
  }
  if (_operonState === "error") {
    let error = "";
    if (_operon?.error) {
      error += " " + _operon.error + ", ";
    }
    UpdateTitle({ state: "error", message: error });
  }
  if (_operonState === "done") {
    UpdateTitle({ state: "done" });
    let operonButton = document.getElementById("button_operon_results");
    if (operonButton) {
      const operonButton_Update = new CustomEvent("updateLinkButton", {
        bubbles: true,
        detail: { lengthResults: _operon?.pagination?.totalResults },
      });
      operonButton.dispatchEvent(operonButton_Update);
    }
  }

  let operon_variables = {
    page: _operonTablePage,
    limit: _operonTableLimit,
    search: keyword,
  };

  return (
    <div>
      {!_operon && (
        <WebServices
          datamart_name="getOperonBy"
          variables={operon_variables}
          getData={(data) => {
            set_operon(data);
          }}
          getState={(state) => {
            set_operonState(state);
          }}
        />
      )}
      {_operonState === "loading" && (
        <Box sx={{ width: "100%" }}>
          <Skeleton height={40} />
          <Skeleton height={40} />
          <Skeleton height={40} />
          <Skeleton height={40} />
          <Skeleton height={40} />
          <Skeleton height={40} />
        </Box>
      )}
      {_operon?.data && (
        <TableView
          type="operon"
          data={_operon.data}
          totalResults={_operon.pagination.totalResults}
          limit={_operonTableLimit}
          page={_operonTablePage}
          setLimit={(limit) => {
            set_operonTableLimit(limit);
            set_operon(undefined);
          }}
          setPage={(page) => {
            set_operonTablePage(page);
            set_operon(undefined);
          }}
        />
      )}
    </div>
  );
}

export default Operon;
