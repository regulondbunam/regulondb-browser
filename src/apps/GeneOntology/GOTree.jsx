import { useMemo, useState } from "react";
import { DataVerifier } from "../../components/ui-components";
import OntologyData from "./OntologyData";
import "react-complex-tree/lib/style-modern.css";
import {
  ControlledTreeEnvironment,
  Tree
} from "react-complex-tree";

export default function GoTree({ goTerms }) {
    const [focusedItem, setFocusedItem] = useState("");
    const [expandedItems, setExpandedItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const items = useMemo(() => {
      return formatMCOData(goTerms);
    }, [goTerms]);
    let term
    if(DataVerifier.isValidObject(items[focusedItem])){
      term = items[focusedItem].term
    }
    console.log(term);
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
          <OntologyData {...term} />
        </div>
      </div>
    );
  }

function formatMCOData(goTerms=[]) {
    const items ={}
    
    if(DataVerifier.isValidArray(goTerms)){
      let children = []
        goTerms.forEach((term)=>{
          children.push(term._id)
          items[term._id] = {
            index:  term._id,
            isFolder: DataVerifier.isValidArray(term.subclasses),
            children: term.subclasses,
            data: term.name,
            term: term
        }
        })
        items['root'] = {
          index: "root",
          isFolder: true,
          children: children,
          data: "gene ontology"
        }
    }
    
    return items
}