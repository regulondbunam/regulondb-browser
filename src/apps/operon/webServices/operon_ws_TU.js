import React, { useEffect } from 'react';
//import { helmetJsonLdProp } from "react-schemaorg";
//import { Helmet } from 'react-helmet-async';
import { getTU_description, getTU_genes, getTU_promoter, getTU_terminators, getTU_rBS, validateTUID } from "./operon_querys"
import { useQuery } from '@apollo/react-hooks';

export const SearchTU = ({
    id = '',
    status = () => { },
    resoultsData = () => { },
}) => {
    const { data, loading, error } = useQuery(validateTUID(id))
    useEffect(() => {
        if (loading) {
            status('loading')
        } else {

            if (data !== undefined) {
                //console.log(data.getOperonBy.data[0]._id)
                const resoult = data.getOperonBy.data[0]._id
                resoultsData(resoult)
                status('done')
            }
        }
        if (error) {
            status('error')
            console.log(error)
        }

    })
    if (loading) {
        //console.log("loading",id)
        return <></>
    }
    if (error) {
        console.log(error)
        return <></>
    }
    try {
        // Structed data
    } catch (error) {
    }
    return (<></>);
}

export const DataTUrBS = ({
    id = '',
    bs_class = "",
    status = () => { },
    resoultsData = () => { },
}) => {
    const { data, loading, error } = useQuery(getTU_rBS(id))
    useEffect(() => {
        if (loading) {
            status('loading')
        } else {

            if (data !== undefined) {
                //console.log(data.getOperonBy.data[0].transcriptionUnits[0])
                //OrganizeBindigSites(data.getOperonBy.data[0].transcriptionUnits,id)
                //const resoults = OrganizeBindigSites(data.getOperonBy.data[0].transcriptionUnits,id)
                switch (bs_class) {
                    case "genes":
                        resoultsData(data.getOperonBy.data[0].transcriptionUnits[0].genes)
                        break;
                    case "promoter":
                        resoultsData(data.getOperonBy.data[0].transcriptionUnits[0].promoter)
                        break;
                    case "regulator":
                        resoultsData(data.getOperonBy.data[0].transcriptionUnits[0].regulatorBindingSites)
                        break;
                    default:
                        resoultsData(data.getOperonBy.data[0].transcriptionUnits[0])
                        break;
                }

                status('done')
            }
        }
        if (error) {
            status('error')
            console.log(error)
        }

    })
    if (loading) {
        //console.log("loading",id)
        return <></>
    }
    if (error) {
        console.log(error)
        return <></>
    }
    try {
        // Structed data
    } catch (error) {
    }
    return (<></>);
}

export const DataTUterminators = ({
    id = '',
    status = () => { },
    resoultsData = () => { },
}) => {
    const { data, loading, error } = useQuery(getTU_terminators(id))
    useEffect(() => {
        if (loading) {
            status('loading')
        } else {

            if (data !== undefined) {
                //console.log(data.getOperonBy.data[0].transcriptionUnits)
                const resoults = data.getOperonBy.data[0].transcriptionUnits
                resoultsData(resoults)
                status('done')
            }
        }
        if (error) {
            status('error')
            console.log(error)
        }

    })
    if (loading) {
        //console.log("loading",id)
        return <></>
    }
    if (error) {
        console.log(error)
        return <></>
    }
    try {
        // Structed data
    } catch (error) {
    }
    return (<></>);
}

export const DataTUpromoter = ({
    id = '',
    status = () => { },
    resoultsData = () => { },
}) => {
    const { data, loading, error } = useQuery(getTU_promoter(id))
    useEffect(() => {
        if (loading) {
            status('loading')
        } else {

            if (data !== undefined) {
                //console.log(data.getOperonBy.data[0].transcriptionUnits)
                const resoults = data.getOperonBy.data[0].transcriptionUnits
                resoultsData(resoults)
                status('done')
            }
        }
        if (error) {
            status('error')
            console.log(error)
        }

    })
    if (loading) {
        //console.log("loading",id)
        return <></>
    }
    if (error) {
        console.log(error)
        return <></>
    }
    try {
        // Structed data
    } catch (error) {
    }
    return (<></>);
}


export const DataTuGenes = ({
    id = '',
    status = () => { },
    resoultsData = () => { },
}) => {
    const { data, loading, error } = useQuery(getTU_genes(id))
    useEffect(() => {
        if (loading) {
            status('loading')
        } else {

            if (data !== undefined) {
                //console.log(data.getOperonBy.data[0].transcriptionUnits)
                const resoults = data.getOperonBy.data[0].transcriptionUnits
                resoultsData(resoults)
                status('done')
            }
        }
        if (error) {
            status('error')
            console.log(error)
        }

    })
    if (loading) {
        //console.log("loading",id)
        return <></>
    }
    if (error) {
        console.log(error)
        return <></>
    }
    try {
        // Structed data
    } catch (error) {
    }
    return (<></>);
}


export const DataTUdescription = ({
    id = '',
    status = () => { },
    resoultsData = () => { },
}) => {
    const { data, loading, error } = useQuery(getTU_description(id))
    useEffect(() => {
        if (loading) {
            status('loading')
        } else {

            if (data !== undefined) {
                // console.log(data.getOperonBy.data[0].transcriptionUnits)
                //const resoults = data.getOperonBy.data[0].transcriptionUnits
                resoultsData(data.getOperonBy.data[0].transcriptionUnits)
                status('done')
            }
        }
        if (error) {
            status('error')
            console.log(error)
        }

    })
    if (loading) {
        //console.log("loading",id)
        return <></>
    }
    if (error) {
        console.log(error)
        return <></>
    }
    try {
        // Structed data
    } catch (error) {
    }
    return (<></>);
}

// eslint-disable-next-line no-unused-vars
function OrganizeBindigSites(transcriptionUnits, idTU) {
    const tu = transcriptionUnits.find(element => element.id === idTU);
    //console.log(tu)
    let BindigSites = {
        gene: [],
        promoter: [],
        regulator: []
    }
    /*
    const arrayGenes = tu?.genes
    if(arrayGenes){
        arrayGenes.map((gene)=>{
            const rbs = gene?.regulatoryInteractions
            console.log(gene)
            if(rbs){
                rbs.map((rb)=>{
                    BindigSites.gene.push(rb)
                    return null
                })
                
            }
            return null
        })
    }*/
    const arrayPromoterBS = tu?.promoter?.regulatorBindingSites
    if (arrayPromoterBS) {
        arrayPromoterBS.map((promoter) => {
            const rbs = promoter?.regulatoryInteractions
            //console.log(promoter)
            if (rbs) {
                rbs.map((rb) => {
                    BindigSites.promoter.push(rb)
                    return null
                })

            }
            return null
        })
    }
    //console.log(BindigSites)
    return BindigSites
}