import cytoscape from "cytoscape";
import sbgnStylesheet from "cytoscape-sbgn-stylesheet";
import CytoscapeComponent from "react-cytoscapejs";
import styles from "../GensorUnitMap.module.css";
import { useState } from "react";
import { generateElements } from "./generateElements";
import Options from "./options";


const LAYOUTS = {
  cose: "cose",
  dagre: "dagre",
  breadthfirst: "breadthfirst",
  circle: "circle",
};

export default function SingleReaction({ reaction, nodes }) {
  const cyStylesheet = sbgnStylesheet(cytoscape);
  const [layout,setLayout] = useState(LAYOUTS.dagre)
  const [_cy, select_cy] = useState();

  const elements = generateElements(nodes, [reaction]);

  const handleLayout = (value)=>{
    setLayout(value)
    _cy.layout({
        name: value,
        // Otras opciones de configuración del layout
      }).run();
  }
/*
  useEffect(()=>{
    if (_cy) {
      _cy.layout({
        name: layout,
      }).run()
    }
  },[layout,_cy])

*/
  const cyEffects = (cy) => {
    select_cy(cy);
    cy.fit();
    cy.style(cyStylesheet);
    cy.elements('node[type = "transcription_factor"]').style({
      "background-color": "#4881A6",
      "text-outline-width": 0,
      width: "100px",
      height: "30px",
    });
    cy.elements('node[type = "protein"]').style({
      "background-color": "#B6BD7B",
      "text-outline-width": 0,
      width: "80px",
      height: "30px",
    });

    cy.elements('node[type = "simple_molecule"]').style({
      "background-color": "#B6BD7B",
      "text-outline-width": 0,
      width: "100px",
      height: "20px",
    });

    cy.elements('node[type = "gene"]').style({
      "background-color": "#FFBC00",
      "text-outline-width": 0,
      shape: "rectangle",
      width: "100px",
      height: "30px",
    });

    cy.elements('node[type = "RNA"]').style({
      "background-color": "#FFBC00",
      "text-outline-width": 0,
      shape: "polygon",
      "shape-polygon-points": "-0.7, -0.6,   1, -0.6,   0.7, 0.5,   -1, 0.5",
      width: "160px",
    });
    cy.layout({
      name: layout,
    }).run()
  };

  return (
    <div>
      <div>
        <CytoscapeComponent
          elements={elements}
          style={{ width: "100%", height: "400px" }}
          zoomingEnabled={true}
          maxZoom={2}
          minZoom={0.5}
          autounselectify={false}
          boxSelectionEnabled={true}
          stylesheet={styles}
          cy={cyEffects}
        />
      </div>
      <Options LAYOUT={LAYOUTS} layout={layout} handleLayout={handleLayout} />
    </div>
  );
}
