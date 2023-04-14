import Card from "../../components/card";
import ViewSequence from "../../components/viewSequence";
import Divider from '@mui/material/Divider';

export function Summary({summary}) {
    return(
        <Card title="Summary" >
            <div style={{ marginLeft: "5%", paddingRight: "3%" }} >
                {Object.keys(summary).map((key,index)=>{
                    console.log(key);
                    if (/_/.test(key)) {
                        return null
                    }
                    return <Element key={"summaryElement_"+key+"_"+index} name={key} element={summary[key]} />
                })}
            </div>

        </Card>
    )
}

function Element({name,element}) {
    return (
        <div>
            <h3>{name}</h3>
            <table className="table_auto" >
            <thead>
                <tr>
                    {Object.keys(element).map((key,index)=>{
                        if (/_/.test(key)) {
                            return null
                        }
                        return <th style={{textAlign: "center"}} key={"summary_"+name+"_"+key+"_"+index}>{key}</th>
                    })}
                </tr>
            </thead>
            <tbody>
            <tr>
                    {Object.keys(element).map((key,index)=>{
                        if (/_/.test(key)) {
                            return null
                        }
                        return <td style={{textAlign: "center"}} key={"summary_"+name+"_"+key+"_"+index}>{element[key]}</td>
                    })}
                </tr>
            </tbody>
        </table>
        </div>
    )
}