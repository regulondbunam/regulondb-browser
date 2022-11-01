

export default function operonTableData(data) {
    //console.log(data);
    let rows = []
    data.forEach(doc => {
        let statistics = Object.keys(doc.operon.statistics).map((key) => {
            if (key === "__typename") {
                return ""
            }
            return `${key}: ${doc.operon.statistics[key]}`
        }).join(", ")
        rows.push({
            title: `${doc.operon.name}${statistics}`,
            id: doc._id,
            additionalInfo: {
                type: "ge_draw",
                leftEndPosition: doc.operon.regulationPositions.leftEndPosition,
                rightEndPosition: doc.operon.regulationPositions.rightEndPosition
            }
        })
    });
    let formatData = {
        id: 'operonTable',
        rows: rows
    }
    return formatData;
}