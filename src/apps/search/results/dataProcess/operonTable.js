

export default function operonTableData(data) {
    //console.log(data);
    let rows = []
    data.forEach(doc => {
        rows.push({
            title : `${doc.operon.name}, `, 
            id : doc._id,
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