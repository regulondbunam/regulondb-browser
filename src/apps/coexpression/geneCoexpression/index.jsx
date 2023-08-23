import React from "react";
import { useQuery, gql } from '@apollo/client';

export const QUERY_getCoexpressionRank = gql`
query getCoexpressionRank($id:String, $limit:Int=50){
    getTopCoexpressionRanking(id:$id, limit:$limit)
    {
        gene {
            _id
          locusTag
            name
        }
        rank
      rgbColor
    }
}
`
export default function GeneCoexpression({
  coexpressionData,
  genesInformation,
  dispatch,
}) {
  return <div>GeneCoexpression</div>;
}

function GetCoexpressionInfo({ coexpressionData, genesInformation, dispatch }) {
  const { loading, error, data } = useQuery(QUERY_getCoexpressionRank, { variables: { "id": "" } });
}
