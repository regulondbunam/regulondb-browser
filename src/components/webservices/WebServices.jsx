import React, { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
//import { RelatedIds } from "./operon/RelatedIds";
import { query_GET_GENE_BY } from "./gene/gql";
import { query_GET_OPERON_BY } from "./operon/gql";
import { query_GET_REGULON_BY } from "./regulon/gql";
import { query_GET_PHRASE_OF } from "./phrases/gql";
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
  switch (datamart_name) {
    case "getRegulonBy":
      query = query_GET_REGULON_BY;
      break;
    case "getOperonBy":
      query = query_GET_OPERON_BY;
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
  const [_getData, queryData] = useLazyQuery(query, {
    variables: variables,
  });
  // eslint-disable-next-line no-unused-vars
  const [_getPhrases, phrases] = useLazyQuery(query_GET_PHRASE_OF);
  // eslint-disable-next-line no-unused-vars
  const [_relatedIds, set_relatedIds] = useState([]);
  const [_isFinish, set_isFinish] = useState(false);
  const [_data, set_data] = useState();


  useEffect(() => {
    const { data, loading, error } = queryData;
    if (!error) {
      if (!data && !loading) {
        _getData();
        getState("loading");
      }
      if (!_data && data) {
        set_data(data);
        getState("done");
      }
    } else {
      console.error("Webservices "+datamart_name+" error:", error);
      getState("error");
      getData({error: "webservices "+datamart_name+" query error"});
    }
    if (_data && !_isFinish) {
      //Obtencion de phrases y related IDS
      /*
      if(operon.data && !phrases.data && !phrases.loading && !phrases.error && isGetPhrases){
        let relatedIds = RelatedIds(operon.data.getOperonBy.data);
        if (relatedIds.all.length > 0) {
          set_relatedIds(relatedIds);
          _getPhrases({ variables: { id: relatedIds.all } });
        } else {
          set_relatedIds([]);
        }
      }
      */
      //Envio de _data
      if (phrases.data || !isGetPhrases) {
        let relatedIds = _relatedIds;
        let phrases = {
          data: [],
          Util: undefined,
        };
        if (isGetPhrases) {
          phrases = {
            data: phrases.data.getPhraseOf,
            Util: PhraseUtil,
          };
        }
        //console.log("WebServices: _data", _data);
        try {
          if(datamart_name === "getGeneticElementsFromInterval"){
            getData({
              GE: _data[datamart_name],
              relatedIds: relatedIds,
              phrases: phrases,
            });
          }else{
            getData({
              ..._data[datamart_name],
              relatedIds: relatedIds,
              phrases: phrases,
            });
          }
          if(_data[datamart_name]?.pagination){
            if(_data[datamart_name]?.pagination.totalResults === 0){
              getState("no results")
            }else{
              getState("done")
            }
          }else{
            getState("done")
          }
          set_isFinish("finish");
        } catch (error) {
          getState("error");
          getData({error: "webservices getData error"});
          console.error("on setData error:", error);
        }
      }
      /*
      
      */
    }
  }, [_getData, queryData, _data, _isFinish, _relatedIds, phrases, isGetPhrases, getData, getState, datamart_name]);

  return <></>;
}
