export function old_generateElements(nodes, reactions) {
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
        component.function !== "activator"
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
}

const REACTION_TYPE = {
  transcription: "transcription",
  translation: "translation",
  state_transition: "state transition",
};

const COMPONENT_TYPE = {
  complex: "complex",
};

export function generateElements(nodes, reactions = [], width, height) {
  let elements = [];
  let components = [];
  reactions.forEach((reaction) => {
    /**
     * Variable bandera para identificar si la reaccion tiene elementos que ya se encuentran identificados
     * @type {boolean}
     */
    let isRepeat = false;
    //=>IDENTIFICACION DE LA POSICION DE LA REACCION EN CAPA

    reaction.components.forEach((component) => {
      //Generando Nodos
      if (!components.includes(component.name)) {
        components.push(component.name);
        if (component.type === COMPONENT_TYPE.complex) {
          elements.push({
            data: {
              id: component.name,
              class: COMPONENT_TYPE.complex,
              label: component.name,
              type: component.type,
              associatedReaction: ["R" + reaction.number],
              clonemarker: false, // whether the node has a clonemarker or not
              stateVariables: [], // an array of state variables
              unitsOfInformation: [], // an array of units of information
              function: component.function,
              /*bbox: {
                  x: 1409.3416303507177,
                  y: 170.3243361927971,
                  w: 60,
                  h: 60,
                },*/
            },
          });
          let namesSubNodos = component.name.split("-");
          nodes
            .filter((node) => namesSubNodos.includes(node.name))
            .forEach((subNode) => {
              elements.push({
                data: {
                  id: component.name + "_SubNode" + subNode.name,
                  class:
                    subNode.type === "simple_molecule"
                      ? "simple chemical"
                      : subNode.type === "complex"
                      ? "complex"
                      : "macromolecule",
                  parent: component.name,
                  label: subNode.name,
                  type: subNode.type,
                  associatedReaction: ["R" + reaction.number],
                  clonemarker: false, // whether the node has a clonemarker or not
                  stateVariables: [], // an array of state variables
                  unitsOfInformation: [], // an array of units of information
                  function: subNode.function,
                  /*bbox: {
                    x: 1409.3416303507177,
                    y: 170.3243361927971,
                    w: 60,
                    h: 60,
                  },*/
                },
              });
            });
        }else{
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
              /*bbox: {
                x: 1409.3416303507177,
                y: 170.3243361927971,
                w: 60,
                h: 60,
              },*/
              function: component.function,
            },
          });
        }
      } else {
        elements
          .filter((element) => {
            return component.name === element.data.id;
          })[0]
          .data.associatedReaction.push("R" + reaction.number);
      }
      //proceso que genera las edges entre los 
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
        //NODO de reaccion
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
        });
      }
    });
  });
  return elements
}
