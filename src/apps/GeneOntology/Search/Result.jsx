import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import { DataVerifier } from "../../../components/ui-components";
import { Link } from "react-router-dom";

export default function Result({
  _id,
  description,
  genes,
  name,
  ontologyId,
  subclassOf,
  subclasses,
  handleSelectIdGO = () => {},
}) {
  const [view, setView] = useState(false);

  const handleView = () => {
    setView(!view);
  };

  const handleSetIdGO = () => {
    handleSelectIdGO(_id);
  };

  return (
    <div>
      <Paper sx={{ p: 1 }}>
        <p style={{ fontSize: 10 }}>{_id}</p>
        <p style={{ fontSize: 12 }}>
          <b>Ontology id</b>
          {": " + ontologyId}
        </p>
        <p>
          <b>{name}</b>
        </p>
        <p>{description}</p>
        {view && (
          <div>
            {DataVerifier.isValidArray(genes) && (
              <>
                <p>
                  <b>Genes: </b>
                </p>
                <table>
                  <thead>
                    <tr>
                      <th>Name - Product</th>
                    </tr>
                  </thead>
                  <tbody>
                    {genes.map((gene) => {
                      return (
                        <tr key={"geneGO_" + _id + "_" + gene._id}>
                          <td>
                            <Link to={"/gene/" + gene._id}>
                              <p
                                dangerouslySetInnerHTML={{
                                  __html: `${gene.name} - ${gene.productName}`,
                                }}
                              />
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </>
            )}
          </div>
        )}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "end",
            "& > *": {
              m: 1,
            },
          }}
        >
          <ButtonGroup
            variant="outlined"
            size="small"
            aria-label="outlined button group"
          >
            {DataVerifier.isValidArray(genes) && (
              <Button onClick={handleView}>
                {view ? "Hide Genes" : "Show Genes"}
              </Button>
            )}
          </ButtonGroup>
        </Box>
      </Paper>
    </div>
  );
}
// <Button onClick={handleSetIdGO}>View on Tree</Button>
