import { DataVerifier } from "../../../../components/ui-components";

export default function regulonFormatResults(regulonsData, keyword = "") {
    let results = []
    if (DataVerifier.isValidArray(regulonsData)) {
        regulonsData.forEach((regulon) => {
            let secondary = ""
            let title = regulon.regulator.name
            if (DataVerifier.isValidObject(regulon.regulates)) {
                let genes = regulon.regulates.genes.map((gene) => {
                    switch (gene.function) {
                        case "repressor":
                            return `<span style="color:red">${gene.name}</span>`
                        case "activator":
                            return `<span style="color:green">${gene.name}</span>`
                        case "dual":
                            return `<span style="color:blue">${gene.name}</span>`
                        default:
                            return `<span>${gene.name}</span>`
                    }
                }).join(", ")

                secondary = `<div>
                <p><b>Genes: </b>${genes}</p>
                </div>`
            }

            //let matches = title.matchAll(keyword)
            //let score = [...matches].length
            title = title.replaceAll(keyword, "<b>" + keyword + "</b>")
            results.push({
                _id: regulon._id,
                data: regulon,
                type: "regulon",
                title: title,
                secondary: secondary,
                //score: score
            })
        });
    }
    //results.sort((a, b) => b.score - a.score);
    return results
}

/*
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

    let formatData = {
        id: 'regulonTable',
        rows: rows
    }
    return formatData;
}
*/