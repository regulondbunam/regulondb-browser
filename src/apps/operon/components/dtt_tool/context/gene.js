export default function GeneContext(id_gene, _dtt_data = []) {
    console.log(_dtt_data)
    let dnaFeature_data = []
    for (let feature of _dtt_data) {
        let f = feature
        if(feature?._id === id_gene){
            f.stroke = { "color": "#00F", "width": 3, "linecap": "round" }
            dnaFeature_data.push(f)
        }else{
            f.opacity = 0.5
            dnaFeature_data.push(feature)
        }
    }
    return dnaFeature_data
}