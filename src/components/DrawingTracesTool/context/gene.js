export function GetGeneElementsContext(
  geneId,
  geneticElements = []
) {
  let geneticElementsContext = [];

  geneticElements.forEach((element) => {
    let geneticElement = { ...element };
    if (element._id === geneId) {
      geneticElement.stroke = { color: "#00F", width: 3, linecap: "round" };
    }
    geneticElementsContext.push(geneticElement);
  });

  return geneticElementsContext;
}
