//import PropTypes from 'prop-types';
import Operon from './operon';
import Regulators from './regulators';
import { DataVerifier } from "../../../ui-components";
//import { ParagraphCitations, NoteCitations } from "../../citations";


export function Regulation({
    operon,
    regulators,
    statistics,
}) {

    return(
        <div>
             <Operon {...operon} />
             {DataVerifier.isValidArray(regulators) && (
                <Regulators regulators={regulators} />
             )}
             <br />
             {DataVerifier.isValidObject(statistics) &&(
                <Statistics statistics={statistics} />
             )}
        </div>
    )
}

function Statistics({statistics}){
    return(
        <table className="tableAccent" >
                    <thead>
                       <tr>
                       <th colSpan={2}>Statistics</th>
                       </tr>
                    </thead>
                    <tbody>
                        {Object.keys(statistics).map((key,index)=>{
                            let statistic = statistics[key]
                            if(!statistic || key === "__typename"){
                                return null
                            }
                            return <tr key={"statisticsRow_"+index+"_"+key}>
                                <td>{key}</td>
                                <td>{statistic}</td>
                            </tr>
                        })}
                    </tbody>
                </table>
    )
}