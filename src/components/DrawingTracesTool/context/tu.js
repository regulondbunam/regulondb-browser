export function GetTuElementsContext(
    relatedIds = [],
    geneticElements = []
) {
    let geneticElementsContext = [];
    console.log(geneticElements);
    geneticElements.forEach((element) => {
        let geneticElement = { ...element };
        if (relatedIds.find(id => id === element._id)) {
            geneticElement._id = `draw_${geneticElement._id}`
            geneticElementsContext.push(geneticElement);
        }
    });
    return geneticElementsContext;
}