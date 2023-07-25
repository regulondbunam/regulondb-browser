import { DataVerifier } from "../../../../components/ui-components";

export default function operonFormatResults(operonsData, keyword = "") {
    let results = []
    if (DataVerifier.isValidArray(operonsData)) {
        operonsData.forEach((operon) => {
            let statistics = []
            for (const statistic in operon.operon.statistics) {
                if (Object.hasOwnProperty.call(operon.operon.statistics, statistic) && statistic !== "__typename") {
                    const value = operon.operon.statistics[statistic];
                    statistics.push(statistic+": "+value)
                }
            }
            //let re = new RegExp(`${keyword}`, "gm");
            let title = operon.operon.name + " " + statistics.join(", ")
            let matches = title.matchAll(keyword)
            let score = [...matches].length
            title = title.replaceAll(keyword, "<b>" + keyword + "</b>")
            results.push({
                _id: operon._id,
                data: operon,
                type: "operon",
                title: title,
                score: score
            })
        });
    }
    results.sort((a, b) => b.score - a.score);
    return results
}