export function GetOperonElementsContext(
    relatedIds = [],
    geneticElements = []
  ) {
    let geneticElementsContext = [];
  
    geneticElements.forEach((element) => {
      let geneticElement = { ...element };
      if (!relatedIds.find(id=>id===element._id)) {
        geneticElement.opacity = 0.2
      }
      geneticElement._id=`draw_${geneticElement._id}`
      geneticElementsContext.push(geneticElement);
    });
  
    return geneticElementsContext;
  }
  