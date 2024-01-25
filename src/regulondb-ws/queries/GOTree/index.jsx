import { useQuery, useLazyQuery } from "@apollo/client";
import { query_GetGoTerms, query_GetSubclassesOfTermId, query_GetTermBy,query_GetNameBy, query_GetSuperclassesOfTermId } from "./queries";
import { DataVerifier } from "../../../components/ui-components";
//import { useState } from "react";

export function useGetTree(goId){
  const { data, loading, error } = useQuery(query_GetGoTerms);
  const [getSelectedTerm, {loading: loadSelectTerm, error: errorSelectTerm}] = useLazyQuery(query_GetTermBy,{
    variables: {
      advancedSearch: `${goId}[_id]`
    }
  })
  const [getSuperClasses,{loading: loadSuper, error: errorSuper }]= useLazyQuery(query_GetSuperclassesOfTermId)
  let goTerms;
  let treeGO;
  if (data && !error) {
    if (DataVerifier.isValidArray(data.getGoTerms)) {
      goTerms = data.getGoTerms;
      let awaitTreeGO = {};
      let children = [];
      goTerms.forEach((term) => {
        children.push(term._id);
        awaitTreeGO[term._id] = {
          index: term._id,
          isFolder: DataVerifier.isValidArray(term.subclasses),
          children: term.subclasses,
          data: term.name,
          term: term,
        };
      });
      awaitTreeGO["root"] = {
        index: "root",
        isFolder: true,
        children: children,
        data: "gene ontology",
      };
      if (DataVerifier.isValidString(goId)) {
        getSelectedTerm({
          onCompleted: ((data)=>{
            if (DataVerifier.isValidArray(data.getTermBy)) {
              const term = data.getTermBy[0]
              awaitTreeGO[term._id] = {
                index: term._id,
                isFolder: DataVerifier.isValidArray(term.subclasses),
                children: term.subclasses,
                data: term.name,
                term: term,
              };
              if (DataVerifier.isValidArray(term.subclassOf)) {
                const idSubClassOf = term.subclassOf[0]
                getSuperClasses({
                  variables: {
                    _id: idSubClassOf
                  },
                  onCompleted: (data)=>{
                    if (DataVerifier.isValidArray(data.getSuperclassesOfTermId)) {
                      const _term = data.getSuperclassesOfTermId[0] 
                      awaitTreeGO[_term._id] = {
                        index: _term._id,
                        isFolder: DataVerifier.isValidArray(_term.subclasses),
                        children: _term.subclasses,
                        data: _term.name,
                        term: _term,
                      };
                      if (DataVerifier.isValidArray(_term.subclassOf)) {
                        const idTerm = _term.subclassOf[0]
                        findSuperClass(idTerm,getSuperClasses,awaitTreeGO)
                      }
                    }
                  }
                })
              }else{
                treeGO ={... awaitTreeGO}
              }
            }
          })
        })
      }
    }
  }
  return {treeGO, loading}
}

function findSuperClass(idTerm,getSuperClasses,awaitTreeGO){
  getSuperClasses({
    variables: {
      _id: idTerm
    },
    onCompleted: (data)=>{
      if (DataVerifier.isValidArray(data.getSuperclassesOfTermId)) {
        const _term = data.getSuperclassesOfTermId[0] 
        awaitTreeGO[_term._id] = {
          index: _term._id,
          isFolder: DataVerifier.isValidArray(_term.subclasses),
          children: _term.subclasses,
          data: _term.name,
          term: _term,
        };
        //condición para evitar bucle por si algún concepto del GO se siclo (pasa de árbol a grafo)
        if(["GO:0008150","GO:0003674","GO:0005575"].find(ontologyId=>ontologyId===_term.ontologyId)){

        }
        if (DataVerifier.isValidArray(_term.subclassOf)) {
          const idTerm = _term.subclassOf[0]
          findSuperClass(idTerm,getSuperClasses,awaitTreeGO)
        }
      }
    },
    onError: (error)=>{
      console.error("error find super class");
    }
  })
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
  const [getName, { loading, error }] = useLazyQuery(
    query_GetNameBy
  );
  const goTerms = (id, updateSuggest = () => {}) => {
    getName({
      variables: {
        id: id,
      },
      onCompleted: (data) => {
        if (DataVerifier.isValidArray(data.getTermBy)) {
          let newTerms = [];
          data.getSubclassesOfTermId.forEach((term) => {
            newTerms.push(term.name)
            newTerms.push(term.ontologyId)
          });
          updateSuggest(newTerms)
        }
      },
      onError: (error)=>{
        console.error("getSubClasses Error:",error);
      }
    });
  };
  return [goTerms, {loading, error}]
}

export function useGetGOBySearch(search = "") {
  const {data, loading, error} = useQuery(query_GetTermBy,{
    variables: {
      search: search
    }
  })
  let goTerms
  if (data && !error) {
    if (DataVerifier.isValidArray(data.getTermBy)) {
      goTerms = data.getTermBy
    }
  }
  if (error) {
    console.error(error);
  }
  return {goTerms,loading,error}
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
