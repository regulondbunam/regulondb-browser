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
                        try {
                            const GENES = data?.genes
                            const PROMOTER = data?.promoter
                            if(GENES && GENES.length > 0){
                                GENES.map(gen=>{
                                    let rbs = gen?.regulatorBindingSites
                                    if(rbs && rbs.length > 0 ){
                                        rbs.map(rb=>{
                                            let ris = rb?.regulatoryInteractions
                                            if(ris && ris.length > 0 ){
                                                ris.map(ri=>{
                                                    if (ri?._id === element._id) {
                                                        dnaFeatures.push(element)
                                                    }
                                                    return null
                                                })
                                            }
                                            return null
                                        })
                                    }
                                    return null
                                })
                            }
                            if(PROMOTER){
                                let rbs = PROMOTER?.regulatorBindingSites
                                    if(rbs && rbs.length > 0 ){
                                        rbs.map(rb=>{
                                            let ris = rb?.regulatoryInteractions
                                            if(ris && ris.length > 0 ){
                                                ris.map(ri=>{
                                                    if (ri?._id === element._id) {
                                                        dnaFeatures.push(element)
                                                    }
                                                    return null
                                                })
                                            }
                                            return null
                                        })
                                    }
                            }
                        } catch (error) {
                            console.error(error)
                        }
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
            return dnaFeatures
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

