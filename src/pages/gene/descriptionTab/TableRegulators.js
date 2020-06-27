import React from 'react';
import { RegulatorInfo } from '../../components/apollo/geneCollection'
import { useHistory } from 'react-router-dom';

const TableRegulators = ({
    idGene
}) => {
    const regulators = new RegulatorInfo(idGene)
    const { loading, data, error } = regulators
    let history = useHistory();
    //console.log(data)
    if (loading) {
        return (
            <>
                <h2 style={{ color: "var(--color-accentB)" }}>
                    Regulators
            </h2>
            loading...
            </>
        )
    } else {
        if (error !== undefined) {
            return (
                <>
                    <h2 >
                        Regulators
                </h2>
                server-error
                </>
            )
        } else {
            try {
                if (data.length > 0) {
                    return (
                        <>
                            <h2 style={{ color: "var(--color-accentB)" }}>
                                Regulators
                                       </h2>
                            {
                                data.map((item) => {
                                    return (
                                        <div key={item.id} 
                                        className="divA" 
                                        style={{ float: "left", paddingRight: "2%" }}
                                        onClick={()=>{history.push("/promoter/" + item.id)}}
                                        >
                                            <h2 style={{ margin: "0", float: "left" }}>{item.name}&nbsp;</h2>
                                            <h2 style={{ margin: "0", color: "var(--color-accentA)", fontSize: "12px" }}>
                                                {item.type}
                                                </h2>
                                            <h3 style={{ margin: "0", fontSize: "9px" }}>{item.id}</h3>
                                        </div>
                                    )
                                })
                            }
                            <div style={{ float: "none", height: "50px" }}>
                                <br/>
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

}

export default TableRegulators;