import { useQuery, useLazyQuery } from "@apollo/client";
import { query_GetGoTerms, query_GetSubclassesOfTermId } from "./queries";
import { DataVerifier } from "../../../components/ui-components";
import { useState } from "react";

export function useGetGoTerms() {
  const { data, loading, error } = useQuery(query_GetGoTerms);
  let goTerms;
  let treeGO;
  if (data && !error) {
    if (DataVerifier.isValidArray(data.getGoTerms)) {
      goTerms = data.getGoTerms;
      treeGO = {};
      let children = [];
      goTerms.forEach((term) => {
        children.push(term._id);
        treeGO[term._id] = {
          index: term._id,
          isFolder: DataVerifier.isValidArray(term.subclasses),
          children: term.subclasses,
          data: term.name,
          term: term,
        };
      });
      treeGO["root"] = {
        index: "root",
        isFolder: true,
        children: children,
        data: "gene ontology",
      };
    }
  }
  return { goTerms, treeGO, loading, error };
}

export function useLazyGetSubclassesOfTermId() {
  const [getSubclasses, { loading, error }] = useLazyQuery(
    query_GetSubclassesOfTermId
  );
  const getSubClassesOfTermId = (id, updateTreeItems = () => {}) => {
    getSubclasses({
      variables: {
        id: id,
      },
      onCompleted: (data) => {
        if (DataVerifier.isValidArray(data.getSubclassesOfTermId)) {
          let newItems = {};
          data.getSubclassesOfTermId.forEach((term) => {
            newItems[term._id] = {
              index: term._id,
              isFolder: DataVerifier.isValidArray(term.subclasses),
              children: term.subclasses,
              data: term.name,
              term: term,
            };
          });
          updateTreeItems(newItems)
        }
      },
      onError: (error)=>{
        console.error("getSubClasses Error:",error);
      }
    });
  };
  return [getSubClassesOfTermId, {loading, error}]
}
