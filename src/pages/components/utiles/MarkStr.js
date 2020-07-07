export default function Mark(search, text) {
    try {
        const srchArray = search.split(' ')
        const af = srchArray.map((word)=>{
            const index = text.toLowerCase().indexOf(word.toLowerCase())
            const end = word.length+index
            if(index<0){
                return -1
            }
            text = text.slice(0,end)+'</b>'+text.slice(end,text.length)
            text = text.slice(0,index)+'<b>'+text.slice(index,text.length)
            return(`${index},${end}`)
        }).join(',')
        console.log(af)
        return text
    } catch (error) {
        console.log(error)
        return text
    }

}
/*
aaeR gene; synonyms: yhcS,qseA; products: LysR-type transcriptional regulator AaeR,

*/