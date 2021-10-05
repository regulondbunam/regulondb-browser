import React, { useContext, useMemo } from 'react'
import { OperonCONTEXT } from '../../components/context/operon_provider'
import DttTool from '../../../../components/dtt_tool/dttTool'

export default function TUgraph({ data }) {
    const { operonContextElements } = useContext(OperonCONTEXT)
    //console.log(data)
    //console.log(operonContextElements)
    let custom_dnaFeatures = useMemo(() => {
        try {
            let dnaFeatures = []
            operonContextElements.map(element => {
                switch (element?.objectType) {
                    case "gene":
                        try {
                            if (data?.genes.find(gen => gen.id === element._id)) {
                                dnaFeatures.push(element)
                            }
                        } catch (error) { }
                        return null
                    case "promoter":
                        try {
                            if (data?.promoter.id === element._id) {
                                dnaFeatures.push(element)
                            }
                            return null
                        } catch (error) {
                        }
                        return null
                    case "tf_binding_site":
                        dnaFeatures.push(element)
                        break;
                    case "terminator":
                        if(!data?.terminators || data?.terminators.length === 0){
                            return null
                        }
                        try {
                            data?.terminators.map((term)=>{
                                if (term._id === element._id) {
                                    dnaFeatures.push(element)
                                }
                                return null
                            })
                        } catch (error) {
                            return null
                        }
                        break;
                    default:
                        break;
                }
                return null
            })
            let tu_data = []
            dnaFeatures.map(feature => {
                if (feature?.objectType === "tf_binding_site") {
                    let genes = feature?.relatedGenes
                    if (genes) {
                        let flag = false
                        genes.map(gene => {
                            if (dnaFeatures.find(f => f?._id === gene.gene_id)) {
                                flag = true
                            }
                            return null
                        })
                        if (flag) {
                            tu_data.push(feature)
                        }
                    }
                    return null
                }
                tu_data.push(feature)
                return null
            })
            return tu_data
        } catch (error) {
            console.error("TU_graph: ", error)
        }
    }, [data, operonContextElements])

    return (
        <DttTool id={data.id} context="tu"
            custom_data_dtt={custom_dnaFeatures}
        />
    )
}

