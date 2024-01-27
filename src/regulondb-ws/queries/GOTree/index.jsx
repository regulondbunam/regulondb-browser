import { useQuery, useLazyQuery } from "@apollo/client";
import {
  query_GetGoTerms,
  query_GetSubclassesOfTermId,
  query_GetTermBy,
  query_GetNameBy,
  query_GetSuperclassesOfTermId,
} from "./queries";
import { DataVerifier } from "../../../components/ui-components";
import { useEffect, useState } from "react";
//import { useState } from "react";

export function useGetTree(goId) {
  const [treeGO, setTreeGO] = useState();
  const { data, loading, error } = useQuery(query_GetGoTerms);
  const [getSelectedTerm, { loading: loadSelectTerm, error: errorSelectTerm }] =
    useLazyQuery(query_GetTermBy);
  const [getSuperClasses, { loading: loadSuper, error: errorSuper }] =
    useLazyQuery(query_GetSuperclassesOfTermId);

  useEffect(() => {
    if (data && !error && !treeGO) {
      if (DataVerifier.isValidArray(data.getGoTerms)) {
        const goTerms = data.getGoTerms;
        const itemId = DataVerifier.isValidString(goId) ? goId : goTerms[0]._id;
        let _treeGO = {
          focusedItem: itemId,
          items: {},
          expandedItems: [],
          selectedItems: [itemId],
        };
        let children = [];
        goTerms.forEach((term) => {
          children.push(term._id);
          _treeGO.items[term._id] = {
            index: term._id,
            isFolder: DataVerifier.isValidArray(term.subclasses),
            children: term.subclasses,
            data: term.name,
            term: term,
          };
        });
        _treeGO.items["root"] = {
          index: "root",
          isFolder: true,
          children: children,
          data: "gene ontology",
        };
        if (goId) {
          findSuperClass(goId,getSelectedTerm, getSuperClasses, _treeGO, setTreeGO);
        } else {
          setTreeGO({ ..._treeGO });
        }
      }
    }
  }, [data, error, getSelectedTerm, getSuperClasses, goId, treeGO]);

  return { treeGO, loading };
}

function findSuperClass(
  idTerm,
  getSelectedTerm,
  getSuperClasses,
  _treeGO,
  setTreeGO = () => {}
) {
  console.log(idTerm);
  if(_treeGO.items.hasOwnProperty(idTerm)){
    setTreeGO({ ..._treeGO });
  }
  getSelectedTerm({
    variables: {
      advancedSearch: `${idTerm}[_id]`,
    },
    onCompleted: (data) => {
      console.log(data.getTermBy[0]);
      if (DataVerifier.isValidArray(data.getTermBy)) {
        const term = data.getTermBy[0];
        _treeGO.items[term._id] = {
          index: term._id,
          isFolder: DataVerifier.isValidArray(term.subclasses),
          children: term.subclasses,
          data: term.name,
          term: term,
        };
        if (DataVerifier.isValidArray(term.subclassOf)) {
          const idSubClassOf = term.subclassOf[0];
          _treeGO.expandedItems.push(idSubClassOf);
          findSuperClass(idSubClassOf,getSelectedTerm,getSelectedTerm,_treeGO,setTreeGO)
        } else {
          setTreeGO({ ..._treeGO });
        }
      }
    },
  });
}

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

export function useLazyGetGOName() {
  const [getName, { loading, error }] = useLazyQuery(query_GetNameBy);
  const goTerms = (id, updateSuggest = () => {}) => {
    getName({
      variables: {
        id: id,
      },
      onCompleted: (data) => {
        if (DataVerifier.isValidArray(data.getTermBy)) {
          let newTerms = [];
          data.getSubclassesOfTermId.forEach((term) => {
            newTerms.push(term.name);
            newTerms.push(term.ontologyId);
          });
          updateSuggest(newTerms);
        }
      },
      onError: (error) => {
        console.error("getSubClasses Error:", error);
      },
    });
  };
  return [goTerms, { loading, error }];
}

export function useGetGOBySearch(search = "") {
  const { data, loading, error } = useQuery(query_GetTermBy, {
    variables: {
      search: search,
    },
  });
  let goTerms;
  if (data && !error) {
    if (DataVerifier.isValidArray(data.getTermBy)) {
      goTerms = data.getTermBy;
    }
  }
  if (error) {
    console.error(error);
  }
  return { goTerms, loading, error };
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
          updateTreeItems(newItems);
        }
      },
      onError: (error) => {
        console.error("getSubClasses Error:", error);
      },
    });
  };
  return [getSubClassesOfTermId, { loading, error }];
}

/**
getSuperClasses({
            variables: {
              _id: idSubClassOf,
            },
            onCompleted: (data) => {
              if (DataVerifier.isValidArray(data.getSuperclassesOfTermId)) {
                const _term = data.getSuperclassesOfTermId[0];
                _treeGO.items[_term._id] = {
                  index: _term._id,
                  isFolder: DataVerifier.isValidArray(_term.subclasses),
                  children: _term.subclasses,
                  data: _term.name,
                  term: _term,
                };
                if (DataVerifier.isValidArray(_term.subclassOf)) {
                  const idTerm = _term.subclassOf[0];
                  _treeGO.expandedItems.push(idTerm);
                  findSuperClass(idTerm,getSelectedTerm, getSuperClasses, _treeGO, setTreeGO);
                } else {
                  setTreeGO({ ..._treeGO });
                }
              } else {
                setTreeGO({ ..._treeGO });
              }
            },
            onError: (error) => {
              console.error("error find super class", error);
            },
          });
 */