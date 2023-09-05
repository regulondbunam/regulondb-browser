import cytoscape from "cytoscape";
import sbgnStylesheet from "cytoscape-sbgn-stylesheet";
import CytoscapeComponent from "react-cytoscapejs";
import styles from "./GensorUnitMap.module.css";
import { useMemo, useState } from "react";
import { generateElements } from "./generateElements";
import Data from "./data";

const layout = {
    name: "dagre",
    nodeDimensionsIncludeLabels: true,
    idealEdgeLength: 100,
    nodeOverlap: 20,
    refresh: 20,
    fit: true,
    padding: 30,
    randomize: false,
    componentSpacing: 100,
    nodeRepulsion: 400000,
    edgeElasticity: 100,
    nestingFactor: 5,
    gravity: 80,
    numIter: 1000,
    initialTemp: 200,
    coolingFactor: 0.95,
    minTemp: 1.0,
  };

export default function SingleReaction({ reaction, nodes }) {

    const cyStylesheet = sbgnStylesheet(cytoscape);
    const [_cy, select_cy] = useState();

    const elements = useMemo(()=>{
        return generateElements(nodes,[reaction])
    },[reaction, nodes])

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
                    layout={layout}
                />
            </div>
            <div>
                <Data {...reaction} />
            </div>
        </div>
    )
}