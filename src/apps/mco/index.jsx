import { useMemo, useState } from "react";
import { Cover, DataVerifier } from "../../components/ui-components";
import formatMCOData from "./formatMCOdata";
import "react-complex-tree/lib/style-modern.css";
import {
  ControlledTreeEnvironment,
  Tree
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
  const [focusedItem, setFocusedItem] = useState("RDBONTOLMCO00012");
  const [expandedItems, setExpandedItems] = useState(['RDBONTOLMCO00002', 'RDBONTOLMCO00007', 'RDBONTOLMCO00011']);
  const [selectedItems, setSelectedItems] = useState(['RDBONTOLMCO00012']);
  const items = useMemo(() => {
    return formatMCOData(terms);
  }, [terms]);
  let term
  if(DataVerifier.isValidObject(items[focusedItem])){
    term = items[focusedItem].term
  }
  //console.log(selectedItems);
  return (
    <div style={{ display: "grid", gridTemplateColumns: "30% 70%" }}>
      <div style={{ overflow: "auto" }}>
        <ControlledTreeEnvironment
          items={items}
          getItemTitle={(item) => item.data}
          viewState={{
            "tree-1": {
              focusedItem,
              expandedItems,
              selectedItems,
            },
          }}
          onFocusItem={(item) => setFocusedItem(item.index)}
          onExpandItem={(item) =>
            setExpandedItems([...expandedItems, item.index])
          }
          onCollapseItem={(item) =>
            setExpandedItems(
              expandedItems.filter(
                (expandedItemIndex) => expandedItemIndex !== item.index
              )
            )
          }
          onSelectItems={(items) => setSelectedItems(items)}
        >
          <Tree treeId="tree-1" rootItem="root" treeLabel="Tree Example" />
        </ControlledTreeEnvironment>
      </div>
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "80vh",
          overflow: "auto",
        }}
      >
        <Term {...term} />
      </div>
    </div>
  );
}
