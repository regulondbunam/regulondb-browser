import cytoscape from "cytoscape";
import sbgnStylesheet from "cytoscape-sbgn-stylesheet";
import CytoscapeComponent from "react-cytoscapejs";
import styles from "../GensorUnitMap.module.css";
import { useMemo, useState } from "react";
import { generateElements } from "./generateElements";
import Options from "./options";
import cola from "cytoscape-cola";
import elk from "cytoscape-elk";
import { useEffect } from "react";

cytoscape.use(cola);
cytoscape.use(elk);

const LAYOUTS = {
  dagre: {
    name: "dagre",
  },
  breadthfirst: {
    name: "breadthfirst",
  },
  grid: {
    name: "grid",
  },
  concentric: {
    name: "concentric",
  },
  cola: {
    name: "cola",
  },
  elk: {
    name: "elk",
    elk: {
      // All options are available at http://www.eclipse.org/elk/reference.html
      //
      // 'org.eclipse.' can be dropped from the identifier. The subsequent identifier has to be used as property key in quotes.
      // E.g. for 'org.eclipse.elk.direction' use:
      // 'elk.direction'
      //
      // Enums use the name of the enum as string e.g. instead of Direction.DOWN use:
      // 'elk.direction': 'DOWN'
      "elk.direction": "UP",
    },
  },
};

export default function MultiReactions({ reactions, nodes, name }) {
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
    let layout = cy.layout(LAYOUTS.elk);

    layout.pon("layoutstop").then(function (event) {
      let element = cy.nodes('node[type = "transcription_factor"]')[0];
      cy.zoom(1);
      cy.center(cy.getElementById(element.id()));
    });

    layout.run();
  };

  return (
    <div className="guMap" id="guMap">
      <Options
        elements={elements}
        reactions={reactions}
        components={nodes}
        cy={_cy}
        LAYOUTS={LAYOUTS}
      />
      <div>
        <CytoscapeComponent
          elements={elements}
          style={{ width: "100%", height: "100vh" }}
          zoomingEnabled={true}
          userZoomingEnabled={true}
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
  );
}
