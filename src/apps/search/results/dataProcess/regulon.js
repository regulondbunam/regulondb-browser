import { DataVerifier } from "../../../../components/ui-components";

export default function regulonFormatResults(regulonsData, keyword = "") {
    let results = []
    if (DataVerifier.isValidArray(regulonsData)) {
        regulonsData.forEach((regulon) => {
            let secondary = ""
            let title = regulon.regulator.name
            if (DataVerifier.isValidObject(regulon.summary)) {
                let summary = []
                for (const key in regulon.summary) {
                    if (Object.hasOwnProperty.call(regulon.summary, key) && key !== "__typename") {
                        const element = regulon.summary[key];
                        summary.push(`<p><b>${key}: </b>${element.total}</p>`)
                    }
                }

                secondary = `<div>${summary.join(" ")}</div>`
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