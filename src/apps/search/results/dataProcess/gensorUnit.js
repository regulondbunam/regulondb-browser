import { DataVerifier } from "../../../../components/ui-components";

export default function gusFormatResults(gusData, keyword) {
    let results = []
    if (DataVerifier.isValidArray(gusData)) {
        gusData.forEach((gu) => {
            const {groups,_id,
            name} = gu.gensorUnit
            //let re = new RegExp(`${keyword}`, "gm");
            let title = name + ", " + groups.join(", ")
            let matches = title.toLocaleLowerCase().matchAll(keyword.toLocaleLowerCase())
            let score = [...matches].length
            title = title.replaceAll(keyword, "<b>" + keyword + "</b>")
            results.push({
                _id: _id,
                data: gu,
                type: "gu",
                title: title,
                score: score
            })
        });
    }
    results.sort((a, b) => b.score - a.score);
    return results
}