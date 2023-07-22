import { DataVerifier } from "../../../../components/ui-components";

export default function geneFormatResults(geneData, keyword = ""){
    let results = []
    if (DataVerifier.isValidArray(geneData)) {
      geneData.forEach((gene) => {
        let products = ""
        if (DataVerifier.isValidArray(gene.products)) {
            products = ", "+gene.products.map(product => { return product.name }).join(', ')
        }
        //let re = new RegExp(`${keyword}`, "gm");
        let title = gene.gene.name+" "+products
        let matches = title.matchAll(keyword)
        let score = [...matches].length
        title = title.replaceAll(keyword,"<b>"+keyword+"</b>")
        results.push({
            _id: gene._id,
            data: gene,
            type: "gene",
            title: title,
            score: score
        })
      });
    }
    results.sort((a, b) => b.score - a.score);
    return results
  }

/*
function geneTableData(data) {
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
*/