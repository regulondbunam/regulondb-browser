import React, { Suspense, useState, lazy } from "react";
import { DataVerifier } from "../../../../components/ui-components";
import CircularProgress from "@mui/material/CircularProgress";
import { useQuery, useLazyQuery, gql } from "@apollo/client";
import Header from "./header";
import FirstColumn from "./firstColumn";
import { useLazyLoadCoexpression } from "./load";

const ColumFill = lazy(() => import("./columFill"));

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
/*
export default function Grid({ genesInformation = [] }) {
  const { loading, error, data } = useQuery(QUERY_getCoexpressionRank, {
    variables: {
      geneName: genesInformation[0].gene.name,
    },
  });
  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div>
          <CircularProgress />
        </div>
      </div>
    );
  }
  if (error) {
    return <div>error</div>;
  }
  return <LoadGrid fData={data} genesInformation={genesInformation} />;
}
*/
export default function Grid({ genesInformation = [] }) {
  const [gene, setGene] = useState(genesInformation[0].gene.name);
  const [matrices, setMatrices] = useState({});

  const { loading, error, data } = useQuery(QUERY_getCoexpressionRank, {
    variables: {
      geneName: gene,
    },
  });
  let rankingGenes = [];
  if (data) {
    if (DataVerifier.isValidArray(data.getTopCoexpressionRanking)) {
      rankingGenes = data.getTopCoexpressionRanking.map(
        (coexpression) => coexpression.gene[0].name
      );
    }
  }
  const genesList = genesInformation.map((inf) => inf.gene.name);
  const widthCell = 60;
  const gridTemplateColumns = `repeat(${
    genesInformation.length + 1
  }, ${widthCell}px)`;

  const handleSetGene = (geneName) => {
    setGene(geneName);
  };

  if (error) {
    return <div>Error</div>;
  }

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div>
          <CircularProgress />
        </div>
      </div>
    );
  }

  return (
    <>
      {data && (
        <div id="matrixContainer" style={{ height: "500px", overflow: "auto" }}>
          <div
            style={{
              display: "grid",
              position: "sticky",
              top: 0,
              gridTemplateColumns: gridTemplateColumns,
              columnGap: "2px",
              background: "#ffffff",
              width: `${(genesInformation.length + 1) * (widthCell + 2)}px`,
            }}
          >
            <Header
              genesInformation={genesInformation}
              handleSetGene={handleSetGene}
              rankingGenes={rankingGenes}
              widthCell={widthCell}
            />
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `${widthCell}px auto`,
              columnGap: "2px",
              width: `${(widthCell + 2) * genesInformation.length}px`,
            }}
          >
            <FirstColumn rankingGenes={rankingGenes} widthCell={widthCell} />
            <div
              style={{
                display: "grid",
                columnGap: "2px",
                gridTemplateColumns: `repeat(${genesInformation.length}, ${widthCell}px)`,
                zIndex: -1,
              }}
            >
              <Columns
                gene={gene}
                matrices={matrices}
                setMatrices={setMatrices}
                rankingGenes={rankingGenes}
                geneList={genesList}
                widthCell={widthCell}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function Columns({ rankingGenes, geneList, widthCell, matrices, setMatrices, gene }) {
  const { matrixData } = useLazyLoadCoexpression(geneList, rankingGenes, matrices, setMatrices, gene);
  if(!matrixData){
    return <></>
  }
  return (
    <>
      {matrixData.map((columnData, index) => {
        return (
          <Suspense key={"column_" + index} fallback={<>...</>}>
            <ColumFill
              columnData={columnData}
              rankingGenes={rankingGenes}
              widthCell={widthCell}
            />
          </Suspense>
        );
      })}
    </>
  );
}

/*
{columns.map((coexpression, index) => {
                return (
                  <Suspense
                    key={"column_" + index + "_idGene_" + coexpression.gene._id}
                    fallback={<>...</>}
                  >
                    <ColumFill
                      gene={coexpression.gene.name}
                      rankingGenes={rankingGenes}
                      widthCell={widthCell}
                    />
                  </Suspense>
                );
              })}
*/
