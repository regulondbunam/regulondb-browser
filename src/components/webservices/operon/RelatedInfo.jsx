import React from 'react'

export default function RelatedInfo({operon_data}) {

    const relatedIds = RelatedIds(operon_data.data)


  return (
    <div></div>
  )
}

function RelatedIds(operon_data) {
    let ids = {

    }
    try {
        operon_data.forEach(operon => {
           ids["operon"] = operon?._id
            if (operon?.transcriptionUnits) {
                let tus = []
                operon.transcriptionUnits.forEach(transcriptionUnit => {
                    transcriptionUnit?.id && tus.push(transcriptionUnit.id)
                    if (transcriptionUnit?.genes) {
                        let genes = []
                        transcriptionUnit?.genes.forEach(gene => {
                            gene?.id && genes.push(gene.id)
                        })
                        ids["gene"] = genes
                    }
                    if (transcriptionUnit?.promoter) {
                        let promoters = []
                        transcriptionUnit?.promoter.forEach(promoter => {
                            promoter?.id && promoter.push(promoter.id)
                        })
                    }
                    if (transcriptionUnit?.regulatorBindingSites) {
                        transcriptionUnit?.regulatorBindingSites.forEach(rBS => {
                            if(rBS?.regulatoryInteractions){

                            }
                        })
                    }
                    
                })
                ids["transcriptionUnit"] = tus
            }
        });
    } catch (error) {
        console.error("get Phrases Atributes", error);
    }
    
    return { "id": ["asd"]}
}