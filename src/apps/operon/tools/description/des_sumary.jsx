import React, { useState } from 'react'
import { SpinnerCircle } from '../../../../components/ui-components/ui_components';
import { GetStatistics } from '../../webServices/operon_ws'

export const Sumary = ({
    idOperon
}) => {
    const [_data, set_data] = useState();
    const [_state, set_state] = useState();
    if(_data){
        console.log(_data)
        return Statistics(_data)
    }
    return (
        <div>
            {
                _state !== "error"
                    ? <SpinnerCircle />
                    : <div>error to load Statistics</div>
            }
            <GetStatistics id_operon={idOperon}
                resoultsData={(data) => { set_data(data) }}
                status={(state) => { set_state(state) }}
            />
        </div>
    )

}

export default Sumary

function Statistics(statistics) {
    return (
        <table className="table_auto table_vertical" style={{ paddingLeft: '5%' }} >
            <thead>
                <tr>
                    {
                        statistics?.transcriptionUnit
                            ? <th>Transcription Unit</th>
                            : null
                    }
                    {
                        statistics?.promoters
                            ? <th>Promoters</th>
                            : null
                    }
                    {
                        statistics?.genes
                            ? <th>Genes</th>
                            : null
                    }
                </tr>
            </thead>
            <tbody>
                <tr>
                    {
                        statistics?.transcriptionUnit
                            ? <td style={{ textAlign: "center" }}>{statistics?.transcriptionUnit}</td>
                            : null
                    }
                    {
                        statistics?.promoters
                            ? <td style={{ textAlign: "center" }}>{statistics?.promoters}</td>
                            : null
                    }
                    {
                        statistics?.genes
                            ? <td style={{ textAlign: "center" }}>{statistics?.genes}</td>
                            : null
                    }
                </tr>
            </tbody>
        </table>
    )
}

/*

{
                                    Object.keys(tu.statistics).map(function (key) {
                                        const test = key.match(/^_/);
                                        //console.log(test)
                                        if (tu.statistics[key] === null || tu.statistics[key].length <= 1 || test !== null) {
                                            return null;
                                        }
                                        return (
                                            <tr key={`sumary_statistics_${tu.id}_${key}`}>
                                                <td>{key}</td>
                                                <td>{tu.statistics[key]}</td>
                                            </tr>
                                        )
                                    })
                                }

*/