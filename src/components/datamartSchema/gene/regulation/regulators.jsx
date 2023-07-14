export default function Regulators({regulators = []}) {
    return (
        <table className="tableAccent" >
            <tbody>
                {regulators.map((regulator,index)=>{
                    return <Regulator key={"regulatorData_"+index+"_"+regulator._id} {...regulator} />
                })}
            </tbody>
        </table>
    )
}

function Regulator({
    _id,
    RegulatorFunction,
    name,
    type,
}) {
    return(
        <tr>
            <td>
                {name}</td>
            <td>{type}</td>
        </tr>
    )
}