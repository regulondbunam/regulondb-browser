import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { RegulatorInfo } from '../../../../components/apollo/querys/GeneQuerys'
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
                let unique = [...new Set(regulators)]
                let duplicates = unique.map(value => [value, regulators.filter(str => str === value).length]);
                //console.log(duplicates)
                return (
                    <>
                    <h3>Regulators</h3>
                    <div style={{ float: "none", height: "50px" }}>
                        {
                            duplicates.map((comp) => {
                                let item = comp[0]
                                if(comp[1] === 2 ){
                                    item['function'] = 'dual'
                                }
                                return (
                                    <div key={`${item.id}`}
                                        style={{ float: "left", paddingRight: "2%" }}
                                        
                                    >
                                        <p className="aBase" 
                                        onClick={() => { history.push("/regulator/" + item.id) }}>
                                            {item.name}({convertType(item.function)})
                                        </p>
                                       
                                    </div>
                                )
                            })
                        }
                        
                        </div>
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
            return "(+)(-)"
    }
}

export default TableRegulators;