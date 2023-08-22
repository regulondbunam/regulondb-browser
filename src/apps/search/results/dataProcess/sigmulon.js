import { DataVerifier } from "../../../../components/ui-components";

export default function sigmulonFormatResults(sigmulonData, keyword = "") {
    let results = []
    if (DataVerifier.isValidArray(sigmulonData)) {
        sigmulonData.forEach((sigmulon) => {
            let secondary = ""
            let title = sigmulon.sigmaFactor.name
            if (DataVerifier.isValidObject(sigmulon.statistics)) {
                let summary = []
                for (const key in sigmulon.statistics) {
                    if (Object.hasOwnProperty.call(sigmulon.statistics, key) && key !== "__typename") {
                        const element = sigmulon.statistics[key];
                        summary.push(`<p><b>${key}: </b>${element.total}</p>`)
                    }
                }

                secondary = `<div>${summary.join(" ")}</div>`
            }

            //let matches = title.matchAll(keyword)
            //let score = [...matches].length
            title = title.replaceAll(keyword, "<b>" + keyword + "</b>")
            results.push({
                _id: sigmulon._id,
                data: sigmulon,
                type: "sigmulon",
                title: title,
                secondary: secondary,
                //score: score
            })
        });
    }
    //results.sort((a, b) => b.score - a.score);
    return results
}