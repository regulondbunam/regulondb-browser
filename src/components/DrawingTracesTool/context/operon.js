export function GetOperonElementsContext(
    relatedIds = [],
    geneticElements = []
  ) {
    let geneticElementsContext = [];

    console.log(geneticElements);
    geneticElements.forEach((element) => {
      let geneticElement = { ...element };
      if (!relatedIds.find(id=>id===element._id)) {
        geneticElement.opacity = 0.5
        geneticElement.objectRGBColor = "230,230,230" 
      }
      geneticElement._id=`draw_${geneticElement._id}`
      geneticElementsContext.push(geneticElement);
    });
  
    return geneticElementsContext;
  }
  