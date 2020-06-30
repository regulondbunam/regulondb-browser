import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { RegulatorInfo } from '../../components/apollo/geneCollection'
import { useHistory } from 'react-router-dom';

const TableRegulators = ({
    idGene
}) => {
    const regulators = new RegulatorInfo(idGene)
    const advancedSearch = regulators.advancedSearch
    const { data, loading, error } = useQuery(regulators.query, {
        variables: { advancedSearch }
    })
    let history = useHistory();
    //console.log(data)
    if (loading) {
        return (
            <p> loading... </p>
        )
    } else {
        if (error !== undefined) {
            return (
                <p>server-error</p>
            )
        }
        try {
            //console.log(data.getGenesBy.data[0].regulation.regulators)
            const regulators = data.getGenesBy.data[0].regulation.regulators
            if (regulators.length > 0) {
                return (
                    <>
                        {
                            regulators.map((item) => {
                                return (
                                    <div key={item.id}
                                        style={{ float: "left", paddingRight: "2%" }}
                                        
                                    >
                                        <h2 className="aBase" 
                                        onClick={() => { history.push("/regulator/" + item.id) }}>
                                            {item.name}({convertType(item.type)})
                                        </h2>
                                       
                                    </div>
                                )
                            })
                        }
                        <div style={{ float: "none", height: "50px" }}>
                            <br />
                        </div>
                        <br />
                    </>
                );
            } else {
                return (<></>)
            }
        } catch (error) {

        }
    }

}

function convertType(type){
    switch (type) {
        case "activator":
            return "+"
        case "repressor":
            return "-"
        default:
            return ""
    }
}

export default TableRegulators;