import React, { useState } from "react";
import { Cover, Circular } from "../../components/ui-components";
import { useGetTree, useGetGoTerms } from "../../regulondb-ws/queries";
import GoTree from "./GOTree";
import Search from "./Search";
import { useParams } from "react-router-dom";
import Divider from "@mui/material/Divider";

export default function GeneOntology() {
  const { keyword } = useParams();
  const [selectedIdGO, setSelectedIdGO] = useState();
  console.log(selectedIdGO);
  return (
    <div>
      <Cover>
        <h1>Gene Ontology Browser</h1>
      </Cover>
      <Search setSelectedIdGO={setSelectedIdGO} keyword={keyword} />

    </div>
  );
}

function SimpleTree(){
  const { treeGO, loading /*error*/ } = useGetTree();
  return (
    <div>
      {loading && <Circular />}
      <Divider />
      {treeGO && <GoTree treeGO={treeGO} />}
    </div>
  );
}

function Tree({ selectedIdGO }) {
  const { treeGO, loading /*error*/ } = useGetTree(selectedIdGO);
  return (
    <div>
      {loading && <Circular />}
      <Divider />
      {treeGO && <GoTree treeGO={treeGO} />}
    </div>
  );
}
