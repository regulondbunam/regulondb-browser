import { useMemo, useState } from "react";
import { Cover } from "../../components/ui-components";
import formatMCOData from "./formatMCOdata";
import "react-complex-tree/lib/style-modern.css";
import {
  UncontrolledTreeEnvironment,
  Tree,
  StaticTreeDataProvider,
} from "react-complex-tree";
import TERMS from "./terms_v2.json";
import Term from "./term";

export default function MCO(params) {
  //const [terms, setData] = useState()

  const terms = TERMS.collectionData;
  return (
    <div>
      <Cover>
        <h1>Microbial Conditions Ontology (MCO) Browser</h1>
      </Cover>
      <TreeMCO terms={terms} />
    </div>
  );
}

function TreeMCO({ terms }) {
  const [term, setTerm] = useState()
  const items = useMemo(() => {
    return formatMCOData(terms);
  }, [terms]);
  //console.log(term);
  return (
    <div style={{display:"grid", gridTemplateColumns: "30% 70%"}} >
      <div style={{overflow: "auto"}} >
        <UncontrolledTreeEnvironment
          dataProvider={
            new StaticTreeDataProvider(items, (item, data) => ({
              ...item,
              data,
            }))
          }
          getItemTitle={(item) => item.data}
          viewState={{}}
          onFocusItem={(item,treeId)=>{
            console.log(treeId)
            setTerm(item.term)
          }}
        >
          <Tree treeId="tree-1" rootItem="root" treeLabel="Tree Example" />
        </UncontrolledTreeEnvironment>
      </div>
      <div style={{
            position: "sticky",
            top: 0,
            height: "80vh",
            overflow: "auto",
          }}>
        <Term {...term} />
      </div>
    </div>
  );
}
