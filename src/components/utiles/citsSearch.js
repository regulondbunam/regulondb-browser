
export default function(allCitations, citations, text){
    let cits =''
    try {
        const re = /\|.*?\|/
        cits = re.exec(text)
    console.log("note cits: ",cits)
    console.log("gen cits: ",citations)
    console.log("all cits: ",allCitations)
    } catch (error) {
        console.log("util")
    }
    
}