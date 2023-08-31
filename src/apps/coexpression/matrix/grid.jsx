import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { useQuery, gql } from "@apollo/client";
import { DataVerifier } from "../../../components/ui-components";
import Button from "@mui/material/Button";
import ColumFill from "./columFill";

export const QUERY_getCoexpressionRank = gql`
  query getCoexpressionRank($geneName: String) {
    getTopCoexpressionRanking(gene: $geneName) {
      gene {
        _id
        name
      }
      rank
      rgbColor
    }
  }
`;

export default function Grid({ genesInformation = [] }) {
  const [selectedGene, setSelectedGene] = React.useState(
    genesInformation[0].gene.name
  );

  const { loading, error, data } = useQuery(QUERY_getCoexpressionRank, {
    variables: {
      geneName: selectedGene,
    },
  });

  //console.log(genesInformation);
  let rankingGenes = [];

  if (data) {
    if (DataVerifier.isValidArray(data.getTopCoexpressionRanking)) {
      rankingGenes = data.getTopCoexpressionRanking.map(
        (coexpression) => coexpression.gene[0]
      );
    }
  }

  let gridTemplateColumns = `repeat(${genesInformation.length + 1}, 150px)`;

  return (
    <>
      {loading && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div>
            <CircularProgress />
          </div>
        </div>
      )}
      {data && (
        <div id="matrixContainer">
          <div
            style={{
              display: "grid",
              position: "sticky",
              top: 0,
              gridTemplateColumns: gridTemplateColumns,
              columnGap: "2px",
              background: "#ffffff",
              width: `${(genesInformation.length + 1) * 152}px`,
            }}
          >
            <Header
              genesInformation={genesInformation}
              selectedGene={selectedGene}
              setSelectedGene={setSelectedGene}
            />
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `150px auto`,
              columnGap: "2px",
            }}
          >
            <FirstColumn rankingGenes={rankingGenes} />
            <div
              style={{
                display: "grid",
                columnGap: "2px",
                gridTemplateColumns: `repeat(${genesInformation.length}, 150px)`,
                zIndex: -1,
              }}
            >
              {genesInformation.map((coexpression, index) => {
                return (
                  <ColumFill
                    gene={coexpression.gene.name}
                    rankingGenes={rankingGenes}
                  />
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function FirstColumn({ rankingGenes }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "150px",
        gridTemplateRows: `repeat(${rankingGenes.length}, 30px)`,
        rowGap: "2px",
        width: "150px",
        position: "sticky",
        left: 0,
        background: "#ffffff",
      }}
    >
      {rankingGenes.map((gene, index) => {
        return (
          <div
            key={"geneRanking_" + index + "_" + gene._id}
            className="cellFirstColumn"
          >
            <p>
              <b dangerouslySetInnerHTML={{ __html: gene.name }} />
            </p>
          </div>
        );
      })}
    </div>
  );
}

function Header({ genesInformation, selectedGene, setSelectedGene }) {
  return (
    <>
      <div style={{ height: "30px", width: "150px" }}>{"----"}</div>
      {genesInformation.map((gene, index) => {
        //console.log(gene.name);
        return (
          <div style={{ height: "30px", width: "150px" }}>
            <Button
              onClick={() => {
                if (gene.gene.name !== selectedGene) {
                  setSelectedGene(gene.gene.name);
                }
              }}
              key={"geneInfo_" + index + "_gene_" + gene._id}
              color="secondary"
              variant={
                gene.gene.name === selectedGene ? "contained" : "outlined"
              }
              sx={{ textTransform: "none", width: "100%", height: "30px" }}
            >
              <div>
                <p
                  style={{
                    fontSize: "8px",
                    color:
                      gene.gene.name === selectedGene ? "#ffffff" : "#000000",
                  }}
                >
                  {gene._id}
                </p>
                <p
                  style={{
                    color:
                      gene.gene.name === selectedGene ? "#ffffff" : "#000000",
                  }}
                  dangerouslySetInnerHTML={{ __html: gene.gene.name }}
                />
              </div>
            </Button>
          </div>
        );
      })}
    </>
  );
}
