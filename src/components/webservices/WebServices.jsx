import React, { useEffect } from "react";
import { useLazyQuery, useQuery } from "@apollo/client";
import { OperonIds } from "./operon/related_Ids";
import { query_GET_GENE_BY } from "./gene/gql";
import { query_GET_OPERON_BY } from "./operon/gql";
import { query_GET_REGULON_BY } from "./regulon/gql";
import { query_GET_PHRASE_OF } from "./phrases/gql";
import { query_getAllSigmulon, query_getSigmulonBy } from "./sigmulon/gql";
import { query_GET_GE_Interval } from "./GeneticElementsFromInterval/gql";
import { PhraseUtil } from "./phrases/util";


export default function WebServices({
  datamart_name,
  variables,
  getData = () => {},
  getState = () => {},
  isGetRelatedIDs = false,
  isGetPhrases = false,
}) {
  let query = ""
  let relatedIds
  switch (datamart_name) {
    case "getSigmulonBy":
      query = query_getSigmulonBy;
      break;
    case "getAllSigmulon":
      query = query_getAllSigmulon;
      break;
    case "getRegulonBy":
      query = query_GET_REGULON_BY;
      break;
    case "getOperonBy":
      query = query_GET_OPERON_BY;
      relatedIds = OperonIds
      break;
    case "getGenesBy":
      query = query_GET_GENE_BY;
      break;
    case "getGeneticElementsFromInterval":
      query = query_GET_GE_Interval;
      break;
    default:
      console.error("No query found for " + datamart_name);
      break;
  }
  const { data, loading, error } = useQuery(query, {
    variables: variables,
  });

  const [_getPhrases, phrases] = useLazyQuery(query_GET_PHRASE_OF);


  useEffect(() => {
    if (!error) {
      if (loading) {
        getState("loading");
      }
      if (data) {
        getState("done");
        let listRelatedIds
        let phrasesData
        if(isGetRelatedIDs && !isGetPhrases){
          listRelatedIds = relatedIds(data[datamart_name].data)
        }
        if (isGetPhrases && (!phrases.loading || !phrases.data || !phrases.error)) {
          listRelatedIds = relatedIds(data[datamart_name].data)
          _getPhrases({ variables: { id: listRelatedIds.all } });
        }
        if(phrases.error){
          console.error("get phrases error:", error);
        }
        if(phrases.data){
          phrasesData = {
            data: phrases.data.getPhraseOf,
            Util: PhraseUtil,
          };
        }
        try {
          if(datamart_name === "getGeneticElementsFromInterval"){
            getData({
              GE: data[datamart_name],
              relatedIds: listRelatedIds,
              phrases: phrasesData,
            });
          }else{
            getData({
              ...data[datamart_name],
              relatedIds: listRelatedIds,
              phrases: phrasesData,
            });
          }
          if(data[datamart_name]?.pagination){
            if(data[datamart_name]?.pagination.totalResults === 0){
              getState("no results")
            }
          }
        } catch (error) {
          getState("error");
          getData({error: "webservices send data in attribute getData error"});
          console.error("webservices send data in attribute getData error:", error);
        }
      }
    } else {
      console.error("Webservices "+datamart_name+" error:", error);
      getState("error");
      getData({error: "webservices "+datamart_name+" query error"});
    }
  }, [_getPhrases, data, datamart_name, error, getData, getState, isGetPhrases, isGetRelatedIDs, loading, phrases, relatedIds]);

  return <></>;
}
