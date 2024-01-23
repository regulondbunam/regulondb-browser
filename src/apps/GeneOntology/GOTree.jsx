import { useMemo, useState } from "react";
import { DataVerifier } from "../../components/ui-components";
import OntologyData from "./OntologyData";
import "react-complex-tree/lib/style-modern.css";
import {
  ControlledTreeEnvironment,
  Tree
} from "react-complex-tree";
import { useLazyGetSubclassesOfTermId } from "../../regulondb-ws/queries";

export default function GoTree({ treeGO }) {
    const [focusedItem, setFocusedItem] = useState(Object.keys(treeGO)[0]);
    const [expandedItems, setExpandedItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState([Object.keys(treeGO)[0]]);
    const [items, setItems] = useState(treeGO)
    const [getSubClassesOfTermId, {loading, error}] = useLazyGetSubclassesOfTermId();
    let term
    if(DataVerifier.isValidObject(items[focusedItem])){
      term = items[focusedItem].term
    }
    return (
      <div style={{ display: "grid", gridTemplateColumns: "30% 70%", margin: "2px 10% 0 0" }}>
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
            onExpandItem={(item) =>{
              getSubClassesOfTermId(item.index,(newItems)=>{
                setItems({...items,...newItems})
                setTimeout(() => {
                  setExpandedItems([...expandedItems, item.index])
                }, 100);
              })
              
            }
              
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
          {term &&  <OntologyData {...term} /> }
        </div>
      </div>
    );
  }

