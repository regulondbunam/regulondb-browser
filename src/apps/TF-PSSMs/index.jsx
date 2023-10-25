import React, { useState } from "react";
import "react-complex-tree/lib/style-modern.css";
import { Cover } from "../../components/ui-components";
import { ControlledTreeEnvironment, Tree } from "react-complex-tree";

//metadata/meme/

export default function TFPSSMs() {
    
  const [focusedItem, setFocusedItem] = useState("RDBONTOLMCO00012");
  const [expandedItems, setExpandedItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState(["RDBONTOLMCO00012"]);
  return (
    <div>
      <Cover>
        <h1>TF PSSMs Browser</h1>
      </Cover>
      <div></div>
    </div>
  );
}

export function TFPSSMsTest() {
    return (
      <div>
        <Cover>
          <h1>TF PSSMs Browser</h1>
        </Cover>
        <div>
        <iframe style={{width:"100%", height: "80vh"}} src={process.env.REACT_APP_PROSSES_SERVICE+"/meme/"} title="TF PSSMs Browser"/>
        </div>
      </div>
    );
  }