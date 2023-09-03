import { useLazyQuery, gql } from "@apollo/client";
import { useState } from "react";
import { DataVerifier } from "../../../../components/ui-components";

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

export function useLazyLoadCoexpression(geneList = [], rankingGenes = [], matrices, setMatrices, gene) {
  const [getCoexpression, { loading: coLoading, error, data: nData }] =
    useLazyQuery(QUERY_getRankFromGeneList);
  const [matrixData, setMatrixData] = useState([]);
  const [loadGenes, setLoadGenes] = useState([...geneList]);
  const [onBuff, setBuff] = useState(false);
  const loading = loadGenes.length > 0;

  if(DataVerifier.isValidArray(matrices[gene])){
    return{ matrixData: matrices[gene] }
  }

  const totalOfElements = geneList.length;
  let progress = null;
  if (totalOfElements > 0) {
    progress = (100 / totalOfElements) * matrixData.length;
  }
  if (error) {
    console.log(error);
  }

  if (loading) {
    if (!onBuff) {
      let gene = loadGenes[0];
      //console.log(gene);
      setBuff(true);
      if (gene) {
        setTimeout(() => {
          getCoexpression({
            variables: { gene: gene, geneList: rankingGenes },
            onCompleted: (data) => {
              setMatrixData([...matrixData, data.getRankFromGeneList]);
              setLoadGenes(loadGenes.slice(1, loadGenes.length));
              setBuff(false);
            },
            onError: (error) => {
              console.log(error);
            },
          });
        }, 20);
      }
    }
  } else {
    if(progress === 100){
        let newMatrix = {}
        newMatrix[gene] = matrixData
        setMatrices({...matrices, ...newMatrix})
    }
    if (matrixData.length < totalOfElements && !coLoading) {
      console.log(loadGenes);
      /*
      geneList.forEach((gene) => {
        if (!arr.find((gn) => gn === gene)) {
          unLoadGenes.push(gene);
        }
      });
      */
    }
  }

  //console.log("load:" + progress, matrixData);

  let matrixTable = undefined;

  return { loading, progress, matrixTable, matrixData };
}
