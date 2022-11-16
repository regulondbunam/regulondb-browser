

export function formatData(_data,go) {
    
    //console.log(_data)
    let rows = []
    _data.map((data)=>{
        //console.log(data)
        let conformations = []
        try {
            conformations = data.transcriptionFactor.conformations.map((conformation)=>{
                return conformation.name
            }).join(", ")
        } catch (error) {
            
        }
        let row = {
            name: data?.transcriptionFactor?.name,
            synonyms: data?.transcriptionFactor?.synonyms.join(", "),
            conformations: conformations,
            clickEvent: ()=>{go(data?._id)}
          }
        rows.push(row)
        return null
    })
    
    return {
        columns: [
            {
                label: "Name",
                field: "name",
                sort: "asc"
            },
            {
                label: "Synonyms",
                field: "synonyms",
                sort: "asc",
                width: 150
            },
            {
                label: "Conformations",
                field: "conformations",
                sort: "asc",
                width: 150
            },
        ],
        rows: rows
    }
}