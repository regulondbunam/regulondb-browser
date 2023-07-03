
export default function Regulators({regulators = []}) {
    return (
        <table className="tableAccent" >
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Function</th>
                </tr>
            </thead>
            <tbody>
                {regulators.map((regulator,index)=>{
                    return <Regulator key={"regulatorData_"+index+"_"+regulator._id} {...regulator} regulatorFunction={regulator.function} />
                })}
            </tbody>
        </table>
    )
}

function Regulator({
    _id,
    regulatorFunction,
    name,
    type,
}) {
    return(
        <tr>
            <td>
                {name}</td>
            <td>{regulatorFunction}</td>
        </tr>
    )
}