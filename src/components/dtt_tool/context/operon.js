export default function OperonContext(leftEndPosition, rightEndPosition, _data_dtt = []) {
    let dnaFeature_data = []
    _data_dtt.map((element) =>{
        if(
            (element.rightEndPosition < leftEndPosition || element.leftEndPosition > rightEndPosition) ||
            (element.rightEndPosition > leftEndPosition && element.leftEndPosition < leftEndPosition)
        ){
            element.opacity=0.1
        }
        dnaFeature_data.push(element)
        //console.log(element.objectRGBColor)
        return null
    })
    //console.log(leftEndPosition, rightEndPosition)
    //console.log(dnaFeature_data)
    return dnaFeature_data
}