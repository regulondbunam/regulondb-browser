export function ElementsContext(
    geneticElements = [],
  ) {
    let geneticElementsContext = [];
    geneticElements.forEach((element) => {
      let geneticElement = { ...element };
      if (element.objectType === "gene") {
        geneticElement.onClick = () => {
          window.location.href = "/gene/" + element._id;
        };
      }
      geneticElementsContext.push(geneticElement);
    });
  
    return geneticElementsContext;
  }
  