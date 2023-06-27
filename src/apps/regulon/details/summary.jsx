import {Card, DataVerifier} from "../../../components/ui-components"
import Style from "./style.module.css"
export default function Summary({summary}) {
    if (DataVerifier.isValidObject(Summary)) {
        return null
    }
    return(
        <Card title="Summary" >
            <div style={{margin: "3%"}}>
                <table className={Style.table} >
                    <thead>
                        <th>Object</th>
                        <th>Activated</th>
                        <th>Dual</th>
                        <th>Repressed</th>
                        <th>Total</th>
                        <th>Unknown</th>
                    </thead>
                    <tbody>
                        {Object.keys(summary).map((key,index)=>{
                            let objects = summary[key]
                            if(!objects || key === "__typename"){
                                return null
                            }
                            return <tr key={"summaryRow_"+index+"_"+key}>
                                <td>{key}</td>
                                {Object.keys(objects).map((obj,idx)=>{
                                    if(!objects || obj === "__typename"){
                                        return null
                                    }
                                    return <td key={"summaryCell_"+idx+"_"+obj+"_row_"+index} >{objects[obj]}</td>
                                })}
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        </Card>
    )
}