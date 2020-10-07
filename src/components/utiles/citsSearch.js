
export default function(allCitations, citations, text){
    let cits =''
    try {
        const re = /\|.*?\|/
        cits = re.exec(text)
    console.log(cits)
    console.log(citations)
    } catch (error) {
        console.log("util")
    }
    
}