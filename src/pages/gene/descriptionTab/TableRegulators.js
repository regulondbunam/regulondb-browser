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
            console.log(data.getGenesBy.data[0].regulation.regulators)
            const regulators = data.getGenesBy.data[0].regulation.regulators
            if (regulators.length > 0) {
                return (
                    <>
                        {
                            regulators.map((item) => {
                                return (
                                    <div key={item.id}
                                        className="divA"
                                        style={{ float: "left", paddingRight: "2%" }}
                                        onClick={() => { history.push("/promoter/" + item.id) }}
                                    >
                                        <h2 style={{ margin: "0", float: "left",color: "blue", textDecoration: "underline" }}>{item.name}</h2>
                                        <h2 style={{ margin: "0", color: "var(--color-accentA)", fontSize: "12px" }}>
                                            {item.type}
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

export default TableRegulators;