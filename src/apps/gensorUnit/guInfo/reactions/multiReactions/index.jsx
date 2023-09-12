import cytoscape from "cytoscape";
import sbgnStylesheet from "cytoscape-sbgn-stylesheet";
import CytoscapeComponent from "react-cytoscapejs";
import styles from "../GensorUnitMap.module.css";
import { useMemo, useState } from "react";
import { generateElements } from "./generateElements";
import Options from "./options";
import Search from "./search";

const LAYOUTS = {
  dagre: "dagre",
  breadthfirst: "breadthfirst",
  grid: "grid",
  concentric: "concentric",
};

export default function MultiReactions({ reactions, nodes, name }) {
  const layoutDefault = LAYOUTS.dagre;
  const cyStylesheet = sbgnStylesheet(cytoscape);

  const [_cy, select_cy] = useState();

  const elements = useMemo(() => {
    return generateElements(nodes, reactions);
  }, [nodes, reactions]);

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
      name: layoutDefault,
    }).run();
  };

  return (
    <div className="guMap">
      <Search
        elements={elements}
        reactions={reactions}
        components={nodes}
        cy={_cy}
      />
      <div>
        <Options LAYOUTS={LAYOUTS} cy={_cy} name={name} />
        <div>
          <CytoscapeComponent
            elements={elements}
            style={{ width: "100%", height: "400px" }}
            zoomingEnabled={true}
            userZoomingEnabled={false}
            zoom={1}
            maxZoom={2}
            minZoom={0.1}
            autounselectify={false}
            boxSelectionEnabled={true}
            stylesheet={styles}
            cy={cyEffects}
          />
        </div>
      </div>
    </div>
  );
}
