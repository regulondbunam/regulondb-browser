import React from 'react';
import {RegulationInfo} from '../../components/apollo/geneCollection'

const TableOperon = ({
    idGene
}) => {
    let gene = new RegulationInfo(idGene)
    const {loading,data,error} = gene
    console.log("info: ",idGene)
    console.log("data: ",data)
    // console.log("error: ",error)

    if(loading){
        return <>loading...</>
    }else{
        if(error !== undefined){
            return <>error</>
        }else{
            try {
                let name = data.name
                let id = data.id
                return(
                    <div style={{ width: "80%" }}>
                       <h2 style={{color: "var(--color-accentB)", margin: "0", float: "left"}}>
                           Operon &nbsp;
                       </h2>
                    <h2 style={{margin: "0"}}>{name}</h2>
                    <h3 style={{margin: "0", fontSize: "9px"}}>{id}</h3>
                    </div>
                )
            }catch(error){
                return <> no data </>
            }
        }
    }
}
 
export default TableOperon;