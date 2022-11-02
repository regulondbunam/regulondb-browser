import React, { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { OperonIds } from "./operon/related_Ids";
import { query_GET_GENE_BY } from "./gene/gql";
import { query_GET_OPERON_BY } from "./operon/gql";
import { query_GET_REGULON_BY } from "./regulon/gql";
import { query_GET_PHRASE_OF } from "./phrases/gql";
import { query_getAllSigmulon } from "./sigmulon/gql";
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
  const [_getData, queryData] = useLazyQuery(query, {
    variables: variables,
  });
  // eslint-disable-next-line no-unused-vars
  const [_getPhrases, phrases] = useLazyQuery(query_GET_PHRASE_OF);

  const [_relatedIds, set_relatedIds] = useState();
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
      //Obtencion de phrases
      try {
        if(isGetPhrases){
          if(_relatedIds){
            //console.log(_relatedIds);
            _getPhrases({ variables: { id: relatedIds.all } });
          }else{
            set_relatedIds(relatedIds(_data[datamart_name].data))
          }
        }
      } catch (error) {
        console.error("mee");
      }

      //Envio de _data
      if (phrases.data || !isGetPhrases || phrases.error) {
        if(phrases.error){
          console.error("get phrases error: ",error);
        }

        let phrasesData = {
          data: [],
          Util: undefined,
        };
        if (isGetPhrases) {
          phrasesData = {
            data: phrases.data.getPhraseOf,
            Util: PhraseUtil,
          };
        }

        try {
          if(datamart_name === "getGeneticElementsFromInterval"){
            getData({
              GE: _data[datamart_name],
              relatedIds: _relatedIds,
              phrases: phrasesData,
            });
          }else{
            getData({
              ..._data[datamart_name],
              relatedIds: _relatedIds,
              phrases: phrasesData,
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
  }, [_getData, queryData, _data,relatedIds,_getPhrases, _isFinish, phrases, isGetPhrases,_relatedIds, getData, getState, datamart_name]);

  return <></>;
}
