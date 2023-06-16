export default function regulonTableData(data) {
    //console.log(data);
    let rows = []
    
    data.forEach(doc => {
        let synonyms = ""
        try {
            synonyms = doc.regulator.synonyms.map(synonym => synonym).join(', ');
        } catch (error) {
            console.error("No synonyms found for regulator: "+doc.regulator.name);
        }
        rows.push({
            title: `${doc.regulator.name}, ${synonyms}`, 
            id: doc._id,
            additionalInfo: {
                type: "rn_draw",
            }
        })
    });
    /*
    data.forEach(doc => {
        let products = doc.products.map(product => {return product.name}).join(', ')
        rows.push({title : `${doc.regulon.name}, ${products}`, id : doc.regulon.id})
    }); */
    let formatData = {
        id: 'regulonTable',
        rows: rows
    }
    return formatData;
}