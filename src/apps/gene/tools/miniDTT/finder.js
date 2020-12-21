//const GeneticElements = ['gene','operon','ppGpp','promoter','ribo','rna','terminator','tf-bs','tsa','tna']

export default function Finder(posLeft,posRigth,gene_data){
    if(posRigth<posLeft){
        console.error('position Rigth > position Left')
        return []
    }
    let elements = [
        {
            type:'gene', 
            name: gene_data?.name,
            id: gene_data?.id,
            leftEndPosition: gene_data?.leftEndPosition,
            rightEndPosition: gene_data?.rightEndPosition,
            strand: gene_data?.strand
        }
    ]

    return elements
}