import React, {useState} from 'react'
import { SpinnerCircle } from '../../../../components/ui-components/ui_components';
import GetGeneRegulation from '../../webServices/getGeneBy/getGeneRegulation';
import RegulationOperon from './regulation/regulation_operon';
import Regulators from './regulation/regulators';

export default function GeneRegulation({id_gene}) {

    const [_data, set_data] = useState()
    const [_state, set_state] = useState()


    if (_data && _state === "done") {
        return (
            <div style={{ paddingLeft: '5%' }}>
                {
                    _data?.statistics
                    ?<>
                    <h3>Statistics</h3>
                    {Statistics(_data?.statistics)}
                    </>
                    :null
                }
                {
                    _data?.operon
                    ?<>
                    <h3>Operon</h3>
                    {RegulationOperon(_data?.operon)}
                    </>
                    :null
                }
                {
                    _data?.regulators
                    ?<>
                    <h3>Regulators</h3>
                    {Regulators(_data?.regulators)}
                    </>
                    :null
                }
                {
                    _data?.regulators
                    ?<>
                    <h3>Regulators</h3>
                    {Regulators(_data?.regulators)}
                    </>
                    :null
                }
            </div>
        )
    }

    return (
        <div>
            {
                _state !== "error"
                    ? "Error to load gene regulation"
                    : <SpinnerCircle />
            }
            <GetGeneRegulation id_gene={id_gene}
                resoultsData={(data) => { set_data(data) }}
                status={(state) => { set_state(state) }}
            />
        </div>
    )
}

function Statistics(statistics) {
    return(
        <table className="table_auto table_vertical" style={{ paddingLeft: '5%' }} >
            <thead>
                <tr>
                    {
                        statistics?.promoters
                        ?<th>Promoters</th>
                        :null
                    }
                    {
                        statistics?.regulators
                        ?<th>Regulators</th>
                        :null
                    }
                    {
                        statistics?.regulatoryInteractions
                        ?<th>Regulatory Interactions</th>
                        :null
                    }
                </tr>
            </thead>
            <tbody>
            <tr>
                    {
                        statistics?.promoters
                        ?<td style={{textAlign:"center"}}>{statistics?.promoters}</td>
                        :null
                    }
                    {
                        statistics?.regulators
                        ?<td style={{textAlign:"center"}}>{statistics?.regulators}</td>
                        :null
                    }
                    {
                        statistics?.regulatoryInteractions
                        ?<td style={{textAlign:"center"}}>{statistics?.regulatoryInteractions}</td>
                        :null
                    }
                </tr>
            </tbody>
        </table>
    )
}