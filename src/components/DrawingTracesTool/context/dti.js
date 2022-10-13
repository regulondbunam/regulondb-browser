export function DTIContext(
    geneticElements = [],
  ) {
    let geneticElementsContext = [];
    geneticElements.forEach((element) => {
      let geneticElement = { ...element };
      geneticElement._id=`draw_${geneticElement._id}`
      geneticElementsContext.push(geneticElement);
    });
  
    return geneticElementsContext;
  }
  