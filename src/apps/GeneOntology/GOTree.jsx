import { useMemo, useState } from "react";
import { DataVerifier } from "../../components/ui-components";
import OntologyData from "./OntologyData";
import "react-complex-tree/lib/style-modern.css";
import { ControlledTreeEnvironment, Tree } from "react-complex-tree";
import { useLazyGetSubclassesOfTermId } from "../../regulondb-ws/queries";

export default function GoTree({ treeGO, selectedIdGO }) {
  console.log(selectedIdGO ? selectedIdGO : Object.keys(treeGO)[0]);
  const [focusedItem, setFocusedItem] = useState(
    selectedIdGO ? selectedIdGO : Object.keys(treeGO)[0]
  );
  const [expandedItems, setExpandedItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState(
    selectedIdGO ? [selectedIdGO] : [Object.keys(treeGO)[0]]
  );
  const [items, setItems] = useState(treeGO);
  const [getSubClassesOfTermId, { loading, error }] =
    useLazyGetSubclassesOfTermId();
  let term;
  if (DataVerifier.isValidObject(items[focusedItem])) {
    term = items[focusedItem].term;
  }
  return (
    <div style={{ margin: "2px 10% 0 5%" }}>
      <h2>Gene Ontology Tree</h2>
      {selectedIdGO}
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
            onExpandItem={(item) => {
              getSubClassesOfTermId(item.index, (newItems) => {
                setItems({ ...items, ...newItems });
                setTimeout(() => {
                  setExpandedItems([...expandedItems, item.index]);
                }, 100);
              });
            }}
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
          {term && <OntologyData {...term} />}
        </div>
      </div>
    </div>
  );
}
