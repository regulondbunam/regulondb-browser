import fcose from "cytoscape-fcose";
import CytoscapeComponent from "react-cytoscapejs";
import dagre from "cytoscape-dagre";
import React, { useState } from "react";
import cytoscape from "cytoscape";
import sbgnStylesheet from "cytoscape-sbgn-stylesheet";
import SearchBar from "./SearchBar";
import styles from "./GensorUnitMap.module.css";
import Drawer from "@mui/material/Drawer";
import { GoGrabber } from "react-icons/go";
import { IconButton } from "@mui/material";
import NavigationMenu from "./NavigationMenu";
import Box from "@mui/material/Box";
import BuildMap from "./buildGUMap/index";
import Windows from "./windows";

import ComboBox from "./comboBox";

cytoscape.use(fcose);
cytoscape.use(dagre);

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

//genera el objeto con los elementos para crear el mapa de cytoscape.js
const generateElements = (responseData) => {
  let nodes = responseData["getGUsBy"]["data"][0]["gensorUnit"]["components"];
  let reactions = responseData["getGUsBy"]["data"][0]["reactions"];
  let capa; //índice que nos va a decir a que capa corresponde la reacción
  let capas = [
    { x: 0, y: 0, numberReactions: 0 }, //capa 0
    { x: 0, y: -300, numberReactions: 0 }, //capa 1
    { x: 0, y: -600, numberReactions: 0 }, //capa 2
    { x: 0, y: -900, numberReactions: 0 }, //capa 3
    { x: 0, y: -1200, numberReactions: 0 }, //capa 4
  ];
  let positionAux;

  let elements = [];
  //checar lo de nodos rep  etidos y pensar como conservarlos
  let elementsAux = [];

  reactions.forEach((reaction) => {
    //se evalua a que capa pertenece la reacion
    capa =
      reaction.type === "transcription"
        ? 1
        : reaction.type === "translation"
        ? 2
        : reaction.type === "state transition"
        ? 3
        : 4;
    //x se vuelve negativo
    if (capas[capa].numberReactions % 2) {
      capas[capa].x = capas[capa].x * -1;
    }

    let elementoRepetido = false;
    reaction.components.forEach((component) => {
      if (
        elementsAux.includes(component.name) &&
        component.function != "activator"
      ) {
        elementoRepetido = elements.filter((elemento) => {
          return elemento.data.id === component.name;
        })[0];
      }
    });

    if (elementoRepetido) {
      positionAux = { x: elementoRepetido.position.x, y: capas[capa].y };
    } else {
      positionAux = { x: capas[capa].x, y: capas[capa].y };
    }

    //ciclo que angrega los nodos que le pertenecen a cada reaccion
    reaction.components.forEach((component) => {
      if (!elementsAux.includes(component.name)) {
        let positionNodos;
        if (elementoRepetido) {
          positionNodos =
            component.function === "product"
              ? {
                  x: positionAux.x,
                  y: positionAux.y - 100,
                }
              : {
                  x: positionAux.x,
                  y: positionAux.y + 100,
                };
          if (component.name.includes("_Ext")) {
            positionNodos = {
              x: positionAux.x,
              y: capas[4].y - 100,
            };
          }
        } else {
          positionNodos =
            component.function === "product"
              ? {
                  x: capas[capa].x,
                  y: capas[capa].y - 100,
                }
              : {
                  x: capas[capa].x,
                  y: capas[capa].y + 100,
                };
          if (component.name.includes("_Ext")) {
            positionNodos = {
              x: capas[4].x,
              y: capas[4].y - 100,
            };
          }
        }

        if (component.function === "activator") {
          positionNodos = {
            x: capas[0].x,
            y: capas[0].y,
          };
        }

        if (component.type === "complex") {
          elements.push({
            data: {
              id: component.name,
              class: "complex",
              label: component.name,
              type: component.type,
              associatedReaction: ["R" + reaction.number],
              clonemarker: false, // whether the node has a clonemarker or not
              stateVariables: [], // an array of state variables
              unitsOfInformation: [], // an array of units of information
              function: component.function,
              bbox: {
                x: 1409.3416303507177,
                y: 170.3243361927971,
                w: 60,
                h: 60,
              },
            },
            position: positionNodos,
          });

          elementsAux.push(component.name);
          let namesSubNodos = component.name.split("-");
          nodes
            .filter((node) => namesSubNodos.includes(node.name))
            .forEach((SubNode) => {
              elements.push({
                data: {
                  id: component.name + "_SubNode" + SubNode.name,
                  class:
                    SubNode.type === "simple_molecule"
                      ? "simple chemical"
                      : SubNode.type === "complex"
                      ? "complex"
                      : "macromolecule",
                  parent: component.name,
                  label: SubNode.name,
                  type: SubNode.type,
                  associatedReaction: ["R" + reaction.number],
                  clonemarker: false, // whether the node has a clonemarker or not
                  stateVariables: [], // an array of state variables
                  unitsOfInformation: [], // an array of units of information
                  function: SubNode.function,
                  bbox: {
                    x: 1409.3416303507177,
                    y: 170.3243361927971,
                    w: 60,
                    h: 60,
                  },
                },
              });
            });
        } else {
          elements.push({
            data: {
              id: component.name,
              class:
                component.type === "simple_molecule"
                  ? "simple chemical"
                  : "macromolecule",
              label: component.name,
              type: component.type,
              associatedReaction: ["R" + reaction.number],
              clonemarker: false, // whether the node has a clonemarker or not
              stateVariables: [], // an array of state variables
              unitsOfInformation: [], // an array of units of information
              function: component.function,
              bbox: {
                x: 1409.3416303507177,
                y: 170.3243361927971,
                w: 60,
                h: 60,
              },
              function: component.function,
            },
            position: positionNodos,
          });
          elementsAux.push(component.name);
        }
      } else {
        elements
          .filter((element) => {
            return component.name === element.data.id;
          })[0]
          .data.associatedReaction.push("R" + reaction.number);
      }
      //proceso que genera las edges entre los nodos
      if (component.function === "product") {
        elements.push({
          data: {
            id: component.name + "RowR" + reaction.number,
            class: "production",
            associatedReaction: ["R" + reaction.number],
            cardinality: 0,
            source: "R" + reaction.number,
            target: component.name,
            bendPointPositions: [],
            portSource: "R" + reaction.number,
            portTarget: component.name,
            function: component.function,
          },
        });
      } else {
        elements.push({
          data: {
            id: component.name + "RowR" + reaction.number,
            class:
              component.type === "gene"
                ? "consumption"
                : component.function === "activator"
                ? "stimulation"
                : component.function === "catalyzer"
                ? "catalysis"
                : component.function === "product"
                ? "production"
                : component.function === "reactant"
                ? "consumption"
                : "necessary stimulation",
            associatedReaction: ["R" + reaction.number],
            source: component.name,
            target: "R" + reaction.number,
            bendPointPositions: [],
            portSource: component.name,
            portTarget: "R" + reaction.number,
            function: component.function,
          },
        });
      }
    });
    //Se agrega el nodo de la reaccion
    elements.push({
      data: {
        id: "R" + reaction.number,
        label: "R" + reaction.number,
        class: "process",
        type: reaction.type,
        associatedReaction: ["R" + reaction.number],
        clonemarker: false,
        stateVariables: [],
        unitsOfInformation: [],
      },
      position: positionAux,
    });

    capas[capa].x =
      capas[capa].numberReactions % 2
        ? capas[capa].x * -1
        : capas[capa].x + 200;

    capas[capa].numberReactions++;
  });
  return elements;
};
export default function GensorUnitMap({ data }) {
  //const components = data["getGUsBy"]["data"][0]["gensorUnit"]["components"];
  const reactions = data["getGUsBy"]["data"][0]["reactions"];
  const cyStylesheet = sbgnStylesheet(cytoscape);
  //estado para abrir o cerrar el Drawer o barra lateral
  const [isDrawOpen, setIsDrawOpen] = useState(false);
  //estado que tine el nucleo del mapa de cytoscape
  const [_cy, select_cy] = useState();
  const [selectedNode, setSelectedNode] = useState(null);

  //esta funcion asigna los estilos a cada uno de los nodos utilizando el selector
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

    cy.on("click", "node", function (event) {
      var node = event.target;
      if (node.data().class === "process") {
        let componentes = cy.nodes().filter(function (ele) {
          return ele.data("associatedReaction").includes(node.id());
        });

        let nodeSelected = reactions.filter(
          (reaction) => "R" + reaction.number === node.id()
        );
        const position = node.renderedPosition();
        setSelectedNode({ ...nodeSelected[0], ...position });
      }
    });
  };

  const filterInfoList = (data) => {
    let nameReactions = [];
    let reactions = data["getGUsBy"]["data"][0]["reactions"];
    let components = data["getGUsBy"]["data"][0]["gensorUnit"]["components"];

    reactions.forEach((info) => {
      nameReactions.push("R" + info.number + ": " + info.pathwayComponents);
    });
    let infoList = { Reactions: nameReactions };
    let keys = [];
    components.forEach((element) => {
      if (!keys.includes(element.type)) {
        keys.push(element.type);
        let aux = [];
        components.forEach((component) => {
          if (component.type === element.type) {
            aux.push(component["name"]);
          }
        });
        infoList = Object.assign(infoList, {
          [element.type]: aux,
        });
      }
    });
    return infoList;
  };

  //objeto con todos los elementos del mapa
  const elements = generateElements(data);
  //const elements = BuildMap(components, reactions);
  //console.log(BuildMap(components, reactions));
  //console.log(elements);
  return (
    <div>
      <div>
        {selectedNode && (
          <Windows
            infoNode={{ selectedNode }}
            setSelectedNode={() => setSelectedNode(false)}
          />
        )}
        <div className={styles.toolBar}>
          <IconButton
            sx={{
              bgcolor: "#32617D",
              marginTop: "10px",
              marginLeft: "15px",
              width: "30px",
              height: "30px",
            }}
            className={styles.buttonIcon}
            onClick={() => {
              setIsDrawOpen(!isDrawOpen);
            }}
          >
            <GoGrabber className={styles.iconMenu} />
          </IconButton>

          <div className={styles.autoCompleat}>
            <SearchBar
              elements={elements}
              map={_cy}
              placeholder="search component or reaction"
            />
          </div>
          <div className={styles.comboBox}>
            <ComboBox
              options={[
                { label: "cose", value: "cose" },
                { label: "dagre", value: "dagre" },
                { label: "breadthfirst", value: "breadthfirst" },
                { label: "circle", value: "circle" },
              ]}
              placeholder={"select a layout option"}
              cy={_cy}
            />
          </div>
        </div>

        <Box sx={{ display: "flex" }}>
          <Drawer
            anchor="left"
            variant="temporary"
            sx={{
              position: "absolute",
              width: "20%",
              height: "80%",
              flexShrink: 0,
              top: "150px",
              "& .MuiDrawer-paper": {
                top: "150px",
                width: "20%",
                height: "80%",
                border: "2px solid #3D779B",
                boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.25)",

                boxSizing: "border-box",
              },
            }}
            open={isDrawOpen}
            onClose={() => {
              setIsDrawOpen(false);
            }}
            hideBackdrop={true}
          >
            <button onClick={()=>{setIsDrawOpen(false);}} >Close</button>
            <NavigationMenu options={filterInfoList(data)} map={_cy} />
            
          </Drawer>
        </Box>
      </div>
      <CytoscapeComponent
        elements={elements}
        style={{ width: "100%", height: "600px" }}
        zoomingEnabled={true}
        maxZoom={3}
        minZoom={0.1}
        autounselectify={false}
        boxSelectionEnabled={true}
        stylesheet={styles}
        cy={cyEffects}
        layout={layout}
      />
    </div>
  );
}
