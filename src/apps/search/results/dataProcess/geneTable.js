export default function geneTableData(data) {
    //console.log(data);
    let rows = []
    data.forEach(doc => {
        let products = doc.products.map(product => { return product.name }).join(', ')
        rows.push({
            title: `${doc.gene.name}, ${products}`,
            id: doc.gene._id,
            additionalInfo: {
                type: "ge_draw",
                leftEndPosition: doc.gene.leftEndPosition,
                rightEndPosition: doc.gene.rightEndPosition,
                products: products
            }
        })
    });
    let formatData = {
        id: 'geneTable',
        rows: rows
    }
    return formatData;
}