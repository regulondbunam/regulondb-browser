import React, { useState } from "react";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import TableView from "./Table";
import { UpdateTitle } from "../components/Title";
import WebServices from "../../../components/webservices/WebServices";

function Srna({ keyword, limit = 10 }) {
  const [_genes, set_genes] = useState();
  const [_genesState, set_genesState] = useState();
  const [_geneTablePage, set_geneTablePage] = useState(0);
  const [_geneTableLimit, set_geneTableLimit] = useState(limit);

  if (_genesState === "loading") {
    UpdateTitle({ state: "loading" });
  }
  if (_genesState === "error") {
    let error = "";
    if (_genes?.error) {
      error += " " + _genes.error + ", ";
    }
    UpdateTitle({ state: "error", message: error });
  }
  if (_genesState === "done") {
    UpdateTitle({ state: "done" });
    let geneButton = document.getElementById("button_gene_results");
    if (geneButton) {
      const geneButton_Update = new CustomEvent("updateLinkButton", {
        bubbles: true,
        detail: { lengthResults: _genes?.pagination?.totalResults },
      });
      geneButton.dispatchEvent(geneButton_Update);
    }
  }
  let gene_variables = {
    page: _geneTablePage,
    limit: _geneTableLimit,
    search: keyword,
  };

  return (
    <div>
      {!_genes && (
        <WebServices
          datamart_name="getGenesBy"
          variables={gene_variables}
          getData={(data) => {
            set_genes(data);
          }}
          getState={(state) => {
            set_genesState(state);
          }}
        />
      )}
      {_genesState === "loading" && (
        <Box sx={{ width: "100%" }}>
          <Skeleton height={40} />
          <Skeleton height={40} />
          <Skeleton height={40} />
          <Skeleton height={40} />
          <Skeleton height={40} />
          <Skeleton height={40} />
        </Box>
      )}
      {_genes?.data && (
        <TableView
          type="gene"
          data={_genes.data}
          totalResults={_genes.pagination.totalResults}
          limit={_geneTableLimit}
          page={_geneTablePage}
          setLimit={(limit) => {
            limit === -1 && (limit = 1)
            //console.log("setLimit", limit); -> All -1
            set_geneTableLimit(limit);
            set_genes(undefined);
          }}
          setPage={(page) => {
            set_geneTablePage(page);
            set_genes(undefined);
          }}
        />
      )}
    </div>
  );
}

export default Srna;