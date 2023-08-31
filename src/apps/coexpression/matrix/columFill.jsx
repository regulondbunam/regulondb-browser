import React from "react";
import { useQuery, gql } from "@apollo/client";
import Skeleton from "@mui/material/Skeleton";

const QUERY_getRankFromGeneList = gql`
  query getRankFromGeneList($gene: String!, $geneList: [String]!) {
    getRankFromGeneList(gene: $gene, geneList: $geneList) {
      gene {
        _id
        name
      }
      rank
      rgbColor
    }
  }
`;

export default function ColumFill({ gene, rankingGenes = [] }) {
  const geneList = rankingGenes.map((gene) => gene.name);
  const { loading, error, data } = useQuery(QUERY_getRankFromGeneList, {
    variables: { gene: gene, geneList: geneList },
  });
  console.log(data);
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "150px",
        gridTemplateRows: `repeat(${rankingGenes.length}, 30px)`,
        rowGap: "2px",
      }}
    >
      {loading && (
        <>
          {[...Array(rankingGenes.length).keys()].map((n, i) => {
            return (
              <div key={gene + "_" + n + "_" + i}>
                <Skeleton variant="rounded" width={150} height={30} />
              </div>
            );
          })}
        </>
      )}
      {data?.getRankFromGeneList && (
        <>
          {data?.getRankFromGeneList.map((coexpression, index) => {
            return (
              <div
                key={"Rank_" + coexpression.gene[0]._id + "_" + index}
                style={{
                  height: "30px",
                  width: "150px",
                  backgroundColor: "rgb(" + coexpression.rgbColor + ")",
                }}
              >
                {coexpression.rank.toFixed(2)}
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}
